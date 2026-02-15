import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import './globals.css'
import LoadingScreen from './components/LoadingScreen'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Freehold - Modern Payroll Management',
  description: 'A beautiful, modern payroll management system built with the Freehold design system.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
      <body className="min-h-screen bg-background-primary font-body antialiased">
        <LoadingScreen />
        {children}
      </body>
    </html>
  )
}
