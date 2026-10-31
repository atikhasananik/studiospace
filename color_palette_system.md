# StudioSpace — Dual-Mode Color Palette & Theme Specification (Shadcn UI Hex Edition)

This specification defines the complete dual-mode color architecture for **StudioSpace**, configured with exact **Hex `#codes`** for direct usage in CSS, Tailwind, or inline styling alongside **Shadcn UI** theme variables.

All UI components, front-end developers, and AI code agents MUST consume these exact color tokens to guarantee complete visual consistency across **Dark Mode** (Dark Kinetic / Industrial Luxury) and **Light Mode** (Modern Studio White).

---

## 1. Primary Hex `#code` Reference Table

| Role / Element | Dark Mode Hex `#code` | Light Mode Hex `#code` | Description |
| :--- | :--- | :--- | :--- |
| **Background (Void Base)** | `#090A0F` | `#F8FAFC` | Main canvas background |
| **Foreground (Primary Text)** | `#FFFFFF` | `#0F172A` | Highest contrast text color |
| **Card / Surface** | `#131620` | `#FFFFFF` | Elevated container & card backgrounds |
| **Card Border** | `#232838` | `#E2E8F0` | Subtle division strokes |
| **Primary Accent (CTA)** | `#FF4D00` | `#FF4D00` | Tally Amber signal for main actions |
| **Primary Hover** | `#E04400` | `#E04400` | Interactive hover state for primary buttons |
| **Muted Text** | `#94A3B8` | `#64748B` | Secondary details, captions, tags |
| **Secondary Surface** | `#1B202E` | `#F1F5F9` | Hover states & chip backgrounds |
| **Live Accent (Pulse)** | `#00F2FE` | `#0284C7` | Real-time availability badges & highlights |

---

## 2. HSL & Hex Combined CSS Properties (`app/globals.css`)

Copy and paste these exact CSS properties into your `globals.css` file. They map Hex `#code` definitions directly to Shadcn UI's internal component logic using standard HSL channels.

```css
@layer base {
  /* ==========================================================================
     DARK MODE (Default Base)
     Hex Reference: Background (#090A0F) | Primary (#FF4D00) | Card (#131620)
     ========================================================================== */
  :root {
    /* Base Void & Surface Colors */
    --background: 228 26% 4%;          /* #090A0F Void Obsidian */
    --foreground: 0 0% 100%;           /* #FFFFFF Pure White */

    --card: 225 25% 10%;               /* #131620 Elevated Dark Slate */
    --card-foreground: 0 0% 100%;       /* #FFFFFF */

    --popover: 225 25% 10%;            /* #131620 */
    --popover-foreground: 0 0% 100%;

    /* Brand Primary Accent (#FF4D00 - Electric Amber) */
    --primary: 18 100% 50%;            /* #FF4D00 Electric Amber */
    --primary-foreground: 0 0% 100%;   /* #FFFFFF */

    /* Secondary & Muted Surfaces */
    --secondary: 224 22% 16%;          /* #1B202E Dark Surface Hover */
    --secondary-foreground: 215 20% 65%;/* #94A3B8 */

    --muted: 224 22% 16%;              /* #1B202E */
    --muted-foreground: 215 20% 65%;   /* #94A3B8 Slate 400 */

    /* Live Indicators & Accent Highlights (#00F2FE - Neon Cyan) */
    --accent: 182 100% 50%;            /* #00F2FE Neon Pulse Cyan */
    --accent-foreground: 228 26% 4%;    /* #090A0F */

    --destructive: 0 84% 60%;          /* #EF4444 */
    --destructive-foreground: 0 0% 100%;

    /* Borders & Focus Rings */
    --border: 223 22% 18%;             /* #232838 Subtle Dark Border */
    --input: 223 22% 18%;              /* #232838 */
    --ring: 18 100% 50%;               /* #FF4D00 Electric Amber Focus Ring */

    --radius: 0.75rem;                 /* 12px rounded-xl standard */
  }

  /* ==========================================================================
     LIGHT MODE (Toggled via [data-theme="light"] or .light class)
     Hex Reference: Background (#F8FAFC) | Primary (#FF4D00) | Card (#FFFFFF)
     ========================================================================== */
  .light,
  [data-theme="light"] {
    --background: 210 40% 98%;         /* #F8FAFC Crisp Studio White */
    --foreground: 222 47% 11%;         /* #0F172A Slate 900 Dark Charcoal */

    --card: 0 0% 100%;                 /* #FFFFFF Pure White */
    --card-foreground: 222 47% 11%;     /* #0F172A */

    --popover: 0 0% 100%;              /* #FFFFFF */
    --popover-foreground: 222 47% 11%;

    /* Brand Primary Accent (#FF4D00) */
    --primary: 18 100% 50%;            /* #FF4D00 Electric Amber */
    --primary-foreground: 0 0% 100%;   /* #FFFFFF */

    --secondary: 210 40% 96%;          /* #F1F5F9 Slate 100 */
    --secondary-foreground: 215 25% 27%;/* #334155 */

    --muted: 210 40% 96%;              /* #F1F5F9 */
    --muted-foreground: 215 16% 47%;   /* #64748B Slate 600 */

    --accent: 199 89% 48%;             /* #0284C7 Deep Pulse Blue */
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;          /* #EF4444 */
    --destructive-foreground: 0 0% 100%;

    --border: 214 32% 91%;             /* #E2E8F0 Slate 200 */
    --input: 214 32% 91%;              /* #E2E8F0 */
    --ring: 18 100% 50%;               /* #FF4D00 Focus Ring */
  }
}
```

---

## 3. Tailwind CSS Hex `#code` Color Extension (`tailwind.config.js`)

If you prefer to configure your Tailwind theme directly with explicit Hex `#codes` alongside Shadcn UI semantic tokens, update your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Direct Brand Hex Color Mapping
        brand: {
          void: "#090A0F",       // Dark Void Background
          surface: "#131620",    // Dark Card Surface
          border: "#232838",     // Dark Divider Stroke
          amber: "#FF4D00",      // Primary Tally Light Accent
          amberHover: "#E04400", // Primary Button Hover State
          cyan: "#00F2FE",       // Live Status Pulse Badge
          slateText: "#94A3B8",  // Secondary Paragraph Text
        },
        // Shadcn UI Semantic Mapping
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))", // #FF4D00
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // #00F2FE in Dark, #0284C7 in Light
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",   // #131620 in Dark, #FFFFFF in Light
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

## 4. Component Implementation with Explicit Hex Codes

### Rule 1: Adaptive Studio Card with Hex `#code` Fallbacks

```tsx
import { Card, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function StudioCard({ title, category, price, image }) {
  return (
    // Uses Shadcn variables with explicit fallback hex comments: bg-card (#131620), border-border (#232838)
    <Card className="h-full flex flex-col justify-between overflow-hidden border-border bg-card text-card-foreground hover:border-[#FF4D00]/50 transition-all duration-300 group">
      
      {/* Aspect Ratio Box (16:10) */}
      <div className="aspect-[16/10] w-full overflow-hidden relative bg-[#1B202E]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        {/* Live Badge Accent (#00F2FE) */}
        <Badge className="absolute top-3 right-3 bg-[#090A0F]/80 backdrop-blur-md text-[#00F2FE] border border-[#00F2FE]/30 font-semibold text-xs">
          ● Live Available
        </Badge>
      </div>

      {/* Main Content Area */}
      <CardHeader className="p-6 pb-2">
        {/* Category Tag (#FF4D00) */}
        <span className="text-xs font-semibold text-[#FF4D00] uppercase tracking-wider">
          {category}
        </span>
        <h3 className="text-xl font-bold tracking-tight text-foreground mt-1 mb-1">
          {title}
        </h3>
      </CardHeader>

      {/* Footer Area */}
      <CardFooter className="p-6 pt-4 border-t border-border flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground block">Hourly Rate</span>
          <span className="text-lg font-bold text-[#FF4D00]">${price} <span className="text-sm font-normal text-muted-foreground">/ hr</span></span>
        </div>
        <Button variant="outline" size="sm" className="rounded-xl border-border hover:bg-secondary text-foreground">
          Book Space
        </Button>
      </CardFooter>
    </Card>
  )
}
```

---

## 5. AI Prompting Instruction for Hex Code Alignment

When asking AI agents to generate components, include this instruction:

> "Construct all components using **Shadcn UI** conventions and HSL variables mapped to exact Hex `#codes`: Void Background (`#090A0F`), Elevated Card (`#131620`), Border Stroke (`#232838`), Primary Accent (`#FF4D00`), and Cyan Pulse (`#00F2FE`). Standardize all buttons and listing cards to work seamlessly across dark and light mode."