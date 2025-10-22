'use client'

import { Card } from '@zamtory/ui'

export function RecentActivity() {
  return (
    <Card title="최근 활동" variant="elevated">
      <div className="py-4">
        <div className="text-sm text-gray-500">
          최근 활동 내역이 여기에 표시됩니다.
        </div>
      </div>
    </Card>
  )
}
