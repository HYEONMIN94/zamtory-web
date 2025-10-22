'use client'

import { Card, Badge } from '@zamtory/ui'

interface StatsCardProps {
  label: string
  value: string
  change: string
}

export function StatsCard({ label, value, change }: StatsCardProps) {
  return (
    <Card variant="elevated">
      <div className="p-2">
        <div className="text-sm text-gray-500 mb-2">{label}</div>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold">{value}</div>
          <Badge variant="success" size="sm">
            {change}
          </Badge>
        </div>
      </div>
    </Card>
  )
}
