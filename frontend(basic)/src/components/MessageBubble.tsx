import React, { memo } from 'react'
import type { Message } from '../types'

interface MessageBubbleProps {
  message: Message
}

function MessageBubbleComponent({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const content = (message.content ?? '').replace(/\bundefined\b/gi, '').trim()
  const hasAttachment = !!message.attachedFileName

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex flex-col max-w-[80%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`inline-flex flex-col px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed ${
            isUser
              ? 'rounded-br-md text-white shadow-sm'
              : 'rounded-bl-md bg-white text-slate-800 shadow-sm border border-slate-200/80'
          }`}
          style={isUser ? { background: 'linear-gradient(135deg, #3E84C5 0%, #16BAE7 100%)' } : undefined}
        >
          {hasAttachment && (
            <span className={`text-xs mb-1.5 ${isUser ? 'text-white/90' : 'text-slate-500'}`}>
              📎 {message.attachedFileName}
            </span>
          )}
          {isUser ? (
            <span className="whitespace-pre-wrap break-words">{content || (hasAttachment ? '' : 'Hello')}</span>
          ) : (
            <span className="whitespace-pre-wrap break-words">
              {content || ' '}
            </span>
          )}
        </div>
        <span className={`mt-1 text-[11px] ${isUser ? 'text-[#3E84C5]' : 'text-slate-400'}`}>
          {isUser ? 'You' : 'Assistant'}
        </span>
      </div>
    </div>
  )
}

export const MessageBubble = memo(MessageBubbleComponent)
