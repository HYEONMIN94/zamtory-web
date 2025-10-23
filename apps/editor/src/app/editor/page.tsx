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
import { EDITOR_STYLES, NODE_TYPE_CONFIGS, INITIAL_NODE_ID } from './constants'
import type { NodeTypeKey } from './types'

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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [nodeId, setNodeId] = useState(INITIAL_NODE_ID)

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

  /**
   * Initialize existing nodes with onUpdate callback on component mount.
   * This effect runs only once because updateNodeData is stable (depends only on setNodes).
   */
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
  }, [updateNodeData, setNodes])

  const addNode = (type: NodeTypeKey) => {
    const id = `${nodeId}`
    const config = NODE_TYPE_CONFIGS[type]

    const newNode: Node = {
      id,
      type,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: {
        ...config.defaultData,
        onUpdate: (updates: Record<string, unknown>) => updateNodeData(id, updates),
      },
    }
    setNodes((nds) => [...nds, newNode])
    setNodeId((id) => id + 1)
  }

  return (
    <div style={EDITOR_STYLES.container}>
      {/* Header */}
      <header style={EDITOR_STYLES.header}>
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
      <main style={EDITOR_STYLES.main}>
        {/* Sidebar */}
        <aside style={EDITOR_STYLES.sidebar}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
            스토리 노드
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(Object.entries(NODE_TYPE_CONFIGS) as [NodeTypeKey, typeof NODE_TYPE_CONFIGS[NodeTypeKey]][]).map(
              ([nodeType, config]) => (
                <Button
                  key={nodeType}
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => addNode(nodeType)}
                  style={{
                    borderColor: config.borderColor,
                    color: config.textColor,
                    backgroundColor: config.backgroundColor,
                  }}
                >
                  {config.label}
                </Button>
              )
            )}
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
        <section style={EDITOR_STYLES.editorArea}>
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
