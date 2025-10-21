/**
 * Node Type Definitions
 * Centralized type definitions for all node types in the editor
 */

/**
 * Base interface for all node data types
 * Provides common onUpdate callback for node data modifications
 */
export interface BaseNodeData {
  onUpdate?: (updates: Record<string, unknown>) => void
}

/**
 * Text node data interface
 * Represents a story text node with character dialogue
 */
export interface TextNodeData extends BaseNodeData {
  text: string
  character?: string
}

/**
 * Choice node data interface
 * Represents a branching choice node with multiple options
 */
export interface ChoiceNodeData extends BaseNodeData {
  question: string
  choices: string[]
}

/**
 * Image node data interface
 * Represents an image node with optional caption
 */
export interface ImageNodeData extends BaseNodeData {
  imageUrl?: string
  caption?: string
}
