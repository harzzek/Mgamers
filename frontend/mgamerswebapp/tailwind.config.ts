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
        "purple-dark": {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#0D001A",
            foreground: "#ffffff",
            primary: {
              50: "#3B096C",
              100: "#520F83",
              200: "#7318A2",
              300: "#9823C2",
              400: "#c031e2",
              500: "#DD62ED",
              600: "#F182F6",
              700: "#FCADF9",
              800: "#FDD5F9",
              900: "#FEECFE",
              DEFAULT: "#DD62ED",
              foreground: "#ffffff",
            },
            focus: "#F182F6",
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

        "mgamers-dark": {
          extend: "dark", // Inherit default dark values
          colors: {
            background: "#1e2b30", // Dark muted black/blue
            foreground: "#f4fbfb", // Silver-like text for contrast
            primary: {
              50: "#35180d",
              100: "#5c1f0f",
              200: "#94280f",
              300: "#c43211",
              400: "#fe3514", // Mgamers red
              500: "#ff5a36",
              600: "#ff835e",
              700: "#ffa98a",
              800: "#ffcabb",
              900: "#ffede3",
              DEFAULT: "#fe3514", // Main primary color
              foreground: "#ffffff",
            },
            secondary: {
              50: "#33200d",
              100: "#5b3411",
              200: "#27c72a",
              300: "#c76d27",
              400: "#fba163", // Mgamers orange
              500: "#ffb57e",
              600: "#ffc795",
              700: "#ffd8ae",
              800: "#ffe5c7",
              900: "#fff3e2",
              DEFAULT: "#fba163",
              foreground: "#1e2b30",
            },
            focus: "#fba163", // Orange glow effect
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


