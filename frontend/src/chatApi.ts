/**
 * Chat API - Communicates with FastAPI backend /chat endpoint
 */
export interface ChatResponse {
  session_id?: string
  response?: string
  error?: string
  field_selection?: {
    type: 'field_selection'
    mappedFields: Array<{
      excel_column: string
      system_field_key: string
      system_field_description: string
    }>
    scalePrompt?: string
    columnMapping?: Record<string, string>
    weightColumns?: string[]
  }
  usage?: {
    input_tokens?: number
    output_tokens?: number
    total_tokens?: number
  }
}

const API_BASE = import.meta.env.VITE_API_URL;

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    return res.ok
  } catch {
    return false
  }
}

export async function sendChat(
  sessionId: string,
  message: string,
  file?: File
): Promise<ChatResponse> {
  const formData = new FormData()
  formData.append('session_id', sessionId)
  formData.append('message', message || 'Hello')

  if (file && file.name) {
    formData.append('file', file)
  }

  // prefer explicit invoke endpoint; fall back to /chat for legacy proxy
  const endpoint = API_BASE ? `${API_BASE}/invoke` : '/invoke'

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return { error: data.error || `HTTP ${res.status}` }
    }
    return data
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Network error or backend unreachable'
    }
  }
}

export async function sendFieldSelection(
  sessionId: string,
  action: 'validate' | 'rerun',
  selectedFields?: Array<{
    excel_column: string
    system_field_key: string
    system_field_description: string
  }>
): Promise<ChatResponse> {
  try {
    const formData = new FormData()
    formData.append('session_id', sessionId)

    if (action === 'validate') {
      formData.append('message', 'validate')

      if (selectedFields && selectedFields.length > 0) {
        formData.append(
          'selected_field_keys',
          JSON.stringify(selectedFields.map(f => f.system_field_key))
        )
      }
    } else {
      formData.append('message', 'retry')
    }

    const res = await fetch(API_BASE ? `${API_BASE}/invoke` : '/invoke', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return { error: data.error || `HTTP ${res.status}` }
    }
    return data
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error or backend unreachable'
    }
  }
}