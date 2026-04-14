use axum::{extract::Json, response::IntoResponse};
use serde::Serialize;

#[derive(Serialize, Clone)]
pub struct Product {
    pub id: &'static str,
    pub name: &'static str,
    pub description: &'static str,
    pub price_cents: u32,
    pub category: &'static str,
}

static PRODUCTS: &[Product] = &[
    Product { id: "nck-apron-gold", name: "Nanny's Gold Apron", description: "Premium cotton apron with embroidered Carnival Gold logo.", price_cents: 3500, category: "merch" },
    Product { id: "nck-spice-kit", name: "Creole Spice Kit", description: "7 signature blends from Nanny's kitchen.", price_cents: 2800, category: "pantry" },
    Product { id: "nck-hot-sauce", name: "Bayou Fire Hot Sauce (3-pack)", description: "Small-batch Louisiana-style hot sauce.", price_cents: 2200, category: "pantry" },
    Product { id: "nck-tee-culture", name: "Culture Kitchen Tee", description: "Heavyweight cotton. Mardi Gras purple with gold print.", price_cents: 3200, category: "merch" },
    Product { id: "nck-gift-card-50", name: "Gift Card — $50", description: "Good for catering, store, or events.", price_cents: 5000, category: "gift" },
    Product { id: "nck-cookbook-v1", name: "Nanny's Cookbook Vol. 1", description: "40 plant-based recipes. Hardcover.", price_cents: 2400, category: "gift" },
];

pub async fn list_products() -> impl IntoResponse {
    Json(PRODUCTS)
}

#[derive(serde::Deserialize)]
pub struct CheckoutRequest {
    pub items: Vec<CheckoutItem>,
}

#[derive(serde::Deserialize)]
pub struct CheckoutItem {
    pub product_id: String,
    pub quantity: u32,
}

/// Create a Stripe Checkout session — placeholder until Stripe secret key is configured.
pub async fn create_checkout(Json(req): Json<CheckoutRequest>) -> impl IntoResponse {
    let stripe_key = std::env::var("STRIPE_SECRET_KEY").unwrap_or_default();

    if stripe_key.is_empty() {
        return Json(serde_json::json!({
            "error": "Stripe not configured yet",
            "items_received": req.items.len(),
        }));
    }

    // TODO: Call Stripe API to create checkout session
    // For now, return a placeholder
    Json(serde_json::json!({
        "checkout_url": "https://checkout.stripe.com/placeholder",
        "items": req.items.len(),
    }))
}
