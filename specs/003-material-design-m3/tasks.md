# Tasks: Material Design 3 Visual Refresh

**Input**: Design documents from `/specs/003-material-design-m3/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-design-contract.md

**Organization**: Tasks are grouped by user story so the visual refresh and usability checks can be implemented and validated independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the shared visual baseline before making story-level refinements.

- [ ] T001 [P] Review the current theme and surface entry points in `src/styles/theme.ts`, `src/styles/global.scss`, and `src/App.tsx` to confirm the Material Design 3 refresh will stay within the existing app architecture
- [ ] T002 [P] Review the current appearance behavior in `src/hooks/useAppearancePreference.ts`, `src/components/DarkModeToggle.tsx`, and `src/App.tsx` so the light/dark experience remains stable while the visual system updates
- [ ] T003 [P] Review the current UI structure in `src/components/ListCountries.tsx` and `src/components/Countries/InfoCountries.tsx` to map the primary surfaces, controls, and content hierarchy that need consistent M3-inspired styling

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the shared visual system and theme contract that all user-story work depends on.

- [ ] T004 Update `src/styles/theme.ts` to centralize Material Design 3-inspired light and dark palette tokens, typography scale, spacing rhythm, shape rules, and elevation values
- [ ] T005 [P] Update `src/styles/global.scss` to align global host variables, surface styling, border radius, and shadow treatment with the new shared theme contract
- [ ] T006 Update `src/App.tsx` so `ThemeProvider`, `CssBaseline`, and the existing shadow-root layout continue to work with the refreshed visual system without breaking the existing app shell
- [ ] T007 Update `src/components/DarkModeToggle.tsx` to keep the toggle accessible and readable while giving it M3-inspired button styling and visible focus affordances
- [ ] T008 Ensure the current appearance preference flow remains stable by checking `src/hooks/useAppearancePreference.ts` and the persisted storage contract in `src/utils/appearanceStorage.ts`

**Checkpoint**: Foundation ready - the global visual system and appearance behavior are established before story-specific UI work begins.

---

## Phase 3: User Story 1 - Experience a modern, consistent interface (Priority: P1) 🎯 MVP

**Goal**: Deliver a coherent Material Design 3-inspired visual language across the main screens and core surfaces.

**Independent Test**: Open the application and confirm the main interface presents a consistent palette, layout rhythm, and elevated surfaces in both modes.

### Implementation for User Story 1

- [ ] T009 [P] [US1] Refresh the primary container styling in `src/styles/global.scss` and `src/styles/theme.ts` so the app shell, list surface, and content sections feel consistent and modern
- [ ] T010 [US1] Update `src/components/ListCountries.tsx` to use the new spacing, radius, and hierarchy while preserving the current country selection flow and loading/error states
- [ ] T011 [US1] Update `src/components/Countries/InfoCountries.tsx` to keep the details panel readable and visually consistent with the new theme while preserving existing country field behavior
- [ ] T012 [US1] Review and refine the supporting loading and content surfaces in `src/components/Load/` and `src/components/Skeleton/` so they align with the refreshed Material-inspired visual language without losing clarity
- [ ] T013 [US1] Check keyboard and contrast accessibility in `src/styles/global.scss`, `src/components/DarkModeToggle.tsx`, and the primary form controls so focus states remain visible and text stays readable

**Checkpoint**: User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Maintain usability while refreshing the visual system (Priority: P2)

**Goal**: Keep the country browsing and detail workflow clear and usable while the application adopts its new design language.

**Independent Test**: Browse a country, switch appearance modes, and confirm the experience remains understandable, readable, and fully usable after the visual refresh.

### Implementation for User Story 2

- [ ] T014 [P] [US2] Validate and adjust the light/dark transition in `src/styles/theme.ts`, `src/App.tsx`, and `src/hooks/useAppearancePreference.ts` so the refreshed M3 tokens remain coherent in both states
- [ ] T015 [US2] Update the select and detail interactions in `src/components/ListCountries.tsx` and `src/components/Countries/InfoCountries.tsx` to preserve the current country lookup flow while aligning with the new visual hierarchy
- [ ] T016 [US2] Ensure the application still communicates loading, empty, and error states clearly under the new theme by reviewing `src/components/Load/`, `src/components/Countries/InfoCountries.tsx`, and `src/components/ListCountries.tsx`
- [ ] T017 [US2] Verify the new styling does not degrade usability by checking focus visibility, text contrast, and control legibility across the app’s main interactions

**Checkpoint**: User Stories 1 and 2 should both work independently after the visual refresh is complete.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Validate the visual refresh, document the design direction, and confirm the app remains stable after the update.

- [ ] T018 [P] Update `specs/003-material-design-m3/quickstart.md` with the exact steps to validate the refreshed theme, appearance toggle, and overall usability
- [ ] T019 [P] Add a short note in `README.md` or `docs/PROJECT_ANALYSIS.md` summarizing the Material Design 3-inspired refresh and the accessibility/usability guardrails used during the update
- [ ] T020 [P] Run `npm test -- --watchAll=false` and `npm run build` to confirm the refreshed design still passes the project’s automated checks
- [ ] T021 Run the manual verification flow from `specs/003-material-design-m3/quickstart.md` to confirm the app remains usable in both light and dark modes and preserves the expected country browsing experience

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user-story implementation
- **User Stories (Phase 3+)**: Depend on Foundational completion
  - User Story 1 can start immediately after Phase 2
  - User Story 2 can start after Phase 2 and can be developed in parallel with User Story 1 if needed
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Independent after Foundational is complete
- **User Story 2 (P2)**: Independent after Foundational is complete, with minor integration to the same theme contract

### Parallel Opportunities

- `T001`, `T002`, and `T003` can be completed in parallel during setup
- `T005`, `T006`, and `T007` can be developed in parallel after theme analysis
- `T009`, `T010`, and `T011` can be implemented in parallel within User Story 1 if team capacity allows
- `T014`, `T015`, and `T016` can be developed in parallel within User Story 2
- `T018`, `T019`, and `T020` can be completed in parallel during polish

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Finish Phase 1 and Phase 2 to establish the shared Material Design 3-inspired theme
2. Complete User Story 1 to refresh the main packaging, surfaces, and content hierarchy
3. Validate the app’s primary experience before polishing the usability details in User Story 2

### Incremental Delivery

1. Establish the source-of-truth theme and global surface rules
2. Deliver the main visual refresh across the app shell and primary content
3. Validate the country browsing workflow remains clear and usable
4. Finish the dark/light mode polish and documentation updates
5. Run the final validation suite to confirm the application remains stable
