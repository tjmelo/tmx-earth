# Tasks: Country Data Source Update

**Input**: Design documents from `/specs/004-country-data-update/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story so the country browse, detail lookup, and graceful failure handling can be implemented and verified independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing request and UI entry points are ready for the countries.dev migration.

 - [X] T001 [P] Review the existing API client and request helpers in src/model/api.ts and src/service/request.ts so the new endpoints align with the application's current contract
 - [X] T002 [P] Review the current country list and detail rendering flow in src/components/ListCountries.tsx and src/components/Countries/InfoCountries.tsx to preserve behavior during the migration

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared response handling needed before story work begins.

- [X] T003 Implement a shared defensive country-response handling path so missing provider values are treated as unavailable rather than broken output in src/service/request.ts and src/interfaces/index.ts
- [X] T004 [P] Add a small normalization helper for country fields such as name, flags, population, area, and region in src/utils/ or src/service/request.ts
- [X] T005 Ensure the existing loading and error states remain clear and accessible during request failures in src/components/ListCountries.tsx and src/components/Countries/InfoCountries.tsx

**Checkpoint**: Foundation ready - country browsing and detail lookup can now be implemented in parallel.

---

## Phase 3: User Story 1 - Browse countries without disruption (Priority: P1) 🎯 MVP

**Goal**: Keep country browsing working after the API endpoint change.

**Independent Test**: Open the app, load the country list, and verify that countries appear without empty or broken states.

### Tests for User Story 1

- [X] T006 [P] [US1] Add or update request-layer coverage for the list endpoint in src/service/request.spec.ts
- [X] T007 [P] [US1] Add or update list component coverage for the browse experience in src/components/___tests__/ListCoutries.spec.tsx

### Implementation for User Story 1

- [X] T008 [US1] Update src/service/request.ts to call the new list endpoint at /countries while preserving the existing UI-facing fields
- [X] T009 [US1] Update src/components/ListCountries.tsx to continue rendering the country dropdown, loading state, and selection flow with the migrated data source
- [X] T010 [US1] Keep country sorting and selection behavior intact in src/utils/alphabeticalOrder.ts and src/feature/country/countrySlice.ts if the migrated response changes shape

**Checkpoint**: User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - View a specific country by name (Priority: P2)

**Goal**: Preserve country detail lookup through the updated name-based flow.

**Independent Test**: Search for or select a country name and verify the matching detail view appears without disruption.

### Tests for User Story 2

- [ ] T011 [P] [US2] Add or update request-layer coverage for country lookup by name in src/service/request.spec.ts
- [ ] T012 [P] [US2] Add or update detail component coverage for successful and no-result lookups in src/components/___tests__/InfoCoutries.spec.tsx

### Implementation for User Story 2

- [ ] T013 [US2] Update src/service/request.ts to call /countries/name/{country} for name-based lookups and return a compatible shape for the UI
- [ ] T014 [US2] Update src/components/Countries/InfoCountries.tsx to render country details, missing-field fallbacks, and no-result feedback without broken states
- [ ] T015 [US2] Ensure the detail flow preserves the existing visible country fields in src/interfaces/index.ts and the country detail component output

**Checkpoint**: User Stories 1 and 2 should both work independently.

---

## Phase 5: User Story 3 - Recover gracefully from temporary data issues (Priority: P2)

**Goal**: Provide clear feedback when country data is loading, unavailable, or incomplete.

**Independent Test**: Simulate a request failure or incomplete response and verify the UI surfaces a clear loading or error state.

### Tests for User Story 3

- [ ] T016 [P] [US3] Extend request tests in src/service/request.spec.ts to cover failed requests and incomplete provider payloads
- [ ] T017 [P] [US3] Extend or add UI tests for loading and error states in src/components/___tests__/loading.spec.tsx or the existing country component specs

### Implementation for User Story 3

- [ ] T018 [US3] Update src/components/ListCountries.tsx and src/components/Countries/InfoCountries.tsx so network failures and empty lookups render the current friendly loading or error feedback
- [ ] T019 [US3] Ensure missing values in the migrated API response are displayed as unavailable instead of blank or misleading UI in the country detail component and shared types
- [ ] T020 [US3] Document the graceful fallback behavior in specs/004-country-data-update/quickstart.md so the migration can be verified manually

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the migration, update docs, and confirm the app remains stable.

- [ ] T021 [P] Update specs/004-country-data-update/quickstart.md with exact verification steps for list browsing, detail lookup, and failure handling
- [ ] T022 [P] Update README.md or docs/PROJECT_ANALYSIS.md with a short note about the countries.dev migration and preserved country browsing experience
- [ ] T023 Run npm test -- --watchAll=false and verify the country migration flow end to end

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

- **User Story 1 (P1)**: Independent after Foundational is complete
- **User Story 2 (P2)**: Independent after Foundational is complete
- **User Story 3 (P2)**: Independent after Foundational is complete

### Parallel Opportunities

- T001 and T002 can be completed in parallel during setup
- T003, T004, and T005 can be developed in parallel after setup
- T006, T007, T011, T012, T016, and T017 can be executed in parallel within their respective stories
- T021 and T022 can be completed in parallel during polish

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2 to establish shared defensive handling
2. Deliver User Story 1 first as the MVP: preserve country browsing
3. Validate the browse experience independently before adding detail lookup and graceful failure handling

### Incremental Delivery

1. Finish foundational request and response handling
2. Deliver and validate User Story 1
3. Deliver User Story 2 for name-based detail lookup
4. Deliver User Story 3 for loading and error resilience
5. Finish polish with docs and test verification
