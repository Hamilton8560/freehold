import type { Preview } from '@storybook/react'
import './storybook.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'freehold',
      values: [
        { name: 'freehold', value: '#FAF9F6' },
        { name: 'warm', value: '#F5F3EF' },
        { name: 'white', value: '#FFFFFF' },
        { name: 'dark', value: '#2C2824' },
      ],
    },
  },
}

export default preview
