import type { EditorStyles, LayoutConstants, NodeTypeConfigs } from './types'

/**
 * Layout constants for editor dimensions
 */
export const LAYOUT: LayoutConstants = {
  sidebarWidth: 280,
  headerPadding: 16,
  sidebarPadding: 24,
}

/**
 * Editor component styles (defined outside component to prevent recreation on each render)
 */
export const EDITOR_STYLES: EditorStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
  },
  main: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  sidebar: {
    width: '280px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e5e7eb',
    padding: '24px',
    overflowY: 'auto',
  },
  editorArea: {
    flex: 1,
    position: 'relative',
  },
}

/**
 * Node type configurations including colors, labels, and default data
 */
export const NODE_TYPE_CONFIGS: NodeTypeConfigs = {
  textNode: {
    label: '💬 텍스트 노드',
    icon: '💬',
    borderColor: '#0ea5e9',
    textColor: '#0ea5e9',
    backgroundColor: '#f0f9ff',
    defaultData: {
      text: '새 텍스트 노드',
      character: '캐릭터',
    },
  },
  choiceNode: {
    label: '🔀 선택지 노드',
    icon: '🔀',
    borderColor: '#d946ef',
    textColor: '#d946ef',
    backgroundColor: '#fdf4ff',
    defaultData: {
      question: '질문을 입력하세요',
      choices: ['선택지 1', '선택지 2'],
    },
  },
  imageNode: {
    label: '🖼️ 이미지 노드',
    icon: '🖼️',
    borderColor: '#10b981',
    textColor: '#10b981',
    backgroundColor: '#f0fdf4',
    defaultData: {
      imageUrl: '',
      caption: '이미지 설명',
    },
  },
}

/**
 * Initial node ID counter
 */
export const INITIAL_NODE_ID = 2
