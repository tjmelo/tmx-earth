# Implementation Plan: Project Structure Refresh and Dark Mode

**Branch**: `001-project-structure-dark-mode` | **Date**: 2026-09-02 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-project-structure-dark-mode/spec.md`

## Summary

Refresh and reorganize the application structure without breaking the current country browsing and detail experience, while introducing a persisted dark-mode preference. The implementation keeps the existing REST Countries API contract and user workflows stable, centralizes appearance state in a browser-persistent preference layer, and applies a Material UI-based theme across the app.

## Technical Context

**Language/Version**: TypeScript 5.4.5, React 18.3.1, Jest, webpack 5

**Primary Dependencies**: Material UI, @emotion/react, @emotion/styled, axios, react-query, bootstrap, webpack, react-scripts-test

**Storage**: Browser `localStorage` for the persisted appearance preference; no server-side persistence required for the MVP

**Testing**: Jest + React Testing Library for component and request verification; build validation through the app’s existing test and webpack scripts

**Target Platform**: Web browser

**Project Type**: Web application

**Performance Goals**: Preserve the current fast country list/detail interactions and keep theme toggling immediate with no additional network or heavy re-renders

**Constraints**: Do not break the existing country data contract; maintain accessible contrast and focus states; keep the app’s behavior stable while reorganizing structure

**Scale/Scope**: Single frontend app with country browsing, detail view, loading/error states, and a user theme preference across the main screens

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- The implementation stays within the existing React + TypeScript + Material UI architecture and avoids introducing a custom design system.
- The country data flow remains explicit and typed through `src/model`, `src/service`, and shared interfaces; API contract stability is preserved.
- The dark-mode feature is centralized in `src/styles/theme.ts`, `src/hooks/useAppearancePreference.ts`, and `src/utils/appearanceStorage.ts` so behavior is predictable and reusable.
- Accessibility requirements are respected through an explicit toggle control, focusable UI states, and theme contrast checks during implementation.
- Automated verification will cover the request layer and theme-persistence behavior, keeping the change aligned with the quality and delivery principles in the constitution.

## Project Structure

### Documentation (this feature)

```text
specs/001-project-structure-dark-mode/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── api-contract.md
├── checklists/
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── App.tsx
├── bootstrap.tsx
├── index.ts
├── components/
│   ├── Countries/
│   ├── DarkModeToggle.tsx
│   ├── ListCountries.tsx
│   ├── Load/
│   ├── Mount/
│   ├── Skeleton/
│   └── ___tests__/
├── constants/
├── feature/
├── hooks/
│   └── useAppearancePreference.ts
├── interfaces/
│   └── index.ts
├── model/
│   └── api.ts
├── service/
│   ├── request.ts
│   └── request.spec.ts
├── store/
├── styles/
│   ├── components.module.scss
│   ├── global.scss
│   └── theme.ts
├── utils/
│   ├── alphabeticalOrder.ts
│   ├── appearanceStorage.ts
│   ├── index.ts
│   ├── parse-number.ts
│   └── styleScope.ts
└── types/
```

**Structure Decision**: Keep a single frontend application, using the existing feature/service/component structure rather than creating a separate backend or custom design-system package. Theme logic and appearance persistence live in the shared UI layer, while country data access remains in the existing request and model modules.

## Complexity Tracking

No constitution violations are expected for this feature. The scope remains a controlled frontend refresh and theme enhancement within the current project architecture and technology stack.
