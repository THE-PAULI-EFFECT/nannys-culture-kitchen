use axum::{routing::{get, post}, Router};

mod chat;
mod store;
mod grants;

pub fn router() -> Router {
    Router::new()
        .route("/chat", post(chat::chat_completion))
        .route("/store/products", get(store::list_products))
        .route("/store/checkout", post(store::create_checkout))
        .route("/grants", get(grants::list_grants))
        .route("/grants/search", get(grants::search_grants))
}
