'use client'

import { CardFlipLoader } from '@freehold/ui'

export default function LoadingScreen() {
  return (
    <CardFlipLoader
      frontAlt="Jack of Spades"
      backAlt="Card back"
    />
  )
}
