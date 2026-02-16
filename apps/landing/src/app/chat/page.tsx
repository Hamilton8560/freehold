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
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6 py-4">
          <Link href="/" className="font-heading text-xl text-[#2C2824]">
            Freehold
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-[#5C574F] hover:text-[#2C2824]"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Chat */}
      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl text-[#2C2824]">Talk to Freehold</h1>
          <p className="mt-2 text-sm text-[#5C574F]">
            Ask about our platform, see what we can build for your business, or book a discovery call.
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
          title="Freehold AI"
          subtitle="Sales & info assistant"
          assistant={{ name: 'Freehold AI' }}
          emptyStateMessage="Hi! I'm the Freehold AI assistant. Ask me about our platform, pricing, or how we can help your business."
          suggestions={[
            'What does Freehold do?',
            'What industries do you serve?',
            'How does pricing work?',
            "I'd like to schedule a demo",
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
