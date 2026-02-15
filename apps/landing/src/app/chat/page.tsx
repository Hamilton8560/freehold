'use client'

import { useFreeholdChat } from '@freehold/ai/client'
import { ChatContainer } from '@freehold/ui'
import Link from 'next/link'

export default function ChatPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setInput,
  } = useFreeholdChat({ api: '/api/chat' })

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <header className="border-b border-[rgba(184,164,142,0.15)] bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-heading text-xl text-[#2C2824]">
            Freehold
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/design-system"
              className="text-sm text-[#5C574F] hover:text-[#2C2824]"
            >
              Design System
            </Link>
            <span className="text-sm font-medium text-[#B8A48E]">Chat Demo</span>
          </nav>
        </div>
      </header>

      {/* Chat */}
      <main className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl text-[#2C2824]">AI Chat Demo</h1>
          <p className="mt-2 text-sm text-[#5C574F]">
            Try the Freehold chat components powered by the Vercel AI SDK.
          </p>
        </div>

        <ChatContainer
          messages={messages}
          input={input}
          onInputChange={(value) =>
            handleInputChange({ target: { value } })
          }
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error?.message}
          title="Freehold Assistant"
          subtitle="AI-powered help"
          assistant={{ name: 'Freehold AI' }}
          emptyStateMessage="Ask me anything about Freehold!"
          suggestions={[
            'What is Freehold?',
            'Calculate payroll for $85k salary',
            'What features do you offer?',
          ]}
          onSuggestionClick={(suggestion) => {
            setInput(suggestion)
          }}
          maxHeight="calc(100vh - 280px)"
        />
      </main>
    </div>
  )
}
