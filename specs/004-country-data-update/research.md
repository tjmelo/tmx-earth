# Research: Country Data Source Migration

## Decision

Adopt the new `countries.dev` endpoints while preserving the application's existing country display contract.

## Rationale

The new API exposes the core country data needed by the app through the endpoints `/countries` and `/countries/name/{country}`. The current UI already expects fields such as `name.common`, `population`, `area`, `region`, `flags`, and `cca3`, so the migration can remain low-risk by keeping the existing response contract at the app boundary and handling missing values defensively.

## Implementation approach

- Keep the shared Axios instance in `src/model/api.ts` pointed at `https://countries.dev/`.
- Use the request helpers in `src/service/request.ts` for list and name-based lookup requests.
- Preserve the existing country fields consumed by the UI and normalize missing values to a safe fallback or unavailable state.
- Maintain current loading and error feedback through the existing React Query plus loading component flow.

## Alternatives considered

- Reworking the UI to fully match the provider's raw response schema: rejected because it would introduce unnecessary UI churn and break the existing user experience during the migration.
- Introducing a new client-side mapping layer for all providers: rejected because the app only needs to support the current migration and the existing interface is already sufficient.

## Integration notes

- Treat the downstream API response as a compatibility boundary: the app should tolerate missing or unexpected fields rather than assuming every field is present.
- Keep tests focused on the request helpers and the rendering behavior that depends on country data being present or unavailable.
- Preserve the current browse and detail lookup flows so users do not experience a different interaction model after the migration.
