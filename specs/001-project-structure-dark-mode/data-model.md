# Data Model

## Entities

- Country
  - id: string (ISO code or unique id)
  - name: string
  - population: number
  - area: number | null
  - region: string | null
  - additional fields: as provided by REST Countries API

- AppearancePreference
  - key: `tmx:appearance`
  - value: `light` | `dark` | `system`
  - storage: localStorage
  - default: `light` (or `system` if you prefer following OS preference)

## Validation rules
- `value` must be one of the allowed strings.
- When reading from storage, fall back to default if value is missing or malformed.

## State transitions
- `unset` -> `light`|`dark` when user selects preference
- `light` <-> `dark` on toggles
- Optionally: `system` resolves to `light` or `dark` at runtime based on `prefers-color-scheme`
