---
name: Tactile Wake Cognitive Interface
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e4beb4'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#ab8980'
  outline-variant: '#5b4039'
  surface-tint: '#ffb5a0'
  primary: '#ffb5a0'
  on-primary: '#5f1500'
  primary-container: '#ff5722'
  on-primary-container: '#541200'
  inverse-primary: '#b02f00'
  secondary: '#c8c6c5'
  on-secondary: '#303030'
  secondary-container: '#474746'
  on-secondary-container: '#b6b5b4'
  tertiary: '#c8c6c5'
  on-tertiary: '#303030'
  tertiary-container: '#929090'
  on-tertiary-container: '#2a2a2a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd1'
  primary-fixed-dim: '#ffb5a0'
  on-primary-fixed: '#3b0900'
  on-primary-fixed-variant: '#862200'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  tray-surface: '#1E1E1E'
  border-subtle: '#333333'
  text-primary: '#FFFFFF'
  text-secondary: '#A0A0A0'
  glow-orange: rgba(255, 87, 34, 0.45)
typography:
  display-time:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.03em
  display-time-mobile:
    fontFamily: Inter
    fontSize: 52px
    fontWeight: '700'
    lineHeight: 58px
    letterSpacing: -0.03em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-tile:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '800'
    lineHeight: 20px
    letterSpacing: 0.08em
  label-badge:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.12em
  label-mono-stat:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system is engineered for high-stakes morning cognitive reactivation under groggy, low-light bedside conditions. It balances utilitarian mission-readiness with the sensory gratification of physical mechanical escape puzzles (Klotski / sliding block puzzles). 

The emotional objective is twofold: relieve morning visual shock through a safe deep-dark canvas, while commanding sharp mental alertness through hyper-tactile physics and a single vibrant focus point. The design style combines **Dark Minimalism** with **Tactile Skeuomorphism**: ultra-dark matte backgrounds, precise modular constraints, physical extruded tile surfaces with beveled grip ribs, and an electric radiant beacon indicating the critical escape path.

## Colors

The chromatic structure enforces a strict nocturnal hierarchy tailored for dark bedside interaction:
- **Canvas (`#121212`):** Absorbs OLED pixels, preventing ocular strain while eliminating background distractions.
- **Surface & Tray (`#1E1E1E`):** Provides subtle architectural containment for the 6×6 puzzle board, separating active mechanics from telemetry headers and footers.
- **Obstacle Blocks (`#2A2A2A`):** Matte neutral tiles that recede visually until manipulated by direct touch.
- **Electric Orange (`#FF5722`):** The primary focal chromatic token. Used strictly for the primary STOP target block, directional guides, and the dashed perimeter gate ("VARCO"). Its mission is unmissable cognitive focus.
- **Subordinated Interactive (`#242424`):** A lowered-contrast, semi-translucent fill designated for low-priority actions such as Snooze, intentionally reducing accidental dismissal.

## Typography

Typography relies on `Inter` across all tiers, paired with OpenType tabular figures (`font-variant-numeric: tabular-nums; tnum: 1`) on the digital clock and telemetry counters to prevent jitter during live updates.

- **Clock & Telemetry:** Must remain strictly fixed-width. The time display commands immediate recognition without dominating the interactive puzzle space.
- **Microcopy Directives:** Use sentence case with clean punctuation for instructions (*"Dimostra che sei sveglio"*, *"Trascina il blocco STOP verso l'uscita →"*).
- **Tactile & Gate Labels:** Rendered in bold, spaced uppercase (*"◀ STOP ▶"*, *"VARCO"*) to guarantee instant legibility when finger contact partially obscures tile faces.

## Layout & Spacing

The layout is built for native mobile viewports (baseline target: 390×844 pt) optimized for one-handed groggy interactions:

- **Vertical Structure:**
  - **Top Anchor (Safe Zone):** App state badge, prominent digital clock, and challenge subtitle.
  - **Center Canvas (The Board):** A square 6×6 tile tray centered vertically, filling the horizontal width bounded by outer margins (`1.25rem`). The right edge incorporates an opening aligned with row 3 representing the exit gate.
  - **Lower Thumb Zone:** Directional hint microcopy, floating Snooze pill button, and punitive warning text positioned safely away from accidental activation.
- **Puzzle Grid Mechanics:** The board is governed by an absolute 6×6 coordinate space. Internal inter-tile gutters (`0.25rem` / `space-xs`) maintain uniform clearance between sliding blocks without permitting structural drift.

## Elevation & Depth

Visual hierarchy leverages tangible physical depth rather than abstract drop shadows:

- **The Tray (`#1E1E1E`):** Sunken appearance using an inner inset hairline (`inset 0 2px 4px rgba(0, 0, 0, 0.6)`) bounded by a subtle `1px` border (`#333333`).
- **Obstacle Blocks (`#2A2A2A`):** Physical extrusion modeled with dual highlights: a top highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.12)`), an underside shade (`inset 0 -2px 0 rgba(0, 0, 0, 0.45)`), and a tight ambient drop shadow (`0 4px 8px rgba(0, 0, 0, 0.4)`).
- **Target STOP Block (`#FF5722`):** Elevated above standard obstacle blocks with a persistent radiant outer glow (`0 0 16px rgba(255, 87, 34, 0.45), 0 2px 6px rgba(0, 0, 0, 0.5)`). When actively grabbed, this glow increases in radius and intensity.
- **Grip Ribs / Notches:** Recessed pill-shaped tactile notches debossed directly into the center of each tile surface using negative inset shadows (`inset 0 1px 2px rgba(0, 0, 0, 0.8)`).
- **Snooze Pill:** Low-elevation, frosted-glass treatment (`backdrop-filter: blur(12px)`) with a dark translucent body (`rgba(36, 36, 36, 0.75)`) and a subtle `1px` boundary to establish background independence without drawing focus.

## Shapes

The geometric vocabulary balances clean hardware edges with ergonomic touch targets:
- **Puzzle Tiles:** Medium roundedness (`0.5rem` / `rounded-md`) matching physical molded gaming pieces. Inner grip indicators adopt micro-capsule pill shapes.
- **Tray Frame:** Structural boundary with `1rem` outer corner radius and recessed margins.
- **Exit Marker ("VARCO"):** Border along row 3 of the right perimeter rendered as a crisp `2px` dashed stroke in `#FF5722`, conveying an unsealed aperture.
- **Interactive Buttons & Badges:** Snooze action trigger utilizes a full capsule pill shape (`9999px`) to visually differentiate system utilities from orthogonal puzzle blocks.

## Components

### 1. 6×6 Sliding Board & Puzzle Tiles
- **Tray:** Enclosed `#1E1E1E` grid with a `1px` `#333333` perimeter. The right border on row 3 features a `2px` dashed `#FF5722` boundary labeled `"VARCO"`.
- **Target Block (1×2 Horizontal):** Fill in `#FF5722`, text `"◀ STOP ▶"` centered in `label-tile` (`#FFFFFF`). Houses embossed grip notches. Radiates orange glow. Translates exclusively along the X-axis.
- **Obstacle Blocks:** Fills in `#2A2A2A` with beveled edges and matte finish. Orientation determines constraint: horizontal blocks (1×2, 1×3) translate only along the X-axis; vertical blocks (2×1, 3×1) translate only along the Y-axis.

### 2. Digital Clock Display & Header
- **Badge:** Top pill capsule with background `#1E1E1E`, text `"UNBLOCK ALARM"` in `label-badge` (`#A0A0A0`).
- **Clock:** Centered `display-time` in `#FFFFFF` with fixed tabular spacing.
- **Prompt:** Under clock, verbatim text *"Dimostra che sei sveglio"* in `body-md` (`#A0A0A0`).

### 3. Guidance Microcopy
- **Action Directive:** Positioned directly below the board, text verbatim: *"Trascina il blocco STOP verso l'uscita →"* in `body-sm` (`#FFFFFF`). Arrow rendered as an illuminated inline glyph.

### 4. Floating Snooze Button
- **Structure:** Pill shape (`9999px`) using translucent `#242424` fill, flanked by a subtle `1px` border (`#333333`).
- **Content:** Warning icon (`⚠️`) alongside verbatim text `"Snooze (5 min)"` in `body-sm` (`#A0A0A0`).
- **Penalty Microcopy:** Beneath the Snooze pill, italicized or alert-styled text verbatim: *"Attenzione: al prossimo squillo il puzzle sarà più difficile"* in `body-sm` (`#FF5722`).

### 5. Telemetry & Stats Footer
- Pair of low-emphasis tracking units in `label-mono-stat` (`#A0A0A0`): `"MOSSE EFFETTUATE: 00"` on the left, `"LIVELLO: 1"` on the right.