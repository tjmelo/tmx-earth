<!--
Sync Impact Report
Version change: initial draft -> 1.0.0
Modified principles: placeholders -> 5 concrete core principles
Added sections: Additional Constraints, Development Workflow
Removed sections: none
Templates requiring updates: .specify/templates/plan-template.md ⚠ no changes required, .specify/templates/spec-template.md ⚠ no changes required, .specify/templates/tasks-template.md ⚠ no changes required
Follow-up TODOs: none
-->

# TMX Earth Constitution

## Core Principles

### I. Modern React Architecture
Every feature is implemented with React 19, TypeScript, Vite, and Material Design principles. Components must be composable, decoupled, and predictable; state and effects are explicit, and feature responsibilities are separated so the UI can scale without architecture rewrites.

### II. Type Safety and Maintainability
All code MUST be authored with strict TypeScript types, explicit public contracts, and exhaustive handling for union values. APIs, component props, and shared state flows MUST be typed and documented so the compiler finds integration gaps before runtime.

### III. Scalable Component Organization
The repository MUST separate design-system assets, feature modules, shared utilities, and tests. UI components, domain logic, and styling MUST live in clearly named directories with centralized Material Design theme and token definitions to avoid inconsistent styling drift.

### IV. UX Consistency and Accessibility
The application MUST follow Material Design patterns consistently and deliver accessible interactions. Controls MUST support keyboard navigation, visible focus states, and WCAG-compliant contrast; accessibility regressions MUST be resolved before merge.

### V. Quality, Testing & Delivery
Every change MUST include automated verification appropriate to its scope. Unit tests cover logic, component tests cover UI behavior, and integration or end-to-end tests cover user journeys; PRs MUST demonstrate passing build, lint, and relevant test coverage.

## Additional Constraints
The project MUST use React 19, TypeScript, Vite, and Material UI for new development. New code MUST avoid legacy Webpack configuration or non-Material UI component libraries unless approved for a specific, documented exception. Production bundles MUST remain optimized for fast country lookup and responsive experience.

## Development Workflow
Work MUST proceed in small, story-driven increments with feature branches named for tasks or user stories. Every pull request MUST include a description, linked task/story, review-ready tests, and a compliance checklist for design, accessibility, and performance. Merge approval requires peer review, passing automated checks, and explicit justification for any deviation from this constitution.

## Governance
This constitution is the authoritative guide for architecture, quality, and delivery decisions in TMX Earth. Amendments require a documented change summary, review by the project maintainer(s), and a version update in this file. Compliance is verified during PR review and via the project’s workflow documentation.

**Version**: 1.0.0 | **Ratified**: 2026-07-11 | **Last Amended**: 2026-07-11
