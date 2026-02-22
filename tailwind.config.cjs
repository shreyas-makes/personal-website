/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./src/layouts/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./src/components/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Elstob', 'Verdana', 'Geneva', 'sans-serif'],
        body: ['Elstob', 'Verdana', 'Geneva', 'sans-serif'],
        heading: ['Elstob', 'Verdana', 'Geneva', 'sans-serif'],
      },
      fontSize: {
        'title': '32px',
        'body': '19px',
      },
      lineHeight: {
        'title': 'normal',
        'body': '29px',
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          main: "rgb(var(--color-primary-main) / <alpha-value>)",
        },
        text: {
          body: "rgb(var(--color-text-body) / <alpha-value>)",
          bold: "rgb(var(--color-text-bold) / <alpha-value>)",
          heading: "rgb(var(--color-text-heading) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
          code: "rgb(var(--color-text-code) / <alpha-value>)",
          link: "rgb(var(--color-text-link) / <alpha-value>)",
          selection: "rgb(var(--color-text-selection) / <alpha-value>)",
        },
        bg: {
          body: "rgb(var(--color-bg-body) / <alpha-value>)",
          code: "rgb(var(--color-bg-code) / <alpha-value>)",
          selection: "rgb(var(--color-bg-selection) / <alpha-value>)",
        },
        border: {
          code: "rgb(var(--color-border-code) / <alpha-value>)",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // Disable default table styles from @tailwindcss/typography
            // These will be replaced by our custom styles in global.css
            table: false,
            thead: false,
            'thead th': false,
            'tbody tr': false,
            'tbody td': false,
            'tbody tr:last-child': false,
            'tbody tr:nth-child(odd)': false,
            'tbody tr:nth-child(even)': false
          }
        },
        newspaper: {
          css: {
            // Newspaper specific styles...
          }
        }
      })
    }
  },
  plugins: [require("@tailwindcss/typography")],
}; 
