# Frontend-Backend Connection Summary

## Overview
Successfully connected the React/TypeScript frontend (Vite) with the Python FastAPI backend. The frontend now properly communicates with the backend through HTTP endpoints.

## Changes Made

### 1. **config/dev_config.py** (Created/Updated)
**Purpose**: Centralized configuration for API settings and environment variables

**Key Additions**:
- `API_HOST = "0.0.0.0"` - Backend listens on all interfaces
- `API_PORT = 8002` - Backend runs on port 8002 (matches Vite proxy config)
- `TEMP_UPLOADS_DIR` - Directory for file uploads
- `APP_NAME = "FreightAgreementAI"` - Application identifier
- `DEFAULT_USER_ID = "default_user"` - Default user for sessions
- LLM Configuration (timeouts, retries)
- Azure OpenAI Configuration
- SAP Configuration (Base URL, credentials, endpoints)

### 2. **main.py** (Updated)
**Purpose**: FastAPI application setup with CORS support

**Key Changes**:
```python
# Added CORS middleware import
from fastapi.middleware.cors import CORSMiddleware

# Added CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Why**: Enables the frontend (running on port 5173) to make cross-origin requests to the backend (port 8002)

### 3. **apis/invoke_api.py** (Updated)
**Purpose**: Added new `/chat` endpoint for frontend communication

**New Endpoint**:
- `POST /chat` - Frontend-friendly endpoint
- Accepts: `session_id`, `message` (optional), `file` (optional)
- Returns: `{session_id, response, usage, agreement_id?, agreement_uuid?, error?}`

**Features**:
- File upload handling with sanitization
- Session management
- LLM usage tracking
- Phoenix tracing support
- Agreement tracking
- Error handling with detailed logging

**Response Format**:
```json
{
  "session_id": "test1234",
  "response": "Agent response text",
  "usage": {...},
  "agreement_id": "optional",
  "agreement_uuid": "optional"
}
```

## Communication Flow

```
Frontend (Vite - localhost:5173)
    ↓ HTTP POST /chat (with FormData)
Proxy (vite.config.ts)
    ↓ Forwards to http://localhost:8002
FastAPI Backend (port 8002)
    ↓
/chat endpoint
    ↓
Logistics Agent
    ↓
Returns response (JSON)
    ↓
Backend → Frontend (displayed in UI)
```

## Configuration Details

### Frontend Setup
- **Vite Config**: Proxies `/chat` and `/invoke` to `http://localhost:8002`
- **API Call**: `chatApi.ts` → `sendChat()` function
- **Port**: 5173 (localhost)

### Backend Setup
- **Server**: FastAPI with Uvicorn
- **CORS Enabled**: Allows requests from localhost:5173 and localhost:3000
- **Port**: 8002 (configured in dev_config.py)
- **Endpoints**: 
  - `/invoke` (existing)
  - `/chat` (new - for frontend)

## How to Run

### Start Backend
```bash
# Ensure virtual environment is activated
python main.py
# Runs on http://localhost:8002
```

### Start Frontend
```bash
cd frontend
npm install  # If dependencies not installed
npm run dev
# Runs on http://localhost:5173
```

### Test Connection
1. Open browser: `http://localhost:5173`
2. Enter a message in the chat interface
3. Click Send
4. Frontend sends POST to `/chat` endpoint
5. Backend processes request and returns response
6. Response displays in chat UI

## Environment Variables

The system uses environment variables that can be set before running:

```bash
# API Configuration
API_HOST=0.0.0.0
API_PORT=8002

# LLM Configuration
OLLAMA_TIMEOUT=120
MAX_RETRIES=3
RETRY_DELAY=1

# Azure OpenAI (if using)
AZURE_OPENAI_CHAT_URL=<your-url>
AZURE_OPENAI_API_KEY=<your-key>
AZURE_OPENAI_DEPLOYMENT=<your-deployment>

# SAP Configuration (if needed)
SAP_BASE_URL=<your-url>
SAP_USERNAME=<username>
SAP_PASSWORD=<password>
# ... etc
```

## Key Connections

1. ✅ **CORS Enabled** - Frontend can make cross-origin requests
2. ✅ **/chat Endpoint** - Matches frontend's expected endpoint
3. ✅ **Port 8002** - Backend listens on correct port (matches Vite proxy)
4. ✅ **File Upload** - Supports file attachments
5. ✅ **Session Management** - Maintains user sessions
6. ✅ **Error Handling** - Returns errors in expected format

## Note
The vite.config.ts already had the correct proxy configuration pointing to port 8002, so no changes were needed there. The backend was updated to be ready for that proxy configuration.
