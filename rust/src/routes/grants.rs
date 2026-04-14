use axum::{extract::Query, extract::Json, response::IntoResponse};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Clone)]
pub struct Grant {
    pub id: &'static str,
    pub name: &'static str,
    pub source: &'static str,
    pub category: &'static str,
    pub amount: &'static str,
    pub deadline: &'static str,
    pub url: &'static str,
    pub description: &'static str,
}

static GRANTS: &[Grant] = &[
    Grant { id: "usda-cfp", name: "Community Food Projects (CFP)", source: "USDA NIFA", category: "federal", amount: "Up to $400,000", deadline: "Rolling", url: "https://www.nifa.usda.gov/grants/programs/community-food-projects-competitive-grant-program-cfpcgp", description: "Supports community-based food projects increasing food security." },
    Grant { id: "usda-fts", name: "Farm to School Grant", source: "USDA FNS", category: "federal", amount: "$20,000 - $100,000", deadline: "Annual (December)", url: "https://www.fns.usda.gov/cfs/farm-school-grant-program", description: "Farm-to-school activities, local food procurement, nutrition education." },
    Grant { id: "usda-bfrdp", name: "Beginning Farmer and Rancher Development", source: "USDA NIFA", category: "federal", amount: "Up to $250,000/year", deadline: "Annual", url: "https://www.nifa.usda.gov/grants/funding-opportunities/beginning-farmer-rancher-development-program", description: "Training and education for beginning farmers. Indigo Asul partnership fit." },
    Grant { id: "usda-vapg", name: "Value-Added Producer Grant (VAPG)", source: "USDA Rural Development", category: "federal", amount: "Up to $250,000", deadline: "Annual (March)", url: "https://www.rd.usda.gov/programs-services/business-programs/value-added-producer-grants", description: "Value-added agricultural products — spice kits, sauces, preserved goods." },
    Grant { id: "sba-microloan", name: "SBA Microloan Program", source: "SBA", category: "federal", amount: "Up to $50,000", deadline: "Rolling", url: "https://www.sba.gov/funding-programs/loans/microloans", description: "Small loans for working capital, inventory, supplies, equipment." },
    Grant { id: "la-faststart", name: "LED FastStart", source: "Louisiana Economic Development", category: "state", amount: "Free workforce training", deadline: "Rolling", url: "https://www.opportunitylouisiana.gov/faststart", description: "Free customized employee training for qualifying Louisiana businesses." },
    Grant { id: "la-smallbiz", name: "Louisiana Small Business Loan Program", source: "Louisiana LED", category: "state", amount: "$5,000 - $250,000", deadline: "Rolling", url: "https://www.opportunitylouisiana.gov/small-business", description: "Low-interest loans for Louisiana small businesses including food service." },
    Grant { id: "kellogg-food", name: "W.K. Kellogg Foundation Grants", source: "W.K. Kellogg Foundation", category: "private", amount: "$50K - $500K", deadline: "Rolling LOI", url: "https://www.wkkf.org/what-we-do/overview/", description: "Equitable food systems, community-driven solutions, racial equity." },
    Grant { id: "rwjf-health", name: "RWJF Culture of Health", source: "Robert Wood Johnson Foundation", category: "private", amount: "Varies", deadline: "Multiple cycles", url: "https://www.rwjf.org/en/how-we-work/grants-explorer.html", description: "Food, culture, and community health outcomes programs." },
];

pub async fn list_grants() -> impl IntoResponse {
    Json(GRANTS)
}

#[derive(Deserialize)]
pub struct SearchQuery {
    #[serde(default)]
    pub q: String,
    #[serde(default)]
    pub category: String,
}

pub async fn search_grants(Query(params): Query<SearchQuery>) -> impl IntoResponse {
    let results: Vec<&Grant> = GRANTS
        .iter()
        .filter(|g| {
            let matches_query = params.q.is_empty()
                || g.name.to_lowercase().contains(&params.q.to_lowercase())
                || g.description.to_lowercase().contains(&params.q.to_lowercase());
            let matches_category =
                params.category.is_empty() || g.category == params.category;
            matches_query && matches_category
        })
        .collect();

    Json(results)
}
