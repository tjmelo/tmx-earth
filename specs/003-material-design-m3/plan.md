# Implementation Plan: Material Design 3 Visual Refresh

**Branch**: `003-material-design-m3` | **Date**: 2026-09-01 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/003-material-design-m3/spec.md`

## Summary

Refresh the application’s visual language toward Material Design 3 inspiration while preserving the current country discovery workflow and accessibility. The implementation keeps the project’s existing React + TypeScript + MUI architecture and focuses on a shared theme layer, more consistent spacing and surfaces, and careful component polish without requiring full Material Design 3 component conformance.

## Technical Context

**Language/Version**: TypeScript 5.4.5, React 18.3.1, MUI 6.0.2

**Primary Dependencies**: @mui/material, @emotion/react, @emotion/styled, react-query, bootstrap, webpack

**Storage**: N/A (client-side UI styling only)

**Testing**: Jest with React Testing Library, plus style validation for SCSS/theme usage

**Target Platform**: Web browser interface

**Project Type**: Web application

**Performance Goals**: Preserve fast interactions and avoid expensive re-renders while updating visual styling; maintain responsive list/detail behavior

**Constraints**: Material Design 3 must be used as a visual inspiration, not a strict full-system compliance target; keep existing flows and functionality stable; avoid broken or confusing UI states

**Scale/Scope**: Single frontend application with a country list, detail view, and theme toggle across the main experience

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- The design refresh stays within the existing React + TypeScript + Material UI architecture and avoids introducing a separate styling framework.
- The visual system will be centralized in the theme and shared styling layer so colors, spacing, elevation, and typography remain predictable.
- Existing user flows remain the priority; all changes are scoped to visual-system refinement and component polish.
- Accessibility remains a requirement: focus states, contrast, and readable hierarchy need to be preserved or improved during the visual update.
- Automated verification will include build/test validation and targeted checks for the updated theme and UI behavior.

## Project Structure

### Documentation (this feature)

```text
specs/003-material-design-m3/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-design-contract.md
└── checklists/
```

### Source Code (repository root)

```text
src/
├── App.tsx
├── components/
│   ├── Countries/
│   ├── ListCountries.tsx
│   ├── Load/
│   ├── Mount/
│   ├── Skeleton/
│   └── DarkModeToggle.tsx
├── hooks/
│   └── useAppearancePreference.ts
├── styles/
│   ├── global.scss
│   ├── theme.ts
│   └── components.module.scss
├── store/
├── utils/
├── interfaces/
├── model/
├── service/
└── constants/
```

**Structure Decision**: Keep the refresh scoped to the existing frontend styling and component layer. A shared theme definition will live in `src/styles/theme.ts`, global surface styles in `src/styles/global.scss`, and component-level refinements will remain local to the presentational layer rather than creating a duplicate design-system package.

## Complexity Tracking

No constitution violations are expected for this feature. The scope remains a visual refresh within the current architecture and does not require a new application structure or technology stack.
