# Nanny's Culture Kitchen — Rust API

Axum 0.7 backend for NCK. Keeps API keys server-side and provides a unified API for the React frontend.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/api/v1/chat` | Chat completion proxy (Mercury 2 / GPT-4-turbo) |
| GET | `/api/v1/store/products` | List store products |
| POST | `/api/v1/store/checkout` | Create Stripe checkout session |
| GET | `/api/v1/grants` | List all grants |
| GET | `/api/v1/grants/search?q=&category=` | Search/filter grants |

## Environment Variables

```
OPENAI_API_KEY=sk-...
MERCURY_API_KEY=...
MERCURY_BASE_URL=https://api.inceptionlabs.ai/v1
STRIPE_SECRET_KEY=sk_...
BIND_ADDR=0.0.0.0:8080
```

## Development

```bash
cd rust
cargo run
```

## Build

```bash
cd rust
cargo build --release
```

The binary will be at `target/release/nck-api`.
