'use client'

import {
  forwardRef,
  useState,
  useRef,
  type ChangeEvent,
  type DragEvent,
} from 'react'
import { cn } from '../../utils/cn'

export interface FileInputProps {
  label?: string
  error?: string
  hint?: string
  value?: File[]
  onValueChange?: (files: File[]) => void
  /** Native onChange handler for FormField compatibility */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  required?: boolean
  /** Accepted file types (e.g., "image/*,.pdf") */
  accept?: string
  /** Allow multiple file selection */
  multiple?: boolean
  /** Maximum file size in bytes */
  maxSize?: number
  /** Maximum number of files */
  maxFiles?: number
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      value,
      onValueChange,
      onChange,
      disabled,
      id,
      name,
      required,
      accept,
      multiple = false,
      maxSize,
      maxFiles,
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const descriptionId = error || hint ? `${inputId}-description` : undefined
    const inputRef = useRef<HTMLInputElement>(null)

    const [files, setFiles] = useState<File[]>(value ?? [])
    const [isDragging, setIsDragging] = useState(false)
    const [localError, setLocalError] = useState<string | null>(null)

    const displayError = error || localError

    const validateFiles = (newFiles: File[]): { valid: File[]; error: string | null } => {
      let validFiles = [...newFiles]
      let validationError: string | null = null

      // Check max files
      if (maxFiles && files.length + validFiles.length > maxFiles) {
        validFiles = validFiles.slice(0, maxFiles - files.length)
        validationError = `Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`
      }

      // Check file sizes
      if (maxSize) {
        const oversized = validFiles.filter((f) => f.size > maxSize)
        if (oversized.length > 0) {
          validFiles = validFiles.filter((f) => f.size <= maxSize)
          validationError = `File size must be less than ${formatFileSize(maxSize)}`
        }
      }

      return { valid: validFiles, error: validationError }
    }

    const handleFiles = (newFiles: FileList | null) => {
      if (!newFiles || newFiles.length === 0) return

      const fileArray = Array.from(newFiles)
      const { valid, error: validationError } = validateFiles(fileArray)

      setLocalError(validationError)

      if (valid.length > 0) {
        const updatedFiles = multiple ? [...files, ...valid] : valid
        setFiles(updatedFiles)
        onValueChange?.(updatedFiles)
      }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
      onChange?.(e)
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (!disabled) {
        setIsDragging(true)
      }
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      if (!disabled) {
        handleFiles(e.dataTransfer.files)
      }
    }

    const removeFile = (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index)
      setFiles(updatedFiles)
      onValueChange?.(updatedFiles)
      setLocalError(null)
    }

    const openFilePicker = () => {
      inputRef.current?.click()
    }

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-[#2C2824]"
          >
            {label}
          </label>
        )}
        <input
          ref={(node) => {
            // Handle both refs
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node
          }}
          id={inputId}
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          required={required && files.length === 0}
          onChange={handleChange}
          className="sr-only"
          aria-describedby={descriptionId}
          aria-invalid={displayError ? true : undefined}
        />

        {/* Drop zone */}
        <div
          onClick={openFilePicker}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-[10px] border-2 border-dashed p-4',
            'transition-all duration-200',
            disabled
              ? 'cursor-not-allowed bg-[#F5F3EF] opacity-50'
              : isDragging
              ? 'border-[#B8A48E] bg-[#F5F3EF]'
              : displayError
              ? 'border-[#F87171] bg-white hover:border-[#F87171] hover:bg-[#FEF2F2]'
              : 'border-[rgba(184,164,142,0.25)] bg-white hover:border-[#B8A48E] hover:bg-[#F5F3EF]',
            className
          )}
        >
          <svg
            className={cn(
              'mb-2 h-8 w-8',
              isDragging ? 'text-[#B8A48E]' : 'text-[#8A847A]'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm text-[#5C574F]">
            <span className="font-medium text-[#2C2824]">Click to upload</span> or drag and drop
          </p>
          {accept && (
            <p className="mt-1 text-xs text-[#8A847A]">
              {accept.split(',').join(', ')}
            </p>
          )}
          {maxSize && (
            <p className="mt-0.5 text-xs text-[#8A847A]">
              Max size: {formatFileSize(maxSize)}
            </p>
          )}
        </div>

        {/* File list */}
        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-md border border-[rgba(184,164,142,0.25)] bg-[#F5F3EF] px-3 py-2"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <svg
                    className="h-4 w-4 shrink-0 text-[#5C574F]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="truncate text-sm text-[#2C2824]">{file.name}</span>
                  <span className="shrink-0 text-xs text-[#8A847A]">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="ml-2 shrink-0 rounded p-1 text-[#8A847A] hover:bg-[#E8E4DC] hover:text-[#2C2824] transition-colors"
                  aria-label={`Remove ${file.name}`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {(displayError || hint) && (
          <p
            id={descriptionId}
            className={cn(
              'mt-1.5 text-sm',
              displayError ? 'text-[#991B1B]' : 'text-[#5C574F]'
            )}
          >
            {displayError || hint}
          </p>
        )}
      </div>
    )
  }
)

FileInput.displayName = 'FileInput'
