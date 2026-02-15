'use client'

import { useState, useEffect, useCallback } from 'react'
import { Select, Input, Button, Badge } from '@freehold/ui'

const PROVIDERS = [
  { value: 'demo', label: 'Demo (No API Key)' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'google', label: 'Google Gemini' },
  { value: 'deepseek', label: 'DeepSeek' },
  { value: 'ollama', label: 'Ollama' },
]

const DEFAULT_MODELS: Record<string, string> = {
  demo: '',
  openai: 'gpt-4o-mini',
  anthropic: 'claude-sonnet-4-20250514',
  google: 'gemini-2.0-flash',
  deepseek: 'deepseek-chat',
  ollama: 'llama3',
}

const STORAGE_KEY = 'freehold-workshop-config'

export interface ProviderConfig {
  provider: string
  model: string
  apiKey: string
  baseURL: string
}

export interface ConfigPanelProps {
  onConfigChange: (config: ProviderConfig) => void
  isConfigured: boolean
}

export function ConfigPanel({ onConfigChange, isConfigured }: ConfigPanelProps) {
  const [provider, setProvider] = useState('demo')
  const [model, setModel] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [baseURL, setBaseURL] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Load persisted config on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.provider) setProvider(parsed.provider)
        if (parsed.model) setModel(parsed.model)
        if (parsed.baseURL) setBaseURL(parsed.baseURL)
        if (parsed.provider === 'ollama') setShowAdvanced(true)
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  // Persist config (never the API key) whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ provider, model, baseURL })
      )
    } catch {
      // ignore storage errors
    }
  }, [provider, model, baseURL])

  // Push config changes up
  const pushConfig = useCallback(
    (p: string, m: string, k: string, u: string) => {
      onConfigChange({ provider: p, model: m, apiKey: k, baseURL: u })
    },
    [onConfigChange]
  )

  useEffect(() => {
    pushConfig(provider, model, apiKey, baseURL)
  }, [provider, model, apiKey, baseURL, pushConfig])

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvider = e.target.value
    setProvider(newProvider)
    setModel(DEFAULT_MODELS[newProvider] || '')

    if (newProvider === 'demo') {
      setApiKey('')
      setBaseURL('')
      setShowAdvanced(false)
    } else if (newProvider === 'ollama') {
      setShowAdvanced(true)
      if (!baseURL) setBaseURL('http://localhost:11434')
    } else {
      if (baseURL === 'http://localhost:11434') setBaseURL('')
    }
  }

  const isDemo = provider === 'demo'

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#2C2824]">Provider Configuration</h3>
        {isConfigured ? (
          <Badge variant="approved" size="sm">Ready</Badge>
        ) : (
          <Badge variant="pending" size="sm">Configure below</Badge>
        )}
      </div>

      <Select
        label="Provider"
        options={PROVIDERS}
        value={provider}
        onChange={handleProviderChange}
      />

      {!isDemo && (
        <>
          <Input
            label="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="e.g. gpt-4o-mini"
          />

          <Input
            label="API Key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={provider === 'ollama' ? 'Not required for Ollama' : 'Enter your API key'}
            hint="Sent over HTTPS, never stored"
          />

          {provider !== 'ollama' && (
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-[#B8A48E] hover:text-[#A08A6E] transition-colors"
            >
              {showAdvanced ? 'Hide advanced' : 'Show advanced'}
            </button>
          )}

          {(showAdvanced || provider === 'ollama') && (
            <Input
              label="Base URL"
              value={baseURL}
              onChange={(e) => setBaseURL(e.target.value)}
              placeholder={provider === 'ollama' ? 'http://localhost:11434' : 'Custom endpoint (optional)'}
            />
          )}
        </>
      )}

      {isDemo && (
        <p className="text-xs text-[#8A847A] leading-relaxed">
          Try the chat with preprogrammed responses and real tool calls — no API key needed.
        </p>
      )}
    </div>
  )
}
