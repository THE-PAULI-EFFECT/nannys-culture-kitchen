use axum::{extract::Json, http::StatusCode, response::IntoResponse};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct ChatRequest {
    pub message: String,
    #[serde(default)]
    pub history: Vec<ChatMessage>,
    /// "mercury" | "gpt4" — defaults to mercury for speed
    #[serde(default = "default_model")]
    pub model: String,
}

fn default_model() -> String {
    "mercury".to_string()
}

#[derive(Deserialize, Serialize, Clone)]
pub struct ChatMessage {
    pub role: String,
    pub content: String,
}

#[derive(Serialize)]
pub struct ChatResponse {
    pub reply: String,
    pub model_used: String,
}

/// Proxy chat completions through the backend so API keys stay server-side.
pub async fn chat_completion(Json(req): Json<ChatRequest>) -> impl IntoResponse {
    let (api_key, base_url, model_name) = match req.model.as_str() {
        "gpt4" => (
            std::env::var("OPENAI_API_KEY").unwrap_or_default(),
            "https://api.openai.com/v1".to_string(),
            "gpt-4-turbo".to_string(),
        ),
        _ => (
            std::env::var("MERCURY_API_KEY")
                .or_else(|_| std::env::var("OPENAI_API_KEY"))
                .unwrap_or_default(),
            std::env::var("MERCURY_BASE_URL")
                .unwrap_or_else(|_| "https://api.inceptionlabs.ai/v1".to_string()),
            "mercury-coder-small".to_string(),
        ),
    };

    if api_key.is_empty() {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(serde_json::json!({ "error": "API key not configured" })),
        )
            .into_response();
    }

    let system_prompt = include_str!("../../prompts/system.txt");

    let mut messages: Vec<serde_json::Value> = vec![serde_json::json!({
        "role": "system",
        "content": system_prompt,
    })];

    for msg in &req.history {
        messages.push(serde_json::json!({
            "role": msg.role,
            "content": msg.content,
        }));
    }

    messages.push(serde_json::json!({
        "role": "user",
        "content": req.message,
    }));

    let client = reqwest::Client::new();
    let result = client
        .post(format!("{}/chat/completions", base_url))
        .header("Authorization", format!("Bearer {}", api_key))
        .header("Content-Type", "application/json")
        .json(&serde_json::json!({
            "model": model_name,
            "messages": messages,
            "max_tokens": 1024,
            "temperature": 0.7,
        }))
        .send()
        .await;

    match result {
        Ok(resp) if resp.status().is_success() => {
            if let Ok(data) = resp.json::<serde_json::Value>().await {
                let reply = data["choices"][0]["message"]["content"]
                    .as_str()
                    .unwrap_or("No response.")
                    .to_string();

                Json(ChatResponse {
                    reply,
                    model_used: model_name,
                })
                .into_response()
            } else {
                (
                    StatusCode::BAD_GATEWAY,
                    Json(serde_json::json!({ "error": "Failed to parse LLM response" })),
                )
                    .into_response()
            }
        }
        Ok(resp) => {
            let status = resp.status().as_u16();
            let body = resp.text().await.unwrap_or_default();
            (
                StatusCode::BAD_GATEWAY,
                Json(serde_json::json!({ "error": format!("LLM returned {}: {}", status, body) })),
            )
                .into_response()
        }
        Err(e) => (
            StatusCode::BAD_GATEWAY,
            Json(serde_json::json!({ "error": format!("Request failed: {}", e) })),
        )
            .into_response(),
    }
}
