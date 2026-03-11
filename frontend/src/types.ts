export type MessageRole = 'user' | 'assistant'

export interface FieldMapping {
  excel_column: string
  system_field_key: string
  system_field_description: string
}

export interface FieldSelectionMeta {
  type: 'field_selection'
  mappedFields: FieldMapping[]
  scalePrompt?: string
  columnMapping?: Record<string, string>
  weightColumns?: string[]
}

export interface Message {
  id: string
  role: MessageRole
  content: string
  attachedFileName?: string
  meta?: string
  fieldSelectionMeta?: FieldSelectionMeta
  timestamp?: Date
}
