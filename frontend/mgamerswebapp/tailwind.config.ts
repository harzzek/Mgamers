import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/preline/dist/*.js'
  ],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3'
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
};
export default config;
