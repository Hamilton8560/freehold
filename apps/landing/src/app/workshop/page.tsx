'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useFreeholdChat } from '@freehold/ai/client'
import { ChatContainer, Card, CardContent } from '@freehold/ui'
import { ConfigPanel, type ProviderConfig } from './components/ConfigPanel'
import { ToolDocumentation } from './components/ToolDocumentation'

const SUGGESTIONS = [
  'What features does Freehold offer?',
  'Calculate payroll for a $120k salary with 30% tax',
  'Tell me about the tech stack',
]

export default function WorkshopPage() {
  const [config, setConfig] = useState<ProviderConfig>({
    provider: 'demo',
    model: '',
    apiKey: '',
    baseURL: '',
  })

  const isConfigured =
    config.provider === 'demo' ||
    (!!config.provider &&
      !!config.model &&
      (config.provider === 'ollama' || !!config.apiKey))

  const handleConfigChange = useCallback((newConfig: ProviderConfig) => {
    setConfig(newConfig)
  }, [])

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setInput,
  } = useFreeholdChat({
    api: '/api/workshop/chat',
    body: {
      providerConfig: {
        provider: config.provider,
        model: config.model,
        apiKey: config.apiKey,
        ...(config.baseURL && { baseURL: config.baseURL }),
      },
    },
  })

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <header className="border-b border-[rgba(184,164,142,0.15)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-heading text-xl text-[#2C2824]">
              Freehold
            </Link>
            <span className="text-[#8A847A]">/</span>
            <span className="text-sm font-medium text-[#B8A48E]">Workshop</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-[#5C574F] hover:text-[#2C2824] transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Title */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl text-[#2C2824]">AI Workshop</h1>
          <p className="mt-2 text-sm text-[#5C574F] max-w-xl">
            Connect your own AI provider and test the chat system live. See how tool calling works with different models and providers.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 mb-12">
          {/* Left column */}
          <div className="space-y-4">
            <Card variant="default" padding="lg">
              <CardContent>
                <ConfigPanel
                  onConfigChange={handleConfigChange}
                  isConfigured={isConfigured}
                />
              </CardContent>
            </Card>

            <Card variant="default" padding="lg">
              <CardContent>
                <div className="flex gap-3">
                  <svg className="h-4 w-4 mt-0.5 shrink-0 text-[#B8A48E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-[#2C2824] mb-1">Your keys stay private</p>
                    <p className="text-xs text-[#5C574F] leading-relaxed">
                      API keys are sent directly to the provider over HTTPS and are never stored on our servers. They exist only in memory for the duration of your request.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column — Chat */}
          <div className="relative">
            {!isConfigured && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[14px] bg-[#FAF9F6]/80 backdrop-blur-sm border border-[rgba(184,164,142,0.15)]">
                <div className="text-center px-6">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F3EF]">
                    <svg className="h-6 w-6 text-[#B8A48E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-[#2C2824]">Configure your provider to start chatting</p>
                  <p className="mt-1 text-xs text-[#8A847A]">Select a provider and enter your API key in the panel {'\u2190'}</p>
                </div>
              </div>
            )}

            <ChatContainer
              messages={messages}
              input={input}
              onInputChange={(value) =>
                handleInputChange({ target: { value } })
              }
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error?.message}
              title="Workshop Chat"
              subtitle={config.provider === 'demo' ? 'Demo Mode' : isConfigured ? `${config.provider} / ${config.model}` : 'Not configured'}
              assistant={{ name: 'Freehold AI' }}
              emptyStateMessage="Ask me anything about Freehold!"
              suggestions={SUGGESTIONS}
              onSuggestionClick={(suggestion) => {
                setInput(suggestion)
              }}
              maxHeight="calc(100vh - 320px)"
            />
          </div>
        </div>

        {/* Full-width tool documentation */}
        <ToolDocumentation />
      </main>
    </div>
  )
}
