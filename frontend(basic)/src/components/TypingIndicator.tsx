import React from 'react'

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex flex-col max-w-[80%] sm:max-w-[75%]">
        <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl rounded-bl-md bg-white border border-slate-200/80 shadow-sm">
          <span className="w-2 h-2 rounded-full animate-typing-dot" style={{ animationDelay: '0ms', backgroundColor: '#3E84C5' }} />
          <span className="w-2 h-2 rounded-full animate-typing-dot" style={{ animationDelay: '160ms', backgroundColor: '#16BAE7' }} />
          <span className="w-2 h-2 rounded-full animate-typing-dot" style={{ animationDelay: '320ms', backgroundColor: '#3E84C5' }} />
        </div>
        <span className="mt-1 text-[11px] text-slate-400">typing...</span>
      </div>
    </div>
  )
}
