/**
 * Chat API - calls Flask /chat which proxies to FastAPI /invoke
 */
export interface ChatResponse {
  session_id?: string
  response?: string
  error?: string
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

  const res = await fetch('/chat', {
    method: 'POST',
    body: formData,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    return { error: data.error || `HTTP ${res.status}` }
  }
  return data
}
