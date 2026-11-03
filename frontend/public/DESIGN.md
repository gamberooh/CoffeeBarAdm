---
name: Warm Brew & Storybook Cafe
colors:
  surface: '#fff8f0'
  surface-dim: '#e6d9ba'
  surface-bright: '#fff8f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff3d5'
  surface-container: '#faedcd'
  surface-container-high: '#f4e7c8'
  surface-container-highest: '#eee2c2'
  on-surface: '#211b08'
  on-surface-variant: '#45474a'
  inverse-surface: '#37301b'
  inverse-on-surface: '#fdf0d0'
  outline: '#76777a'
  outline-variant: '#c6c6ca'
  surface-tint: '#5f5e5f'
  primary: '#121313'
  on-primary: '#ffffff'
  primary-container: '#272728'
  on-primary-container: '#8f8e8f'
  inverse-primary: '#c8c6c7'
  secondary: '#486459'
  on-secondary: '#ffffff'
  secondary-container: '#c8e7d9'
  on-secondary-container: '#4d685e'
  tertiary: '#200e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#3c2000'
  on-tertiary-container: '#b38558'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e2e3'
  primary-fixed-dim: '#c8c6c7'
  on-primary-fixed: '#1b1b1c'
  on-primary-fixed-variant: '#474648'
  secondary-fixed: '#cbe9dc'
  secondary-fixed-dim: '#afcdc0'
  on-secondary-fixed: '#042018'
  on-secondary-fixed-variant: '#314c42'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#f0bd8b'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#623f18'
  background: '#fff8f0'
  on-background: '#211b08'
  surface-variant: '#eee2c2'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '700'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system establishes a warm, tactile, and storybook-inspired cafe atmosphere. Designed to evoke the aroma of slow-dripped coffee, fresh bakery warmth, and a welcoming neighborhood table, the visual direction merges clean modern interfaces with a hand-drawn, cartoonish graphic sensibility. 

The aesthetic is characterized by soft, pillowy contours, pill-shaped tactile containers, warm milky canvas tones, and gentle craft-style borders that keep illustrations and UI elements grounded. Interfaces feel approachable, joyful, and deeply functional, deliberately shedding sterile corporate minimalism in favor of comfort, appetite appeal, and cheerful micro-interactions.

## Colors

The color palette centers around the physical environment of an artisan coffee bar:

- **Primary (`#272728` - Espresso Charcoal):** Grounded, deep roasted tone used for primary typography, structural borders, strong icon strokes, and primary interactive states.
- **Secondary (`#567267` - Cafe Matcha / Sage):** Calming botanical green applied to secondary actions, organic dietary badges, active filter tabs, and herbal tea indicators.
- **Tertiary (`#D4A373` - Biscuit Caramel / Latte):** Warm caramel brown used for highlights, warm badges, price containers, and secondary action surfaces.
- **Neutral Canvas (`#FAEDCD` - Warm Milk Foam):** The global canvas tone providing an inviting, low-glare craft paper atmosphere.
- **Card Surface (`#F4F1DE` - Oat Milk Linen):** Used for elevated cards, modal sheets, and nested content panels to provide soft visual contrast against the canvas.
- **Accent Alert / Treat (`#E76F51` - Terracotta Oven):** Punchy warm coral used strictly for promotional tags, order badges, cart counters, and allergen alerts.

## Typography

The type system blends friendly, geometric headings with ultra-readable, warm body text. 

- **Headlines (`Plus Jakarta Sans`):** Selected for its balanced, rounded personality and confident weight distribution. Display titles emphasize heavy weights (`700` and `800`) to evoke a playful, cartoon-like editorial feel.
- **Body & Descriptions (`Nunito Sans`):** Provides soft, humanist terminals and rounded glyph apertures that make reading menus, origin notes, and recipes comfortable and pleasant across screen sizes.
- **Labels & Badges (`Plus Jakarta Sans`):** Leveraged for chips, prices, allergen alerts, and callouts with tighter kerning and strong letter weights to guarantee legibility at small scale.

## Layout & Spacing

The layout is built upon a responsive 12-column grid on desktop/tablet and a 4-column grid on mobile devices.

- **Desktop (1024px+):** Max-width container of 1240px, anchored with 32px (`margin`) outer boundaries and 20px (`gutter`) column gutters.
- **Tablet (768px - 1023px):** 8-column layout with 24px margins, allowing category filters and menu items to display comfortably in dual or triple columns.
- **Mobile (Below 768px):** 4-column layout with 16px (`margin-mobile`) horizontal canvas margin and 12px (`gutter-mobile`) gaps, optimized for single-column product streams and horizontal carousel rails.
- **Vertical Rhythm:** Component groupings rely strictly on the `space-*` scale. Nested items (e.g., tags within a menu card) utilize `space-xs` and `space-sm`, while cross-card separation employs `space-md` and section breaks employ `space-xl`.

## Elevation & Depth

To preserve the warm storybook illustration aesthetic, traditional blurry dark drop shadows are avoided. Depth is achieved through a combination of:

- **Tactile Offset Shadows (Sticker Effect):** Cards and active buttons use hard, directional offset shadows: `0px 4px 0px #272728`. This gives elements a physical, stamp-like feel.
- **Craft Outlines:** Key interactive and containment components utilize a clean, consistent border: `1.5px solid #272728` or a softer `1.5px solid rgba(39, 39, 40, 0.12)`.
- **Tonal Layering:** The primary page rests on Milk Foam (`#FAEDCD`), cards sit atop it on Oat Milk Linen (`#F4F1DE`), and nested drawers or floating trays gain prominence using crisp borders with solid, unblurred dark outlines.
- **Pressed Interactions:** Clicked and pressed states translate down by `2px` with shadow offset reduced to `0px 2px 0px #272728`, simulating the physical compression of an arcade button or cafe stamp.

## Shapes

The shape system expresses friendliness and approachability through generous, pillowy geometry. 

- Base UI components, cards, and modal sheets carry a `0.5rem` to `1rem` corner radius (`rounded` to `rounded-lg`).
- Feature cards, interactive pills, and illustrations utilize extra generous curvature up to `1.5rem` (`rounded-xl`).
- Tags, category filter capsules, floating counter badges, and primary action buttons utilize full pill shapes (`rounded-full` / `9999px`) to emphasize a smooth, organic pebble-like silhouette.

## Components

### Buttons
- **Primary:** Filled `#272728` background, `#FAEDCD` text, pill-shaped (`9999px`), `1.5px` solid border, with a tactile `0px 3px 0px #567267` offset drop. Hover state lightens tone slightly; pressed state compresses downward.
- **Secondary:** Filled `#567267`, white text, pill-shaped, with `0px 3px 0px #272728` hard shadow.
- **Tertiary / Ghost:** Transparent background, `#272728` border (`1.5px`), hover fills with `#FAEDCD`.

### Product & Item Cards
- **Structure:** Encased in Oat Milk Linen (`#F4F1DE`), bordered by `1.5px solid #272728` with `rounded-xl` geometry.
- **Header:** Cartoonish illustration or product photography framed within an arched or circular warm-toned mask.
- **Content:** Title (`Plus Jakarta Sans Bold`), friendly descriptive notes (`Nunito Sans`), ingredient preview, dietary badges, and price pill.
- **Footer Action:** Quick-add `+` pill button docked to bottom-right corner with tactile press state.

### Filter Pills & Categories
- Fully rounded pills (`9999px`) featuring small graphic icons (Coffee Cup, Cake Slice, Sandwich, Tea Leaf).
- **Default:** Transparent or `#F4F1DE` background with a subtle `1.5px solid rgba(39,39,40,0.15)` outline.
- **Selected:** Filled `#567267` with crisp white text, or filled `#D4A373` with `#272728` text, framed by a `1.5px solid #272728` border.

### Badges & Dietary Tags
- **Alcoholic Tag:** Warm Terracotta (`#E76F51`) background with crisp dark text or reverse white text, accompanied by a small cocktail/bottle motif.
- **Non-Alcoholic Tag:** Soft Matcha (`#567267`) or creamy Latte (`#D4A373`) tint with dark espresso stroke, signifying fresh, zero-proof refreshments.
- **Allergen Badges:** Compact circular or rounded pill chips with playful iconography (e.g., peanut, wheat, dairy icons) framed in `1px solid #272728`.

### Ingredient & Nutrition Lists
- Rendered as soft segmented strips with alternating `#F4F1DE` and `#FAEDCD` backgrounds.
- Dotted craft dividers (`border-bottom: 2px dotted rgba(39,39,40,0.2)`) between items to reinforce the cafe notebook atmosphere.

### Ecommerce Cart Indicator
- Floating pill-capsule pinned to bottom navigation or top header: `#272728` base, `#FAEDCD` type.
- Badge count enclosed in a playful glowing Terracotta (`#E76F51`) counter circle that bounces slightly on item addition.