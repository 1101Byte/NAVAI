import React, { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'
import type { Message } from '../types'

interface MessageListProps {
  messages: Message[]
  sending: boolean
}

export function MessageList({ messages, sending }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight
      })
    }
  }, [messages, sending])

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0 bg-[#f8fafc] px-4 py-4">
      {messages.length === 0 && !sending ? (
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, rgba(62, 132, 197, 0.12) 0%, rgba(22, 186, 231, 0.12) 100%)' }}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#3E84C5' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <p className="font-medium mb-1" style={{ color: '#3E84C5' }}>Start a conversation</p>
          <p className="text-sm text-slate-500 max-w-[260px]">
            Upload an agreement PDF or rate card Excel to get started. Ask anything about freight agreements.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m, index) => (
            <MessageBubble
              key={`${m.id}-${index}`}
              message={m}
            />
          ))}
          {sending && <TypingIndicator />}
        </div>
      )}
    </div>
  )
}
