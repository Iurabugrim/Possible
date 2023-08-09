import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        colors: {
            'primary': '#B8F43E',
            'gray': '#7A7A7A',
            "dark-gray": "#636363",
            "black": "#181818",
            "matt-black": "#262626",
            "white": "#CECECE",
        }
    },
  },
  plugins: [],
}
export default config
