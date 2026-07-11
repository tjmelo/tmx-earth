# Tasks: Project Structure Refresh and Dark Mode

**Input**: Design documents from `/specs/001-project-structure-dark-mode/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the new theme, preference, and type infrastructure needed by the feature.

- [X] T001 [P] Create `src/styles/theme.ts` with light/dark theme tokens and helper export for active theme selection
- [X] T002 [P] Create `src/utils/appearanceStorage.ts` to read and write the `tmx:appearance` preference from `localStorage`
- [X] T003 [P] Create `src/hooks/useAppearancePreference.ts` to expose current appearance preference, toggle behavior, and storage persistence
- [X] T004 [P] Create `src/components/DarkModeToggle.tsx` with an accessible toggle control for dark mode
- [X] T005 [P] Update `src/interfaces/index.ts` to add a stable `Country` entity definition and `AppearancePreference` type

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement the theme infrastructure and preserve the existing API contract before story work begins.

- [ ] T006 Update `src/App.tsx` to wrap the app with MUI `ThemeProvider`, apply the active theme from `useAppearancePreference`, and preserve existing shadow DOM rendering
- [ ] T007 Update `src/model/api.ts` to keep `baseURL` as `https://restcountries.com/v3.1` and document the preserved API contract
- [ ] T008 Update `src/service/request.ts` so `toRequestOne` uses the shared `api` instance and preserves the existing field contract for country details
- [ ] T009 Add `src/components/___tests__/DarkModeToggle.spec.tsx` to verify the toggle updates UI state and persists `tmx:appearance`

---

## Phase 3: User Story 1 - Preserve Country Browsing Experience (Priority: P1) 🎯 MVP

**Goal**: Keep the current country list, selection, and details flow working while reorganizing structure.

**Independent Test**: Open the app, select a country from the list, and verify the details view appears with the current fields.

- [ ] T010 [US1] Update `src/components/ListCountries.tsx` to preserve the current country browsing experience with `react-query` loading, error handling, and selection behavior
- [ ] T011 [US1] Update `src/components/Countries/InfoCountries.tsx` to preserve the country detail view and handle slow or failing API responses without losing the current visible information
- [ ] T012 [US1] Update `src/components/___tests__/ListCoutries.spec.tsx` to assert that selecting a country triggers the existing details flow
- [ ] T013 [US1] Update `src/components/___tests__/InfoCoutries.spec.tsx` to assert the current country details are rendered for a selected country

---

## Phase 4: User Story 2 - Dark Mode Toggle (Priority: P2)

**Goal**: Add a dark mode option and apply it consistently across primary UI surfaces.

**Independent Test**: Toggle dark mode on and off and verify the interface updates immediately and persists after refresh.

- [ ] T014 [P] [US2] Add `src/components/DarkModeToggle.tsx` to the app UI and wire it to `useAppearancePreference`
- [ ] T015 [US2] Update `src/App.tsx` to persist and restore `tmx:appearance` on reload using `useAppearancePreference`
- [ ] T016 [US2] Update `src/styles/global.scss` or `src/styles/components.module.scss` to ensure the active theme applies consistently across Bootstrap and MUI-based UI elements
- [ ] T017 [P] [US2] Add `src/components/___tests__/DarkModeToggle.spec.tsx` to cover toggle behavior and persistence of `tmx:appearance`

---

## Phase 5: User Story 3 - Preserve API-Driven Data Flow (Priority: P2)

**Goal**: Keep using the existing REST Countries API contract and preserve the current fields used by the app.

**Independent Test**: Country data continues to load from `https://restcountries.com/v3.1` and the same expected fields are used in the app.

- [ ] T018 [US3] Add or update `src/service/request.spec.ts` to verify the REST Countries API contract and stable fields `name.common`, `population`, `area`, `region`, `flags`, and `cca3`
- [ ] T019 [US3] Update `src/service/request.ts` error handling to preserve the existing API contract and gracefully handle missing or extra fields from the REST Countries API
- [ ] T020 [P] [US3] Document the preserved API contract in `src/model/api.ts` and ensure the API endpoint remains configured as `https://restcountries.com/v3.1`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the feature, update docs, and ensure the final implementation is stable.

- [ ] T021 [P] Update `specs/001-project-structure-dark-mode/quickstart.md` with exact verification steps for dark mode persistence and API contract validation
- [ ] T022 [P] Update `README.md` or `docs/PROJECT_ANALYSIS.md` with a short note that the feature preserves current country browsing and adds dark mode support
- [ ] T023 [P] Run `npm test` and run the app locally to confirm the preserved country flow and dark mode behavior

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
  - User Story 1 can start immediately after Phase 2
  - User Story 2 and User Story 3 can start after Phase 2 and run in parallel
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: independent after Foundational is complete
- **User Story 2 (P2)**: independent after Foundational is complete
- **User Story 3 (P2)**: independent after Foundational is complete

### Parallel Opportunities

- `T001`, `T002`, `T003`, `T004`, and `T005` can be worked in parallel during setup
- `T009` can run in parallel with `T006`, `T007`, and `T008` during Foundational work
- `T014`, `T015`, and `T016` can be developed in parallel with `T018` and `T019` after Foundational is complete
- `T021`, `T022`, and `T023` can be done in parallel as final polish tasks

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2 to establish theme persistence and API contract stability
2. Deliver User Story 1 first as the MVP: preserve the current country browsing and detail flow
3. Validate User Story 1 independently before adding dark mode or API contract polish

### Incremental Delivery

1. Finish foundational theme and API contract work
2. Deliver and validate User Story 1
3. Deliver User Story 2 dark mode toggle
4. Deliver User Story 3 preserve API-driven flow and contract verification
5. Finish polish with docs and tests
