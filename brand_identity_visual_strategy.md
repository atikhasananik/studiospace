# StudioSpace — Brand Identity & Visual Strategy (Shadcn UI Edition)

This specification defines the design architecture, UI standards, and component patterns for **StudioSpace**, tailored specifically for implementation with **Shadcn UI**, **Tailwind CSS**, and **Lucide React**.

---

## 1. Brand Concept & Aesthetic Directive

* **Brand Name:** StudioSpace
* **Target Audience:** Creators, filmmakers, photographers, podcasters, sound engineers, and musicians.
* **Visual Aesthetic:** "Dark Kinetic / Industrial Modern Luxury" — clean, high-contrast, structural grid system with dynamic light/dark mode support.
* **UI Foundation:** Built on top of **Shadcn UI** primitives (Radix UI + Tailwind CSS).

---

## 2. Shadcn UI `globals.css` Theme Tokens

Configure your `app/globals.css` (or `styles/globals.css`) with these CSS custom properties to drive Shadcn UI components in both Dark Mode (default base) and Light Mode.

```css
@layer base {
  :root {
    /* DARK MODE (Default Primary Base) */
    --background: 228 26% 4%;        /* #090A0F Void Obsidian */
    --foreground: 0 0% 100%;         /* #FFFFFF Pure White */

    --card: 225 25% 10%;             /* #131620 Elevated Dark Slate */
    --card-foreground: 0 0% 100%;

    --popover: 225 25% 10%;
    --popover-foreground: 0 0% 100%;

    --primary: 18 100% 50%;          /* #FF4D00 Electric Amber */
    --primary-foreground: 0 0% 100%;

    --secondary: 224 22% 16%;        /* #1B202E Dark Surface Muted */
    --secondary-foreground: 215 20% 65%;

    --muted: 224 22% 16%;
    --muted-foreground: 215 20% 65%; /* #94A3B8 Slate 400 */

    --accent: 182 100% 50%;          /* #00F2FE Neon Pulse Cyan */
    --accent-foreground: 228 26% 4%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 223 22% 18%;           /* #232838 Border Subtle */
    --input: 223 22% 18%;
    --ring: 18 100% 50%;             /* Electric Amber Focus Ring */

    --radius: 0.75rem;               /* rounded-xl standard */
  }

  .light,
  [data-theme="light"] {
    /* LIGHT MODE */
    --background: 210 40% 98%;       /* #F8FAFC Studio Light Base */
    --foreground: 222 47% 11%;       /* #0F172A Slate 900 */

    --card: 0 0% 100%;               /* Pure White */
    --card-foreground: 222 47% 11%;

    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;

    --primary: 18 100% 50%;          /* #FF4D00 Electric Amber */
    --primary-foreground: 0 0% 100%;

    --secondary: 210 40% 96%;        /* Slate 100 */
    --secondary-foreground: 215 25% 27%;

    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%; /* Slate 600 */

    --accent: 199 89% 48%;           /* #0284C7 Deep Pulse Blue */
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 214 32% 91%;           /* Slate 200 */
    --input: 214 32% 91%;
    --ring: 18 100% 50%;
  }
}
```

---

## 3. Typography & Heading Hierarchy

* **Headings (H1 - H3):** `Syne`, `Plus Jakarta Sans`, or `sans-serif` (Bold, tracking-tight).
* **Body & UI Components:** `Inter`, `Geist`, or `system-ui` (Clean, balanced readability).

### Class Mapping Standards
1. **Primary Page Title (H1):** `text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4`
2. **Section Header (H2):** `text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3`
3. **Card / Item Header (H3):** `text-xl font-bold tracking-tight text-foreground mb-1`
4. **Subtitles & Paragraphs:** `text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8`

---

## 4. Shadcn UI Component Patterns & Rules

### Rule 1: Standardized Button Variants (`@/components/ui/button`)

Always map actions to Shadcn UI's `<Button />` component:

* **Primary CTA Button:**
  ```tsx
  import { Button } from "@/components/ui/button"

  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-xl shadow-lg shadow-orange-500/10 active:scale-95 transition-all">
    Reserve Studio
  </Button>
  ```

* **Secondary / Outline Button:**
  ```tsx
  <Button variant="outline" class="border-border hover:bg-secondary text-foreground font-medium px-6 py-3 rounded-xl transition-all">
    View Details
  </Button>
  ```

---

### Rule 2: Studio Listing Card using Shadcn `<Card />`

All StudioSpace cards must utilize Shadcn's `<Card />` primitives, maintaining strict equal height and an **16:10 aspect ratio** image container.

```tsx
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin } from "lucide-react"

export function StudioCard({ title, category, price, location, rating, image }) {
  return (
    <Card className="h-full flex flex-col justify-between overflow-hidden border-border bg-card text-card-foreground hover:border-ring/50 transition-all duration-300 group">
      
      {/* 16:10 Media Aspect Ratio Box */}
      <div className="aspect-[16/10] w-full overflow-hidden relative bg-muted">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur-md text-accent border border-accent/30 font-semibold text-xs">
          ● Live Available
        </Badge>
      </div>

      {/* Card Content Stack */}
      <CardHeader className="p-6 pb-2">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          {category}
        </span>
        <h3 className="text-xl font-bold tracking-tight text-foreground mt-1 mb-1">
          {title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-primary" /> {location}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {rating}
          </span>
        </div>
      </CardHeader>

      {/* Card Footer Actions */}
      <CardFooter className="p-6 pt-4 border-t border-border flex items-center justify-between">
        <div>
          <span class="text-xs text-muted-foreground block">Hourly Rate</span>
          <span class="text-lg font-bold text-primary">${price} <span class="text-sm font-normal text-muted-foreground">/ hr</span></span>
        </div>
        <Button variant="outline" size="sm" className="rounded-xl border-border hover:bg-secondary">
          Book Space
        </Button>
      </CardFooter>
    </Card>
  )
}
```

---

### Rule 3: Rebranded X (Twitter) Social Icon Integration

Use the official **X SVG** directly in Shadcn Footer or Header components alongside Lucide React icons:

```tsx
export function XSocialIcon() {
  return (
    <a 
      href="https://x.com" 
      target="_blank" 
      rel="noreferrer" 
      aria-label="X (Twitter)"
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </a>
  )
}
```

---

## 5. Responsive Layout Architecture

* **Mobile (`< 768px`):** `grid grid-cols-1 gap-6`. Uses Shadcn `<Sheet />` for mobile navigation drawers.
* **Tablet (`768px - 1023px`):** `grid grid-cols-2 gap-6`.
* **Desktop (`≥ 1024px`):** `grid grid-cols-3 gap-8`.

---

## 6. AI Agent Directive

When generating UI code or new pages for StudioSpace, instruct your AI model with:

> "Build components using **Shadcn UI** primitives and Tailwind CSS based on `brand_identity_and_visual_strategy.md`. Use semantic Shadcn CSS variables (`bg-background`, `bg-card`, `text-foreground`, `text-primary`), standard `<Button />` variants, `16:10` image containers, and Lucide React icons."