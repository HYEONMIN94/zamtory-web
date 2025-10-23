import type { Node } from '@xyflow/react'

export type NodeTypeKey = 'textNode' | 'choiceNode' | 'imageNode'

export interface NodeConfig {
  label: string
  icon: string
  borderColor: string
  textColor: string
  backgroundColor: string
  defaultData: Record<string, unknown>
}

export type NodeTypeConfigs = Record<NodeTypeKey, NodeConfig>

export interface EditorStyles {
  container: React.CSSProperties
  header: React.CSSProperties
  main: React.CSSProperties
  sidebar: React.CSSProperties
  editorArea: React.CSSProperties
}

export interface LayoutConstants {
  sidebarWidth: number
  headerPadding: number
  sidebarPadding: number
}

export interface NodeWithUpdateCallback extends Node {
  data: Node['data'] & {
    onUpdate?: (updates: Record<string, unknown>) => void
  }
}
