import { defineConfig, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
  ],
  transformers: [transformerDirectives()],
  shortcuts: {
    'filter-label-base': 'text-xs font-700 text-text-muted min-w-[3em] tracking-[0.06em] bg-surface-muted px-2 py-[3px] rounded-md border-l-2 border-l-solid border-l-primary',
    'filter-btn-base': 'px-3 py-1 border-1 border-solid border-surface-muted rounded-2xl bg-surface-raised text-[0.8125rem] cursor-pointer transition-all duration-150',
  },
  rules: [
    ['image-pixelated', { 'image-rendering': 'pixelated' }],
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: 'oklch(0.55 0.22 27)',
        light: 'oklch(0.70 0.15 27)',
        dark: 'oklch(0.42 0.22 27)',
        50: 'oklch(0.97 0.02 27)',
      },
      accent: {
        DEFAULT: 'oklch(0.58 0.12 145)',
        light: 'oklch(0.75 0.08 145)',
        muted: 'oklch(0.85 0.04 145)',
      },
      terrain: {
        DEFAULT: 'oklch(0.52 0.08 60)',
        light: 'oklch(0.80 0.04 60)',
      },
      surface: {
        DEFAULT: 'oklch(0.985 0.005 27)',
        raised: 'oklch(0.975 0.008 27)',
        muted: 'oklch(0.93 0.01 27)',
      },
      text: {
        DEFAULT: 'oklch(0.22 0.02 27)',
        muted: 'oklch(0.45 0.02 27)',
        subtle: 'oklch(0.60 0.015 27)',
      },
    },
  },
})
