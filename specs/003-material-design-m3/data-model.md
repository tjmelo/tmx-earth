# Data Model: Material Design 3 Visual System

## Entities

### Visual System

Represents the shared styling contract that governs the application's interface.

- `themeMode`: `light` | `dark`
- `colorPalette`: palette object for primary, secondary, surface, background, and text colors
- `typographyScale`: heading, body, label, and caption rules
- `spacingScale`: standard spacing rhythm used across layout and component gaps
- `elevation`: shadow and surface depth values
- `shape`: border radius and component rounding rules

### UI Component

Represents a reusable interface element that follows the visual system.

- `name`: string
- `variant`: e.g. `surface`, `input`, `button`, `list`, `card`
- `state`: `default` | `hover` | `focus` | `selected` | `disabled`
- `accessibility`: focus visibility, contrast, and readability metadata
- `themeTokens`: references to the active design tokens

### Appearance Preference

Represents the user-selected light/dark mode state currently supported by the app.

- `value`: `light` | `dark`
- `persisted`: boolean
- `source`: user preference or default system behavior

## Relationships

- A `Visual System` is the source of truth for all `UI Component` styling.
- `UI Component` instances consume shared tokens from the `Visual System` instead of defining isolated ad hoc styling.
- `Appearance Preference` selects the active palette and theme mode for the `Visual System`.

## Validation rules

- The visual system must remain coherent across the main screens and core interactions.
- Updated components must preserve readable contrast and clear hierarchy.
- Theme changes must not break the existing user workflow or remove essential affordances.
- Any component that cannot match the target design exactly must degrade gracefully while preserving usability.

## State transitions

- `default` -> `hover` when pointer focus is applied to a clickable element.
- `default` -> `focus` when keyboard navigation reaches an interactive element.
- `default` -> `selected` when a list or control is activated.
- `light` <-> `dark` through the appearance toggle without affecting core application logic.
