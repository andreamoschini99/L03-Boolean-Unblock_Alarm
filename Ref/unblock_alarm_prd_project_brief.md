# Product Requirements Document (PRD) & Design Brief: Unblock Alarm

---

## 1. Executive Summary & Vision

**Product Name:** Unblock Alarm  
**Platform:** iOS / Android Mobile (Target initial viewport: 390 × 844 px — iPhone standard)  
**Core Concept:** A mission-critical smart alarm clock designed for heavy sleepers and chronic snoozers. Unlike standard alarm apps that allow unconscious one-tap dismissal, Unblock Alarm requires the user to solve a tactile sliding block puzzle (Klotski / Unblock style) to stop the alarm ringing.

### Value Proposition
- **Guaranteed Cognitive Wake-Up:** Forces the prefrontal cortex to engage by requiring spatial reasoning and problem solving before silencing the ringtone.
- **Deterrent Snooze Mechanics:** Snooze is permitted, but each snooze event increases puzzle complexity and reduces time-to-solve.
- **Zero Friction, Single-Purpose Interface:** No labyrinthine sub-menus or distracting social feeds in the critical wake-up moment.

---

## 2. Target Audience & Personas

| Persona | Problem | Goal |
|---|---|---|
| **The Heavy Sleeper** (e.g., Matteo, 24, Student) | Subconsciously turns off alarms and falls back asleep without remembering. | Needs an unavoidable barrier that forces wakefulness. |
| **The Chronic Snoozer** (e.g., Chiara, 31, Professional) | Hits snooze 4–6 times, losing productive morning hours and feeling fatigued. | Needs a progressive penalty mechanism that discourages snoozing. |
| **The Light Minimalist** | Despises complicated bloated alarm apps with ads and subscriptions. | Wants a clean, tactile, distraction-free native experience. |

---

## 3. Product Principles & UX Requirements

1. **Cognitive Activation over Frustration:** The puzzle must take between 10 to 30 seconds to solve on Level 1. It must not be impossible, but requires deliberate focus.
2. **Immediate Affordance & Visual Tactility:** The puzzle tiles must look and feel like physical sliding wooden/plastic tiles with grip notches, intuitive drag mechanics, and audible haptic feedback.
3. **High-Contrast Dark Theme (Bedside Safe):** The interface opens in dark mode (`#121212`) to prevent screen-glare shock in a dark bedroom, while directing 100% of the focal energy onto the bright orange `#FF5722` "STOP" key block.
4. **Verbatim Microcopy & Tone:** Empathetic, direct, and slightly challenging ("Dimostra che sei sveglio").

---

## 4. Key Features & Functional Requirements

### 4.1. Active Alarm Screen (The Core Experience)
- **Top Bar & Clock Display:**
  - Status indicator badge: `UNBLOCK ALARM`.
  - Extra-large digital clock display (`07:30`) in bold sans-serif, refreshed every second.
  - Subtitle prompt: *"Dimostra che sei sveglio"*.
  - Action hint microcopy: *"Trascina il blocco STOP verso l'uscita →"*.

### 4.2. 6×6 Sliding Block Puzzle (Engine & Rules)
- **Grid Layout:** Standard 6×6 discrete tile grid with a marked exit gate (**"VARCO"**) on the right edge of row 3.
- **Block Types:**
  - **Obstacle Blocks:** Neutral dark-grey matte tiles (`#2A2A2A`), orientation locked to either horizontal (1×2, 1×3) or vertical (2×1, 3×1).
  - **Key Target Block ("STOP"):** Distinct 1×2 horizontal tile styled in high-energy radiant orange (`#FF5722`) with illuminated arrows `◀ STOP ▶`.
- **Slide Physics:**
  - Strict 1D axis-constrained sliding (horizontal blocks move only left/right; vertical only up/down).
  - Collision detection against neighboring blocks and border walls.
  - Tactile haptic feedback on block snap and wall collision.
- **Win Condition (Alarm Dismissal):**
  - Sliding the "STOP" block completely through the exit slot ("VARCO") triggers a triumphant haptic vibration, silences the audio, and transitions to the morning summary or closes the app.

### 4.3. Penalty-Based Snooze Mechanic
- **Floating Snooze Pill:** Secondary action button positioned at the lower thumb zone (`Snooze (5 min)`).
- **Difficulty Escalation:**
  - Notice label: *"Attenzione: al prossimo squillo il puzzle sarà più difficile"*.
  - **Level 1 (Initial Ring):** 6–8 minimum moves to solve, 10–12 blocks.
  - **Level 2 (After 1st Snooze):** 12–15 minimum moves, denser obstacle configuration.
  - **Level 3+ (After 2nd Snooze):** 18+ minimum moves; alarm volume increases by 15% every 10 seconds until solved.

### 4.4. Analytics & Level Telemetry
- Footer counters displaying live move count (`MOSSE EFFETTUATE: 00`) and current puzzle tier (`LIVELLO: 1`).

---

## 5. Visual Design System Specification

| Token / Element | High-Fidelity Value | Wireframe Value | Rationale |
|---|---|---|---|
| **Background** | `#121212` (Deep Charcoal Black) | `#F5F5F5` / `#FFFFFF` | Minimizes eye strain upon waking in pitch darkness. |
| **Grid Tray** | `#1E1E1E` with subtle 1px border | `#E5E5E5` clean border | Clear spatial enclosure for the puzzle field. |
| **Obstacle Blocks** | `#2A2A2A` with bevel & embossed grip pills | `#D9D9D9` flat rounded rect | Tactile affordance indicating slideable surface. |
| **Target "STOP" Block** | `#FF5722` (Electric Orange) + Outer Glow | `#000000` inverted solid black | Instant visual hierarchy; zero search time for the exit goal. |
| **Exit Gate ("VARCO")** | Dashed orange border `#FF5722` | Dashed black border | Highlights clear escape path along the right perimeter. |
| **Typography** | Inter / System Sans, Tabular figures for time | System Monospace / Sans | Clean, legible at arm's length without reading glasses. |
| **Snooze Button** | Translucent pill `#242424` with warning icon | Pill button with outline | Subordinated visual weight compared to the puzzle canvas. |

---

## 6. Technical & System Architecture Considerations

1. **Audio Session & DND Bypass:**
   - Must request Critical Alerts permission on iOS (`UNAuthorizationOptionCriticalAlert`) and Alarm Manager / Full Screen Intent on Android to ring even in Silent/Do Not Disturb mode.
2. **Deterministic Puzzle Generation:**
   - Pre-computed database of solvable 6×6 sliding block configurations classified into difficulty brackets (Tier 1: 6-10 moves; Tier 2: 11-16 moves; Tier 3: 17+ moves).
3. **Anti-Cheating Guardrails:**
   - Volume rocker / power button triggers Snooze (with penalty) instead of complete silence.
   - Force-quitting the app restarts the alarm service immediately.
4. **Accessibility:**
   - Screen-reader / VoiceOver alternative gesture mode or cognitive challenge bypass.
   - High color-contrast ratio compliance (WCAG AAA for text and target block).

---

## 7. Roadmap & Future Scope (v1.1+)

- **Alarm Scheduling & Bedtime Routine:** Time-picker configuration screen and recurring day-of-week settings.
- **Sleep Wake Analytics:** Morning wakefulness tracking (average time to solve, snooze frequency over time).
- **Haptic Audio Themes:** Dynamic audio soundscapes that fade into relaxing ambient music once the puzzle is unlocked.
- **Custom Puzzle Themes:** Aesthetic unlockables (Cyberpunk, Scandinavian Wood, Retro Terminal).
