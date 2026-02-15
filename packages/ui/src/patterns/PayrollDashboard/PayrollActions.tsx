'use client'

import { useState } from 'react'
import { Button } from '../../primitives/Button'
import { ConfirmDialog } from '../../composites/ConfirmDialog'

interface PayrollActionsProps {
  onGenerateAll?: () => void
  onApproveAll?: () => void
  onExport?: () => void
  pendingCount?: number
  isGenerating?: boolean
  isApproving?: boolean
}

export function PayrollActions({
  onGenerateAll,
  onApproveAll,
  onExport,
  pendingCount = 0,
  isGenerating,
  isApproving,
}: PayrollActionsProps) {
  const [showApproveConfirm, setShowApproveConfirm] = useState(false)

  const handleApproveAll = async () => {
    await onApproveAll?.()
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="primary"
          onClick={onGenerateAll}
          isLoading={isGenerating}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Generate All Payslips
        </Button>
        {pendingCount > 0 && (
          <Button
            variant="accent"
            onClick={() => setShowApproveConfirm(true)}
            isLoading={isApproving}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Approve All ({pendingCount})
          </Button>
        )}
        <Button variant="secondary" onClick={onExport}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </Button>
      </div>

      <ConfirmDialog
        open={showApproveConfirm}
        onOpenChange={setShowApproveConfirm}
        title="Approve All Payslips"
        description={`Are you sure you want to approve ${pendingCount} pending payslip${pendingCount !== 1 ? 's' : ''}? This action cannot be undone.`}
        confirmLabel="Approve All"
        onConfirm={handleApproveAll}
        isConfirming={isApproving}
        icon={
          <svg className="h-5 w-5 text-[#8DB580]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
      />
    </>
  )
}
