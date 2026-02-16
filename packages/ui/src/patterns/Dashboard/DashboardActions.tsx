'use client'

import { useState } from 'react'
import { Button } from '../../primitives/Button'
import { ConfirmDialog } from '../../composites/ConfirmDialog'
import type { DashboardActionConfig } from './types'

interface DashboardActionsProps {
  actions: DashboardActionConfig[]
}

export function DashboardActions({ actions }: DashboardActionsProps) {
  const [confirmKey, setConfirmKey] = useState<string | null>(null)

  const visibleActions = actions.filter((a) => a.visible !== false)

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {visibleActions.map((action) => (
          <Button
            key={action.key}
            variant={action.variant}
            onClick={
              action.confirm
                ? () => setConfirmKey(action.key)
                : action.onClick
            }
            isLoading={action.isLoading}
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
      {visibleActions
        .filter((a) => a.confirm)
        .map((action) => (
          <ConfirmDialog
            key={action.key}
            open={confirmKey === action.key}
            onOpenChange={(open) => !open && setConfirmKey(null)}
            title={action.confirm!.title}
            description={action.confirm!.description}
            confirmLabel={action.confirm!.confirmLabel}
            onConfirm={() => action.onClick?.()}
            icon={action.confirm!.icon}
          />
        ))}
    </>
  )
}
