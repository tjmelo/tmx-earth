# Research: Material Design 3 Visual Refresh

## Decision

Adopt a Material Design 3-inspired visual system through centralized MUI theme tokens, elevated surfaces, clearer typography hierarchy, and consistent interactive states, while preserving the current app structure and country workflow.

## Rationale

The current codebase already uses Material UI and a theme provider, which makes a Material Design 3-inspired refresh a natural fit. The app is already organized around a small set of shared styling and component boundaries, so the lowest-risk path is to evolve those shared tokens rather than redesign the application from scratch.

## Implementation approach

- Centralize color, typography, surface, and shape decisions in `src/styles/theme.ts`.
- Keep the app theme responsive to the current light/dark preference while introducing M3-inspired tone values and elevated surfaces.
- Use consistent spacing and border radius patterns across list items, cards, sections, and controls.
- Improve hierarchy and focus states through typography scale, contrast, and interactive affordances without altering the current flow.
- Retain the existing app structure and lifecycle so the feature remains incremental and low-risk.

## Alternatives considered

- Full Material Design 3 component conformance: rejected because the spec explicitly states inspiration only, not strict system conformance.
- Replacing the current styling layer with a new design-system package: rejected because that would create unnecessary tooling and migration risk for a small front-end app.
- Discrete per-component styling without tokens: rejected because it would drift and make consistency harder to maintain over time.

## Integration notes

- Use the current `ThemeProvider` and `CssBaseline` as the integration point between MUI theming and the app shell.
- Preserve the shadow-root styling approach in `App.tsx` and `global.scss`, while updating the underlying CSS variables to align with M3-inspired values.
- Keep accessibility as a first-class check: all interactive elements should maintain visible focus and readable contrast in both appearance modes.
- Validate the update through targeted UI and build checks rather than a full redesign of feature behavior.
