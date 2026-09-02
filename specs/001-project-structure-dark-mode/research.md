# Research: Dark Mode & Architecture Decisions

Decision: Persist appearance preference in `localStorage` under key `tmx:appearance`.

Rationale: `localStorage` is simple, widely supported, and survives browser restarts for the same origin without server changes. It matches the acceptance criteria that preference should persist across restarts.

Implementation approach:
- Use Material UI theming (per constitution) and expose light/dark theme variants.
- Keep a small preference layer: read from `localStorage` on app bootstrap, store preference on toggle, and apply theme via a `ThemeProvider` wrapper.
- Use CSS variables for colors consumed by non-MUI parts to ensure consistency across components and any global styles.

Alternatives considered:
- Server-side persistence (requires auth/session) — rejected due to scope and acceptance criteria.
- `prefers-color-scheme` only — rejected because user control is required.

Integration notes:
- Keep theme tokens in a central location (e.g., `src/styles/theme.ts`) and derive CSS variables from Material UI tokens.
- Add small integration tests to verify toggle applies theme and persistence works across reloads.

Accessibility:
- Verify contrast ratios for both themes; prefer accessible color tokens.

References:
- TMX Earth Constitution: prefer Material UI and TypeScript.
