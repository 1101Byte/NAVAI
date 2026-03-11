import React, { memo, useCallback } from 'react'
import type { Message, FieldMapping } from '../types'
import { FieldSelectionPanel } from './FieldSelectionPanel'

interface MessageBubbleProps {
  message: Message
  onFieldValidation?: (messageId: string, selectedFields: FieldMapping[]) => void
  onFieldRerun?: (messageId: string) => void
}

function MessageBubbleComponent({ message, onFieldValidation, onFieldRerun }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const content = (message.content ?? '').replace(/\bundefined\b/gi, '').trim()
  const hasAttachment = !!message.attachedFileName

  const handleValidate = useCallback(
    (selectedFields: FieldMapping[]) => {
      onFieldValidation?.(message.id, selectedFields)
    },
    [message.id, onFieldValidation]
  )

  const handleRerun = useCallback(() => {
    onFieldRerun?.(message.id)
  }, [message.id, onFieldRerun])

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex flex-col max-w-[80%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'} w-full`}>
        <div
          className={`inline-flex flex-col px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed ${
            isUser
              ? 'rounded-br-md text-white shadow-sm'
              : 'rounded-bl-md text-white shadow-sm border border-white/20'
          }`}
          style={
            isUser
              ? { background: 'linear-gradient(135deg, #b168ba 0%, #b667b8 100%)' }
              : { background: 'linear-gradient(135deg, #8276d1 0%, #8772cd 100%)' }
          }
        >
          {hasAttachment && (
            <span className={`text-xs mb-1.5 ${isUser ? 'text-white/90' : 'text-white/90'}`}>
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

        {!isUser && message.fieldSelectionMeta && onFieldValidation && onFieldRerun && (
          <div className="w-full mt-3">
            <FieldSelectionPanel
              mappedFields={message.fieldSelectionMeta.mappedFields}
              scalePrompt={message.fieldSelectionMeta.scalePrompt}
              onValidate={handleValidate}
              onRerun={handleRerun}
            />
          </div>
        )}

        <span className={`mt-1 text-[11px] ${isUser ? 'text-[#202068]' : 'text-slate-400'}`}>
          {isUser ? 'You' : 'Assistant'}
        </span>
      </div>
    </div>
  )
}

export const MessageBubble = memo(MessageBubbleComponent)
