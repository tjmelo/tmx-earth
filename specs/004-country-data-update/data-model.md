# Data Model

## Entities

### Country

Represents a country returned by the data source and consumed by the application UI.

- `cca3`: string
- `name`: object with `common` string
- `flags`: object with `svg` string
- `population`: number | null
- `area`: number | null
- `region`: string | null
- `capital`: string[] | null
- `subregion`: string | null
- `currencies`: object | null
- `languages`: object | null
- `borders`: string[] | null
- `tld`: string[] | null

### Country Lookup Request

Represents a user-driven request for a specific country by name.

- `countryName`: string
- `result`: `success` | `not-found` | `error`
- `data`: Country | null

## Validation rules

- The app should accept the provider response even when optional fields are absent.
- Missing values must be rendered as unavailable instead of showing misleading or broken information.
- A lookup that returns no matches should surface a clear no-result state.

## State transitions

- `idle` -> `loading` when the list or detail request starts.
- `loading` -> `success` when data arrives.
- `loading` -> `error` when the request fails.
- `loading` -> `empty` when a lookup returns no matching result.
