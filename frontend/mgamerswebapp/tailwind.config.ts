import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";
import typeography from "@tailwindcss/typography"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3'
      },
    },
  },
  darkMode: "class",
  plugins: [heroui(
    {
      themes: {
        "mgamers-dark": {
          extend: "dark", // Inherit default dark values
          colors: {
            background: "#111827", // Dark muted black/blue
            foreground: "#F5FFFA", // Silver-like text for contrast
            primary: {
              50: "#18202f",
              100: "#1b2331",
              200: "#1F2937",
              300: "#007b85",
              400: "#293241",
              500: "#374151",
              DEFAULT: "#1F2937",
              foreground: "#ffffff",
            },
            secondary: {
              100: "#634a8b",
              200: "#9c3883",
              300: "#c91860",
              400: "#9f7071",
              DEFAULT: "#c91860",
              foreground: "#ffffff",
            },
            focus: "#fba163",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }
  ),
    typeography
  ],
};
export default config;


