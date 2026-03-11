import React, { useState, useCallback } from 'react'
import { ChatHeader } from './components/ChatHeader'
import { ChatInput } from './components/ChatInput'
import { MessageList } from './components/MessageList'
import { StatusBar } from './components/StatusBar'
import { sendChat, sendFieldSelection } from './chatApi'
import type { Message, FieldMapping } from './types'

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

        // Parse field selection metadata if present
        if (res.field_selection && res.field_selection.type === 'field_selection') {
          assistantMsg.fieldSelectionMeta = {
            type: 'field_selection',
            mappedFields: res.field_selection.mappedFields || [],
            scalePrompt: res.field_selection.scalePrompt,
            columnMapping: res.field_selection.columnMapping,
            weightColumns: res.field_selection.weightColumns,
          }
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

  const handleFieldValidation = useCallback(
    async (messageId: string, selectedFields: FieldMapping[]) => {
      setSending(true)
      setStatus('Validating field selection...')
      setStatusError(false)

      try {
        const res = await sendFieldSelection(sessionId, 'validate', selectedFields)
        const content = (res.response ?? res.error ?? 'No response').replace(/\bundefined\b/gi, '').trim()
        
        const assistantMsg: Message = {
          id: 'a-' + Date.now(),
          role: 'assistant',
          content: res.error ? `Error: ${content}` : content,
        }

        if (res.field_selection && res.field_selection.type === 'field_selection') {
          assistantMsg.fieldSelectionMeta = {
            type: 'field_selection',
            mappedFields: res.field_selection.mappedFields || [],
            scalePrompt: res.field_selection.scalePrompt,
            columnMapping: res.field_selection.columnMapping,
            weightColumns: res.field_selection.weightColumns,
          }
        }

        setMessages((prev) => [...prev, assistantMsg])
        setStatus(res.error ? `Error: ${res.error}` : 'Field selection validated')
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

  const handleFieldRerun = useCallback(
    async (messageId: string) => {
      setSending(true)
      setStatus('Re-running field selection...')
      setStatusError(false)

      try {
        const res = await sendFieldSelection(sessionId, 'rerun')
        const content = (res.response ?? res.error ?? 'No response').replace(/\bundefined\b/gi, '').trim()
        
        const assistantMsg: Message = {
          id: 'a-' + Date.now(),
          role: 'assistant',
          content: res.error ? `Error: ${content}` : content,
        }

        if (res.field_selection && res.field_selection.type === 'field_selection') {
          assistantMsg.fieldSelectionMeta = {
            type: 'field_selection',
            mappedFields: res.field_selection.mappedFields || [],
            scalePrompt: res.field_selection.scalePrompt,
            columnMapping: res.field_selection.columnMapping,
            weightColumns: res.field_selection.weightColumns,
          }
        }

        setMessages((prev) => [...prev, assistantMsg])
        setStatus(res.error ? `Error: ${res.error}` : 'Field selection re-run')
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
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6"
      style={{
        background:
          'radial-gradient(1200px circle at 10% 20%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 55%),' +
          'radial-gradient(900px circle at 90% 10%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 50%),' +
          'linear-gradient(120deg, var(--pluto-bg-left) 0%, var(--pluto-bg-mid) 50%, var(--pluto-bg-right) 100%)',
      }}
    >
      <div className="w-full max-w-2xl h-[85vh] min-h-[520px] flex flex-col rounded-3xl shadow-2xl border border-white/25 bg-white/70 backdrop-blur-xl overflow-hidden animate-chat-window-enter ring-1 ring-white/20">
        <ChatHeader sessionId={sessionId} onSessionIdChange={setSessionId} />
        <MessageList 
          messages={messages} 
          sending={sending}
          onFieldValidation={handleFieldValidation}
          onFieldRerun={handleFieldRerun}
        />
        <div style={{ position: 'absolute', right: '1rem', bottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Session</span>
          <input
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            style={{ width: '96px', height: '24px' }}
            placeholder="test1234"
          />
        </div>
        <ChatInput onSend={handleSend} disabled={sending} />
        <StatusBar status={status} error={statusError} />
      </div>
    </div>
  )
}

export default App
