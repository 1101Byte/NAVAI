export type MessageRole = 'user' | 'assistant'

export interface Message {
  id: string
  role: MessageRole
  content: string
  attachedFileName?: string
  meta?: string
  timestamp?: Date
}
