import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CardFlipLoader } from './CardFlipLoader'
import { Button } from '../../primitives/Button'

const meta: Meta<typeof CardFlipLoader> = {
  title: 'Composites/CardFlipLoader',
  component: CardFlipLoader,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CardFlipLoader>

export const Default: Story = {
  render: () => {
    const [playing, setPlaying] = useState(false)
    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setPlaying(true)} disabled={playing}>
          {playing ? 'Playing...' : 'Play Animation'}
        </Button>
        {playing && (
          <CardFlipLoader
            frontAlt="Jack of Spades"
            backAlt="Card back"
            onComplete={() => setPlaying(false)}
          />
        )}
      </div>
    )
  },
}
