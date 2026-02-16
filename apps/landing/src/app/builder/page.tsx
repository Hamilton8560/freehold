'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  Button,
  Badge,
  Navbar,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@freehold/ui'

// ─── Sticky scroll storytelling ─────────────────────────────────────

// ─── Story data ──────────────────────────────────────────────────────
const storyChapters = [
  {
    image: '/images/ClassicWindmill.png',
    alt: 'Windmill in sepia ink-and-wash style',
    heading: 'The Foundation',
    text: 'It started with a computer science degree and a stubborn curiosity about how systems work. Not just code — the way businesses actually run, break down, and scale. Graduate work in IT management turned that curiosity into a framework.',
  },
  {
    image: '/images/oil-jack.png',
    alt: 'Oil derrick pump in sepia ink-and-wash style',
    heading: 'Pressure-Tested',
    text: 'Oil field services taught the first lesson: systems either work under pressure or they don\'t. International logistics taught the second: scale exposes every shortcut. These weren\'t classroom problems — they were Tuesday.',
  },
  {
    image: '/images/pipetobaccoAndClock.png',
    alt: 'Pipe tobacco and pendulum clock in sepia ink-and-wash style',
    heading: 'The Turning Point',
    text: 'The realization was simple: small businesses deserve the same operational infrastructure as enterprises. Not stripped-down versions. Not "lite" editions. Real systems — CRM, billing, automation — built for businesses that move fast and can\'t afford to stop.',
  },
  {
    image: '/images/teacupwaterwheeltransparent.png',
    alt: 'Teacup beside a waterwheel in sepia ink-and-wash style',
    heading: 'Freehold',
    text: 'Freehold is what happens when you stop building software and start building systems. Turnkey operations that run while you focus on what matters. The waterwheel turns. The tea stays warm. The business keeps moving.',
  },
]

// ─── Illustration style spec (full) ─────────────────────────────────
const ILLUSTRATION_STYLE_SPEC = `Freehold "Sepia Mechanism Zen" Illustration Style Spec

1) Core idea
Create calm, timeless scenes where a human is at rest and a system is quietly running in the background. The emotional tone is zen + automation: reclaiming time because the machine keeps working.
The images should feel like a premium antique illustration that has been gently modernized: architectural restraint, soft atmosphere, high craft, never busy, never playful, never cold.

2) Color system (must stay exact)
Warm white / "paper": #FAF9F6
Light sand: #D4C8B8
Sand accent: #B8A48E
Dark text/ink (sparingly): #1A1A1A

How to apply color:
- Overall palette = sepia / sand / cream.
- Shadows are warm, not gray/blue.
- Avoid saturated greens/blues. If greenery appears, it must be desaturated, fogged, and warmed into the sand spectrum.
- Black (#1A1A1A) is used only for the deepest lines or tiny contrast points; it should not dominate.
- Hard exclusions: neon, bright primaries, cool blues, purple casts, modern "color grading."

3) Medium & rendering style
Primary medium: sepia ink + watercolor wash on warm paper.

Visual characteristics:
- Ink-and-wash illustration (not a photo, not a cartoon).
- Fine linework with gentle crosshatching or stipple (light).
- Soft watercolor wash fills forms without sharp edges.
- Light atmospheric haze/fog is encouraged to keep distance elements subtle.
- The entire image sits on a warm paper tone (not pure white).

Modernization / premium polish:
- Cleaner than a messy antique print.
- "Architectural minimal" composition: intentional negative space, strong subject hierarchy, no clutter.
- Feels like a high-end editorial illustration, museum print, or archival technical plate — but calming, not clinical.

4) Composition rules
Negative space: Always include generous negative space (sky, paper area, fog, blank wall). Don't fill every corner with detail.
Subject placement: The primary subject should be clear, readable, and centered or intentionally off-center. Background automation elements should be present but quiet (not competing).
Depth & atmosphere: Foreground crisp, midground softer, background faded into paper with low contrast and fog.
Lighting: Soft top-left light (consistent across the entire library). No dramatic spotlighting. Firelight/glow stays warm and subtle, never orange-saturated.

5) The "scroll cutout" edge treatment (critical)
The illustration looks like it's painted onto paper that dissolves into transparency around the edges.
- Image edges fade out in an irregular, organic vignette (parchment bleed, watercolor feathering, fog dissipating).
- Faded areas must become TRANSPARENT (alpha), not white.
- Slightly uneven, organic perimeter with soft feathering (like a brush edge).

One-line requirement: "Add a soft irregular parchment vignette around all edges that fades to fully transparent (alpha), like watercolor bleed; keep the subject fully opaque."

6) Era, objects, and automation motifs
Primary automation symbols: Windmill, Waterwheel, Oil derrick/pump, Clock/pendulum, Flywheel/belt drive.
Zen/human ritual symbols: Tea set with steam, Dip pen with paper and inkwell, Fireplace warmth, Quiet chair/porch/window light, Curling pipe smoke.
Human depiction: Faceless or back-turned, never a detailed portrait. Use silhouette, hat brim shadow, or rear view. No modern clothing or interiors.

7) What to avoid
Style: No cartooning, no hyper-realistic photo look, no glossy 3D/chrome, no busy scenes, no modern UI overlays/text/signage.
Color: No cool grays, blue shadows, cyan skies. No saturated green foliage.
Composition: No cluttered rooms, no modern furniture silhouettes, no "stock photo" framing.

8) Prompt template (copy/paste master prompt)

MASTER STYLE PREFIX:
Sepia-toned vintage ink-and-wash illustration on warm paper, warm architectural minimal style, premium antique editorial look, fine ink linework with gentle watercolor wash, soft top-left lighting, calm atmosphere, lots of intentional negative space, background elements fade with mist, muted sand/cream palette restricted to #FAF9F6 #D4C8B8 #B8A48E with minimal deep ink #1A1A1A, no text, no modern objects, not playful, not cold.

EDGE / TRANSPARENCY SUFFIX:
Add an irregular parchment/watercolor vignette around the edges that fades out softly; the fade region must be designed to become fully transparent (alpha) when background is removed, leaving a scroll-like cutout impression. Subject remains fully opaque and crisp.

NEGATIVE PROMPTS:
NO neon, NO blue/purple/green color casts, NO glossy 3D, NO chrome, NO modern furniture, NO modern clothing, NO legible faces, NO text, NO logos, NO watermark, NO busy clutter, NO harsh shadows, NO black background.

9) Example scene prompts

Tea ritual (window + waterwheel):
[MASTER STYLE PREFIX] A quiet tea ritual on a rustic wooden table by a window: antique kettle, two simple cups, soft steam rising. Outside, a wooden waterwheel turns beside a small mill, partially obscured by mist. Minimal props, calm composition, large negative space. [EDGE SUFFIX] [NEGATIVE PROMPTS]

Fireplace + pipe + pendulum clock:
[MASTER STYLE PREFIX] A faceless figure seen from behind sits in a wooden armchair near a stone fireplace, holding a pipe; soft tobacco smoke curls upward. A tall grandfather clock with a visible pendulum suggests steady motion. Warm domestic calm, restrained detail, lots of negative space. [EDGE SUFFIX] [NEGATIVE PROMPTS]

Windmill hero (desktop wide):
[MASTER STYLE PREFIX] A 19th-century windmill in a quiet landscape, blades subtly implied in motion, clean horizon line, misty trees, minimal ground detail, large open sky for negative space, calm and premium. [EDGE SUFFIX] [NEGATIVE PROMPTS]

10) Output requirements
Export: PNG (RGBA) with transparency. Keep edge fade — do not crop too tight. Generate at high res, then apply alpha fade conversion. Maintain palette; don't let generators drift into cool tones.

11) Style inheritance directive
Style to inherit: Sepia ink-and-wash on warm paper, architectural minimal composition, soft top-left light, premium antique editorial feel, muted sand/cream palette locked to #FAF9F6 #D4C8B8 #B8A48E with minimal #1A1A1A, calm atmosphere with misty depth, no modern items, no text, faceless/back-turned humans only.
Signature requirement: Apply an irregular parchment/watercolor edge vignette that fades outward and is intended to become fully transparent alpha after background removal; subject remains fully opaque.
Hard negatives: no neon/cool casts, no glossy 3D, no clutter, no legible faces, no labels/watermarks.`

// ─── Sticky Story Section ────────────────────────────────────────────
function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const scrolled = -rect.top
      const totalHeight = container.scrollHeight - window.innerHeight
      if (totalHeight <= 0) return
      const rawProgress = Math.max(0, Math.min(1, scrolled / totalHeight))
      const chapterProgress = rawProgress * storyChapters.length
      const idx = Math.min(Math.floor(chapterProgress), storyChapters.length - 1)
      setActiveIndex(idx)
      setProgress(chapterProgress - idx)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} style={{ height: `${storyChapters.length * 150}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Layer all chapters on top of each other */}
        {storyChapters.map((chapter, i) => {
          const isActive = i === activeIndex
          const isPrev = i < activeIndex
          const isNext = i > activeIndex
          const isLast = i === storyChapters.length - 1

          // Image opacity — capped at 0.45 for a faded look
          const maxImageOpacity = 0.45
          let imageOpacity = 0
          if (isActive) {
            imageOpacity = isLast ? maxImageOpacity : maxImageOpacity * (1 - Math.max(0, (progress - 0.7) / 0.3))
          } else if (isNext && i === activeIndex + 1) {
            imageOpacity = 0
          }
          if (isPrev) imageOpacity = 0

          // For the next chapter, start showing its image as current fades
          let nextImageOpacity = 0
          if (isActive && !isLast) {
            nextImageOpacity = maxImageOpacity * Math.max(0, (progress - 0.7) / 0.3)
          }

          // Text opacity: fade in 0→0.3, visible 0.3→0.7, fade out 0.7→1.0
          let textOpacity = 0
          if (isActive) {
            if (progress < 0.3) {
              textOpacity = progress / 0.3
            } else if (progress < 0.7 || isLast) {
              textOpacity = 1
            } else {
              textOpacity = 1 - (progress - 0.7) / 0.3
            }
          }

          // Overlay — light, since images are already faded
          const overlayOpacity = 0

          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: isActive ? 2 : 1, pointerEvents: isActive ? 'auto' : 'none' }}
            >
              {/* Image wrapper — full on mobile, 75% centered on desktop */}
              <div className="absolute inset-0 lg:inset-x-[12.5%] lg:inset-y-[12.5%]">
                {/* Background image */}
                <div
                  className="absolute inset-0"
                  style={{ opacity: imageOpacity }}
                >
                  <Image
                    src={chapter.image}
                    alt={chapter.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 75vw, 100vw"
                    priority={i === 0}
                  />
                </div>

                {/* Next chapter image (cross-fade) */}
                {!isLast && i === activeIndex && (
                  <div
                    className="absolute inset-0"
                    style={{ opacity: nextImageOpacity }}
                  >
                    <Image
                      src={storyChapters[i + 1].image}
                      alt={storyChapters[i + 1].alt}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 75vw, 100vw"
                    />
                  </div>
                )}
              </div>

              {/* Warm overlay */}
              <div
                className="absolute inset-0 bg-[#2C2824]"
                style={{ opacity: overlayOpacity }}
              />

              {/* Sand blob behind text */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full pointer-events-none z-[5]"
                style={{
                  background: 'radial-gradient(ellipse, rgba(250,249,246,0.85) 0%, rgba(250,249,246,0.5) 40%, transparent 70%)',
                  filter: 'blur(20px)',
                  opacity: textOpacity,
                }}
              />

              {/* Text content */}
              <div
                className="relative z-10 max-w-[560px] mx-auto px-6 text-center"
                style={{ opacity: textOpacity }}
              >
                <span className="inline-block font-heading text-6xl sm:text-7xl text-sand-500/40 mb-4 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#2C2824] leading-tight tracking-tight mb-6">
                  {chapter.heading}
                </h2>
                <p className="text-base sm:text-lg text-[#5C574F] leading-relaxed">
                  {chapter.text}
                </p>

                {isLast && (
                  <div className="mt-12">
                    <DialogTrigger asChild>
                      <button className="group inline-flex items-center gap-2 text-sm text-[#8A847A] hover:text-[#2C2824] transition-colors duration-300 cursor-pointer">
                        <span className="border-b border-[#8A847A]/30 group-hover:border-[#2C2824]/50 pb-0.5 transition-colors duration-300">
                          How these illustrations are made
                        </span>
                        <svg
                          className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </DialogTrigger>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Illustration Spec Dialog ────────────────────────────────────────
function IllustrationSpecDialog() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ILLUSTRATION_STYLE_SPEC)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <DialogContent size="full" className="p-0 overflow-hidden">
      <DialogHeader className="p-4 sm:p-6 pb-0 sm:pb-0">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="accent" size="sm">For Image Creators</Badge>
        </div>
        <DialogTitle className="font-heading text-2xl">
          Sepia Mechanism Zen
        </DialogTitle>
        <DialogDescription>
          The complete illustration style spec behind Freehold&apos;s visual identity.
          Copy it into ChatGPT, Midjourney, DALL-E, or any AI image tool.
        </DialogDescription>
      </DialogHeader>

      <DialogBody className="p-4 sm:p-6">
        <div className="rounded-xl overflow-hidden border border-[rgba(184,164,142,0.15)]">
          {/* Terminal header */}
          <div className="bg-[#2C2824] p-3 sm:p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#4A4540]" />
                ))}
              </div>
              <span className="text-xs text-[#8A847A] font-mono hidden sm:inline">
                sepia-mechanism-zen.md
              </span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="bg-[#3D3832] border-[#4A4540] text-[#FAF9F6] hover:bg-[#4A4540]"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy All
                </>
              )}
            </Button>
          </div>

          {/* Spec content */}
          <pre className="p-3 sm:p-5 text-[11px] sm:text-xs font-mono text-[#D4C8B8] bg-[#1A1816] overflow-x-auto max-h-[60vh] overflow-y-auto leading-relaxed whitespace-pre-wrap break-words sm:whitespace-pre sm:break-normal">
            {ILLUSTRATION_STYLE_SPEC}
          </pre>
        </div>
      </DialogBody>

      <DialogFooter className="p-4 sm:p-6 pt-0 sm:pt-0 flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-text-tertiary">Works with:</span>
          {['ChatGPT', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'Ideogram'].map((tool) => (
            <span
              key={tool}
              className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-background-secondary rounded-full border border-[rgba(184,164,142,0.2)]"
            >
              {tool}
            </span>
          ))}
        </div>
      </DialogFooter>
    </DialogContent>
  )
}

// ─── Shared nav items ────────────────────────────────────────────────
const navItems = [
  { label: 'Platform', href: '/#platform' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'About', href: '/#about' },
  { label: 'The Builder', href: '/builder' },
  { label: 'Design System', href: '/design-system' },
  { label: 'Docs', href: '/docs' },
  { label: 'Talk to Us', href: '/chat' },
  { label: 'Workshop', href: '/workshop' },
]

// ─── Main Page ───────────────────────────────────────────────────────
export default function BuilderPage() {
  return (
    <Dialog>
      <main className="min-h-screen bg-[#FAF9F6]">
        <Navbar
          items={navItems}
          cta={{ label: 'View Components', href: '/showcase' }}
        />

        {/* Hero intro */}
        <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 bg-[#FAF9F6] text-center">
          <div className="max-w-[640px] mx-auto">
            <Badge variant="accent" size="lg" className="mb-6">
              The Builder
            </Badge>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-[1.08] tracking-tight mb-6">
              Every system has
              <br />
              a <span className="text-sand-500 italic">story.</span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-[460px] mx-auto">
              The journey from building for others to building for yourself.
              Scroll to read.
            </p>
            <div className="mt-10 flex justify-center">
              <svg className="w-5 h-5 text-sand-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Story chapters — sticky scroll */}
        <StorySection />

        {/* Closing */}
        <section className="px-4 sm:px-6 py-20 sm:py-32 bg-[#FAF9F6] text-center">
          <div className="max-w-[560px] mx-auto">
            <p className="text-xs text-sand-500 uppercase tracking-[0.1em] mb-4">
              What comes next
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-primary leading-tight tracking-tight mb-6">
              Let&apos;s build yours.
            </h2>
            <p className="text-base text-text-secondary leading-relaxed mb-10">
              Every system in this portfolio started as a conversation.
              Yours can too.
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://calendly.com/davidhamilton473/el-salvador-consultation" target="_blank" rel="noopener noreferrer">
                    <Button size="lg">
                      Book a Discovery Call
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>Opens Calendly</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 sm:px-6 py-12 border-t border-[rgba(184,164,142,0.1)] bg-[#FAF9F6]">
          <div className="max-w-[1080px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[7px] bg-gradient-to-br from-sand-500 to-sand-300 flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M2 14V6L8 2L14 6V14H10V9H6V14H2Z" fill="#FAF9F6" />
                </svg>
              </div>
              <span className="font-heading text-base text-text-primary">
                Freehold
              </span>
            </div>
            <p className="text-sm text-text-tertiary">
              Enterprise systems for businesses that move. &copy; 2026
            </p>
          </div>
        </footer>

        {/* Illustration spec dialog (rendered inside Dialog context) */}
        <IllustrationSpecDialog />
      </main>
    </Dialog>
  )
}
