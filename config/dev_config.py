"""
Configuration file for NAVIT Logistics Agent
All configuration values are stored here instead of environment variables
"""

# ============================================================================
# Ollama/LLM Configuration
# ============================================================================
OLLAMA_API_URL = "http://localhost:11434/api/chat"
QWEN_MODEL = "qwen3-vl:8b"
# Timeout configuration: (connect_timeout, read_timeout) in seconds
# Read timeout set to 1200s (20 minutes) for long-running model inference
OLLAMA_TIMEOUT = (10, 1200)
# Retry configuration
MAX_RETRIES = 2
RETRY_DELAY = 5  # seconds

# ============================================================================
# Azure OpenAI Configuration (preferred)
# ============================================================================
# Base endpoint for your Azure OpenAI resource
AZURE_OPENAI_ENDPOINT = "https://navitopenai.openai.azure.com"

# Azure OpenAI API key (from working Postman test)
AZURE_OPENAI_API_KEY = "6FUIuGUVChfRqJC2NFSzpjl8MtZNYNVgOdnheCmWWdZzh5W2f4qDJQQJ99CAACPV0roXJ3w3AAABACOG7vYg"

# Deployment name for the model (must match Azure deployment name)
AZURE_OPENAI_DEPLOYMENT = "gpt-4o-mini"

# API version – aligned with working Postman call
AZURE_OPENAI_API_VERSION = "2024-02-15-preview"

# Full chat completions URL for convenience
AZURE_OPENAI_CHAT_URL = (
    f"{AZURE_OPENAI_ENDPOINT}/openai/deployments/"
    f"{AZURE_OPENAI_DEPLOYMENT}/chat/completions"
    f"?api-version={AZURE_OPENAI_API_VERSION}"
)

# ============================================================================
# SAP Configuration
# ============================================================================
SAP_BASE_URL = "http://103.152.79.22:8002"
SAP_USERNAME = "asakshi"
SAP_PASSWORD = "Hell@Sakshi122"
SAP_PURCHASING_ORG = "50000002"
SAP_BUSINESS_PARTNER = "2"

# SAP API Endpoints (derived from base URL)
SAP_FREIGHT_AGREEMENT_BASE = f"{SAP_BASE_URL}/sap/opu/odata4/sap/api_transpfreightagreement/srvd_a2x/sap/api_transpfreightagreement/0001"
SAP_RATE_TABLE_BASE = f"{SAP_BASE_URL}/sap/opu/odata4/sap/api_transpratetable/srvd_a2x/sap/transportationratetable/0001"

# ============================================================================
# API Server Configuration
# ============================================================================
API_HOST = "0.0.0.0"
API_PORT = 8002

# ============================================================================
# File Paths Configuration
# ============================================================================
TEMP_UPLOADS_DIR = "temp_uploads"
SYSTEM_FIELD_EXCEL_PATH = "Calculation_Scale_Base.xlsx"  # Not used anymore but kept for reference

# ============================================================================
# Rate card / Excel field selection
# ============================================================================
# Substrings that identify document/section headings (not column headers).
# Matches whose excel_column contains any of these (case-insensitive) are excluded from mapping.
# Override in env as comma-separated list: EXCLUDE_HEADING_SUBSTRINGS="rate per loaded kilometre,carrier name:"
EXCLUDE_HEADING_SUBSTRINGS = (
    "rate per loaded kilometre",
    "carrier name:",
)

# ============================================================================
# Application Configuration
# ============================================================================
APP_NAME = "LogisticsApp"
DEFAULT_USER_ID = "default_user"

# ============================================================================
# CORS Configuration (for Frontend-Backend Integration)
# ============================================================================
CORS_ORIGINS = [
    "http://localhost:5173",  # Frontend dev server
    "http://127.0.0.1:5173",
    "http://localhost:3000",  # Alternative frontend port
    "http://127.0.0.1:3000",
]

# ============================================================================
# Phoenix Tracing Configuration (DISABLED - not deployed)
# ============================================================================
# PHOENIX_URL = None
# PHOENIX_SYSTEM_API_KEY = None
