/**
 * Select Component
 * 드롭다운 선택 컴포넌트
 */

import React, { useState, useRef, useEffect } from 'react'
import { colors, spacing, fontSize, fontWeight, fontFamily, borderRadius, shadows } from '../tokens'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  fullWidth?: boolean
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  label,
  error,
  disabled = false,
  fullWidth = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)

  // 선택된 옵션 찾기
  const selectedOption = options.find((opt) => opt.value === selectedValue)

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // value prop 변경 감지
  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    setIsOpen(false)
    onChange?.(optionValue)
  }

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
    width: fullWidth ? '100%' : 'auto',
    position: 'relative',
  }

  const labelStyles: React.CSSProperties = {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.neutral[700],
  }

  const selectButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing[3]} ${spacing[4]}`,
    backgroundColor: disabled ? colors.neutral[50] : colors.neutral[0],
    border: `1px solid ${error ? colors.error[500] : isOpen ? colors.primary[500] : colors.neutral[300]}`,
    borderRadius: borderRadius.md,
    fontSize: fontSize.sm,
    color: selectedOption ? colors.neutral[900] : colors.neutral[500],
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    transition: 'all 0.2s',
    width: '100%',
    minWidth: '200px',
  }

  const dropdownStyles: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: spacing[1],
    backgroundColor: colors.neutral[0],
    border: `1px solid ${colors.neutral[200]}`,
    borderRadius: borderRadius.md,
    boxShadow: shadows.md,
    maxHeight: '240px',
    overflowY: 'auto',
    zIndex: 1000,
  }

  const optionStyles = (option: SelectOption, isSelected: boolean): React.CSSProperties => ({
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: fontSize.sm,
    color: option.disabled ? colors.neutral[400] : isSelected ? colors.primary[700] : colors.neutral[900],
    backgroundColor: isSelected ? colors.primary[50] : 'transparent',
    cursor: option.disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s',
  })

  const errorStyles: React.CSSProperties = {
    fontSize: fontSize.xs,
    color: colors.error[600],
  }

  const arrowStyles: React.CSSProperties = {
    transition: 'transform 0.2s',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }

  return (
    <div style={containerStyles} ref={containerRef}>
      {label && <label style={labelStyles}>{label}</label>}

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={selectButtonStyles}
        disabled={disabled}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <svg
          style={arrowStyles}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>

      {isOpen && !disabled && (
        <div style={dropdownStyles}>
          {options.map((option) => {
            const isSelected = option.value === selectedValue
            return (
              <div
                key={option.value}
                onClick={() => !option.disabled && handleSelect(option.value)}
                style={optionStyles(option, isSelected)}
                onMouseEnter={(e) => {
                  if (!option.disabled && !isSelected) {
                    e.currentTarget.style.backgroundColor = colors.neutral[50]
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                {option.label}
                {isSelected && (
                  <span style={{ marginLeft: spacing[2] }}>✓</span>
                )}
              </div>
            )
          })}
        </div>
      )}

      {error && <span style={errorStyles}>{error}</span>}
    </div>
  )
}
