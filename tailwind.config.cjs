/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'apple-gray': {
          50: '#f5f5f7',
          100: '#e8e8ed',
          200: '#d2d2d8',
          300: '#b0b0b8',
          400: '#8e8e96',
          500: '#6e6e76',
          600: '#56565c',
          700: '#3a3a3e',
          800: '#2a2a2c',
          900: '#1d1d1f',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1d1d1f',
            a: {
              color: '#0066cc',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-fluid-type'),
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  },
}

