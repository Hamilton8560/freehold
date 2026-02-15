'use client'

import { useState, useEffect, useRef } from 'react'
import defaultFrontImage from './assets/JackOfSpades.webp'
import defaultBackImage from './assets/BackCard.webp'

export interface CardFlipLoaderProps {
  frontImage?: string
  backImage?: string
  frontAlt?: string
  backAlt?: string
  height?: string
  maxDuration?: number
  onComplete?: () => void
}

type Phase = 'back' | 'front' | 'fading'

export function CardFlipLoader({
  frontImage = defaultFrontImage,
  backImage = defaultBackImage,
  frontAlt = 'Front',
  backAlt = 'Back',
  height = '70vh',
  maxDuration = 1500,
  onComplete,
}: CardFlipLoaderProps) {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<Phase>('back')
  const [ready, setReady] = useState(false)
  const loadedCount = useRef(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  function onImageLoad() {
    loadedCount.current += 1
    if (loadedCount.current >= 2) {
      setReady(true)
    }
  }

  // Hard cap: entire loading screen gone within maxDuration no matter what
  useEffect(() => {
    const cap = setTimeout(() => setVisible(false), maxDuration)
    return () => clearTimeout(cap)
  }, [maxDuration])

  // Fallback: if images don't fire onLoad within 500ms, proceed anyway
  useEffect(() => {
    const fallback = setTimeout(() => setReady(true), 500)
    return () => clearTimeout(fallback)
  }, [])

  // Once ready: brief flash of back (100ms) then flip
  useEffect(() => {
    if (!ready) return
    const flipTimer = setTimeout(() => setPhase('front'), 100)
    return () => clearTimeout(flipTimer)
  }, [ready])

  // Wait for flip transition (400ms) + brief dwell (350ms) then start fade
  useEffect(() => {
    if (phase !== 'front') return
    const dwellTimer = setTimeout(() => setPhase('fading'), 750)
    return () => clearTimeout(dwellTimer)
  }, [phase])

  // Fade out over 300ms then unmount
  useEffect(() => {
    if (phase !== 'fading') return
    const removeTimer = setTimeout(() => setVisible(false), 300)
    return () => clearTimeout(removeTimer)
  }, [phase])

  // Call onComplete when overlay unmounts
  useEffect(() => {
    if (!visible) {
      onCompleteRef.current?.()
    }
  }, [visible])

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes fh-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fh-pulse-gentle {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.03); }
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.3s',
          opacity: phase === 'fading' ? 0 : 1,
          pointerEvents: phase === 'fading' ? 'none' : 'auto',
        }}
      >
        {/* Skeleton shimmer background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, #EFECE6 25%, #F5F3EF 50%, #EFECE6 75%)',
            backgroundSize: '200% 100%',
            animation: 'fh-shimmer 2s ease-in-out infinite',
          }}
        />

        {/* Perspective wrapper */}
        <div style={{ position: 'relative', zIndex: 10, perspective: '1200px' }}>
          {/* Pulse wrapper */}
          <div style={{ animation: 'fh-pulse-gentle 2s ease-in-out infinite' }}>
            {/* Flip container */}
            <div
              style={{
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.4s ease-in-out',
                transform: phase === 'back' ? 'rotateY(0deg)' : 'rotateY(180deg)',
                height,
                aspectRatio: '2.5 / 3.5',
              }}
            >
              {/* Back face */}
              <img
                src={backImage}
                alt={backAlt}
                style={{
                  position: 'absolute',
                  inset: 0,
                  height: '100%',
                  width: '100%',
                  objectFit: 'contain',
                  backfaceVisibility: 'hidden',
                }}
                onLoad={onImageLoad}
              />
              {/* Front face */}
              <img
                src={frontImage}
                alt={frontAlt}
                style={{
                  position: 'absolute',
                  inset: 0,
                  height: '100%',
                  width: '100%',
                  objectFit: 'contain',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
                onLoad={onImageLoad}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

CardFlipLoader.displayName = 'CardFlipLoader'
