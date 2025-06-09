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
            foreground: "#F5FFFA",
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
              foreground: "#0D001A",
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
            background: "#1a1212", // Dark muted black/blue
            foreground: "#F5FFFA", // Silver-like text for contrast
            primary: {
              50: "#241B1A",
              100: "#3D3332",
              200: "#524949",
              300: "#695554",
              400: "#805B5A", 
              500: "#99605E",
              600: "#AF5E5C",
              700: "#DE514C",
              800: "#F54640",
              900: "#F7423C",
              DEFAULT: "#A65656",
              foreground: "#ffffff",
            },
            secondary: {
              50: "#211515",
              100: "#0A0707",
              200: "#524241",
              300: "#675C5C",
              400: "#7E6867",
              500: "#946D6B",
              600: "#AD706E",
              700: "#C36D6A",
              800: "#DB6763",
              900: "#F25D58",
              DEFAULT: "#8B5F49",
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


