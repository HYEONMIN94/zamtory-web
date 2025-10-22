'use client'

import { Badge, Button } from '@zamtory/ui'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h2 className="text-xl font-semibold">{title}</h2>

      <div className="flex gap-3 items-center">
        <Badge variant="success">활성</Badge>
        <Button variant="outline" size="sm">
          새로고침
        </Button>
      </div>
    </header>
  )
}
