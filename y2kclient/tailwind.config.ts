import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors:{
      pink: {
        '50': '#fef1f8',
        '100': '#fee5f2',
        '200': '#ffcbe8',
        '300': '#ffa1d3',
        '400': '#ff69b4',
        '500': '#fa3a95',
        '600': '#ea1870',
        '700': '#cc0a57',
        '800': '#a80c47',
        '900': '#8c0f3e',
        '950': '#560121',
    },
      gray: {
        '50': '#f5f7f9',
        '100': '#e8edf1',
        '200': '#dbe2e9',
        '300': '#bbc8d5',
        '400': '#9aadc0',
        '500': '#8196b0',
        '600': '#6f82a1',
        '700': '#637292',
        '800': '#545f79',
        '900': '#474f61',
        '950': '#2e323d',
    },
    Lightblue: {
      '50': '#effcfc',
      '100': '#d3f5f5',
      '200': '#b4eced',
      '300': '#80dde0',
      '400': '#45c4cb',
      '500': '#29a9b1',
      '600': '#258995',
      '700': '#246e7a',
      '800': '#255a65',
      '900': '#234c56',
      '950': '#12323a',
  },
  orange: {
    '50': '#fffcea',
    '100': '#fff5c5',
    '200': '#ffeb85',
    '300': '#ffda46',
    '400': '#ffc71b',
    '500': '#ffa500',
    '600': '#e27c00',
    '700': '#bb5502',
    '800': '#984208',
    '900': '#7c360b',
    '950': '#481a00',
},
    
    },
    extend: {
      
      fontFamily: {
        titilium: ["Titilium", "sans-serif"],
        tiltneon: ["Tiltneon", "sans-serif"]

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
   
    },
  },
  plugins: [
  ],
};
export default config;
