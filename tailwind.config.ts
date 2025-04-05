import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        bgPrimary: "#FEFCFF",
        bgSecondary: "#FBF5FD",
        brandPrimary: "#2D0C3E",
        brandHover: "#421957",
        brandLsPrimary: "#EEDDF5",
        brandLsSecondary: "#F6EEFA",
        brandDs: "#763B90",
        greyPrimary: "#A5A5A5",
        greySecondary: "#E4E4E4",
        greyTertiary: "#DDDDDD",
        link: "#009DBF",
        linkHover: "#0089A7",
        success: "#49A700",
        successHover: "#48950B",
        warning: "#F69A57",
        dangerPrimary: "#F55050",
        dangerSecondary: "#ED3232",
        sale: "#F17B25",
        admin_Text2:"#444444",
        brownPrimary: "#ffe6d8",
        cardColor:"#F3F3F3",
        playButton:"#E01837",
        previousButton:"#E6E6E6",
        adminGray4:"#989898",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        // lg: "var(--radius)",
        // md: "calc(var(--radius) - 2px)",
        // sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 1s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
