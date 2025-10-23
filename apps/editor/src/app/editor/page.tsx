'use client'

import { useCallback, useState, useEffect } from 'react'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  SelectionMode,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Button } from '@zamtory/ui'
import { TextNode, ChoiceNode, ImageNode } from '../../components/nodes'

const nodeTypes = {
  textNode: TextNode,
  choiceNode: ChoiceNode,
  imageNode: ImageNode,
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'textNode',
    position: { x: 250, y: 100 },
    data: {
      text: '스토리의 시작입니다.\n환영합니다!',
      character: '내레이터',
    },
  },
]

const initialEdges: Edge[] = []

export default function EditorPage() {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  }

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
  }

  const mainStyles: React.CSSProperties = {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  }

  const sidebarStyles: React.CSSProperties = {
    width: '280px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e5e7eb',
    padding: '24px',
    overflowY: 'auto',
  }

  const editorAreaStyles: React.CSSProperties = {
    flex: 1,
    position: 'relative',
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [nodeId, setNodeId] = useState(2)

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes, edges: selectedEdges }: { nodes: Node[]; edges: Edge[] }) => {
      console.log('Selected nodes:', selectedNodes.length)
      console.log('Selected edges:', selectedEdges.length)
    },
    []
  )

  const updateNodeData = useCallback(
    (nodeId: string, newData: Record<string, unknown>) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
        )
      )
    },
    [setNodes]
  )

  // Add onUpdate callback to existing nodes on mount
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onUpdate: (updates: Record<string, unknown>) => updateNodeData(node.id, updates),
        },
      }))
    )
  }, [updateNodeData])

  const addNode = (type: string) => {
    const id = `${nodeId}`
    const baseData =
      type === 'textNode'
        ? { text: '새 텍스트 노드', character: '캐릭터' }
        : type === 'choiceNode'
        ? { question: '질문을 입력하세요', choices: ['선택지 1', '선택지 2'] }
        : { imageUrl: '', caption: '이미지 설명' }

    const newNode: Node = {
      id,
      type,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: {
        ...baseData,
        onUpdate: (updates: Record<string, unknown>) => updateNodeData(id, updates),
      },
    }
    setNodes((nds) => [...nds, newNode])
    setNodeId((id) => id + 1)
  }

  return (
    <div style={containerStyles}>
      {/* Header */}
      <header style={headerStyles}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#111827' }}>
          Zamtory Editor
        </h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="outline" size="md">
            미리보기
          </Button>
          <Button variant="primary" size="md">
            저장
          </Button>
        </div>
      </header>

      {/* Main */}
      <main style={mainStyles}>
        {/* Sidebar */}
        <aside style={sidebarStyles}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
            스토리 노드
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => addNode('textNode')}
              style={{
                borderColor: '#0ea5e9',
                color: '#0ea5e9',
                backgroundColor: '#f0f9ff',
              }}
            >
              💬 텍스트 노드
            </Button>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => addNode('choiceNode')}
              style={{
                borderColor: '#d946ef',
                color: '#d946ef',
                backgroundColor: '#fdf4ff',
              }}
            >
              🔀 선택지 노드
            </Button>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => addNode('imageNode')}
              style={{
                borderColor: '#10b981',
                color: '#10b981',
                backgroundColor: '#f0fdf4',
              }}
            >
              🖼️ 이미지 노드
            </Button>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
              통계
            </h3>
            <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.8' }}>
              <div>노드 수: {nodes.length}</div>
              <div>연결 수: {edges.length}</div>
            </div>
          </div>
        </aside>

        {/* Editor Area */}
        <section style={editorAreaStyles}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            nodeDragThreshold={10}
            defaultEdgeOptions={{
              animated: true,
              style: { strokeWidth: 3 },
            }}
            fitView
            // 다중 선택 기능
            selectionOnDrag={true}
            panOnDrag={[1, 2]}
            selectionMode={SelectionMode.Partial}
            multiSelectionKeyCode="Shift"
            deleteKeyCode="Delete"
            selectNodesOnDrag={true}
            onSelectionChange={onSelectionChange}
          >
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </section>
      </main>
    </div>
  )
}
