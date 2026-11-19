import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { ink: '#070b14', cyan: '#38bdf8' }, fontFamily: { sans: ['var(--font-inter)', 'Arial', 'sans-serif'] } } },
  plugins: []
};
export default config;
