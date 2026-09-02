# API Contract — Country Data Source

## Summary

The application must continue to support country browsing and name-based lookup after switching to the new `countries.dev` data source.

## Endpoints

### List countries

- Method: `GET`
- Path: `/countries`
- Expected response: an array of country objects

### Lookup a country by name

- Method: `GET`
- Path: `/countries/name/{country}`
- Expected response: an array of country objects for the provided name

## Compatibility requirements

The app should preserve the existing displayed fields currently consumed by the UI:

- `name.common`
- `population`
- `area`
- `region`
- `flags.svg`
- `cca3`

If any of these values are missing from the provider response, the UI should treat them as unavailable rather than rendering broken content.

## Error handling

- Network failures should surface the existing loading or error state.
- A lookup that returns no matching entry should yield a clear no-result state.
- The client should not assume every field exists in every response payload.

## Verification

Use the quickstart flow to verify that list browsing, name-based lookup, and graceful failure handling all work with the updated API.
