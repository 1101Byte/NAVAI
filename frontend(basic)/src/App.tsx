import React, { useState, useCallback } from 'react'
import { ChatHeader } from './components/ChatHeader'
import { ChatInput } from './components/ChatInput'
import { MessageList } from './components/MessageList'
import { StatusBar } from './components/StatusBar'
import { sendChat } from './chatApi'
import type { Message } from './types'

function generateSessionId(): string {
  const digits = Math.floor(1000 + Math.random() * 9000) // 1000–9999
  return 'test' + digits
}

function App() {
  const [sessionId, setSessionId] = useState(generateSessionId)
  const [messages, setMessages] = useState<Message[]>([])
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('Ready')
  const [statusError, setStatusError] = useState(false)

  const handleSend = useCallback(
    async (text: string, file?: File) => {
      const userMsg: Message = {
        id: 'u-' + Date.now(),
        role: 'user',
        content: text || (file ? '' : 'Hello'),
        attachedFileName: file?.name,
      }
      setMessages((prev) => [...prev, userMsg])
      setSending(true)
      setStatus('Sending...')
      setStatusError(false)

      try {
        const res = await sendChat(sessionId, text || 'Hello', file)
        const content = (res.response ?? res.error ?? 'No response').replace(/\bundefined\b/gi, '').trim()
        const assistantMsg: Message = {
          id: 'a-' + Date.now(),
          role: 'assistant',
          content: res.error ? `Error: ${content}` : content,
        }
        setMessages((prev) => [...prev, assistantMsg])
        setStatus(res.error ? `Error: ${res.error}` : 'Ready')
        setStatusError(!!res.error)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Request failed'
        setMessages((prev) => [
          ...prev,
          { id: 'a-' + Date.now(), role: 'assistant', content: `Error: ${msg}` },
        ])
        setStatus(`Error: ${msg}`)
        setStatusError(true)
      } finally {
        setSending(false)
      }
    },
    [sessionId]
  )

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 50%, #475569 100%)' }}>
      <div className="w-full max-w-2xl h-[85vh] min-h-[500px] flex flex-col bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden animate-chat-window-enter">
        <ChatHeader sessionId={sessionId} onSessionIdChange={setSessionId} />
        <MessageList messages={messages} sending={sending} />
        <ChatInput onSend={handleSend} disabled={sending} />
        <StatusBar status={status} error={statusError} />
      </div>
    </div>
  )
}

export default App
