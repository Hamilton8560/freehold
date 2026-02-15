export interface ChartColorPalette {
  primary: string[]
  status: {
    pending: string
    approved: string
    paid: string
    error: string
  }
  semantic: {
    success: string
    warning: string
    error: string
    info: string
  }
  grid: string
  axis: string
  tooltip: {
    background: string
    text: string
    border: string
  }
}

export function useChartColors(): ChartColorPalette {
  return {
    primary: [
      '#B8A48E', // sand-500
      '#8DB580', // success green
      '#60A5FA', // info blue
      '#D4B86A', // warning gold
      '#C4796B', // error coral
      '#A08A6E', // sand-600
      '#86715A', // sand-700
      '#6B5A48', // sand-800
    ],
    status: {
      pending: '#D4B86A',
      approved: '#8DB580',
      paid: '#60A5FA',
      error: '#C4796B',
    },
    semantic: {
      success: '#8DB580',
      warning: '#D4B86A',
      error: '#C4796B',
      info: '#60A5FA',
    },
    grid: 'rgba(184, 164, 142, 0.15)',
    axis: '#8A847A',
    tooltip: {
      background: '#FFFFFF',
      text: '#2C2824',
      border: 'rgba(184, 164, 142, 0.25)',
    },
  }
}
