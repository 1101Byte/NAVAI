import React, { useState, useRef } from 'react'

interface ChatInputProps {
  onSend: (message: string, file?: File) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (disabled) return
    const trimmed = message.trim()
    if (!trimmed && !file) return
    onSend(trimmed || (file ? '' : 'Hello'), file || undefined)
    setMessage('')
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="shrink-0 border-t border-slate-200 bg-white px-4 py-3"
    >
      {file && (
        <div className="mb-2 flex items-center gap-2 px-3 py-2 rounded-xl border" style={{ backgroundColor: 'rgba(62, 132, 197, 0.1)', borderColor: 'rgba(62, 132, 197, 0.35)' }}>
          <span style={{ color: '#3E84C5' }}>📎</span>
          <span className="text-sm truncate flex-1 font-medium" style={{ color: '#2563a8' }}>{file.name}</span>
          <button
            type="button"
            onClick={removeFile}
            className="text-slate-500 hover:text-red-500 text-sm font-medium shrink-0"
          >
            Remove
          </button>
        </div>
      )}
      <div className="flex gap-2 items-end">
        <div className="flex-1 flex items-center gap-2 min-h-[42px] rounded-2xl bg-slate-100 border border-slate-200 pl-2 pr-3 py-2 focus-within:ring-2 focus-within:ring-[#3E84C5]/40 focus-within:border-[#3E84C5]/50">
          <label
            onClick={(e) => { if (disabled) e.preventDefault() }}
            className={`attach-btn shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-white transition-all duration-200 ${
              disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:scale-105'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              disabled={disabled}
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            disabled={disabled}
            className="flex-1 min-h-[38px] max-h-[100px] resize-none bg-transparent border-0 px-1 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={disabled}
          className="shrink-0 h-[42px] px-5 rounded-2xl text-white font-medium text-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#3E84C5]/40 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
          style={{ background: 'linear-gradient(135deg, #3E84C5 0%, #16BAE7 100%)' }}
        >
          Send
        </button>
      </div>
      <p className="text-[11px] text-slate-400 mt-1.5 pl-1">PDF or Excel • Shift+Enter for new line</p>
    </form>
  )
}
