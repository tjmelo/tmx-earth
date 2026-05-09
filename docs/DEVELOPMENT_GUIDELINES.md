# Development Guidelines - TMX Earth

## 📋 Table of Contents
1. [Project Structure & Organization](#project-structure--organization)
2. [Code Style & Standards](#code-style--standards)
3. [Feature Development Workflow](#feature-development-workflow)
4. [Component Development](#component-development)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Testing Strategy](#testing-strategy)
8. [Performance Guidelines](#performance-guidelines)
9. [Security Practices](#security-practices)
10. [Documentation Standards](#documentation-standards)

---

## 🏗️ Project Structure & Organization

### Directory Organization Principles

```
src/
├── components/          ← React UI components
├── feature/             ← Redux feature slices
├── service/             ← API & external service calls
├── model/               ← API client configuration
├── interfaces/          ← TypeScript types & interfaces
├── constants/           ← App constants & configuration
├── utils/               ← Utility functions
├── store/               ← Redux store setup
└── styles/              ← Global & module styles
```

### When to Create New Directories

| Scenario | Action | Location |
|----------|--------|----------|
| **New Component** | Create folder with index.ts | `src/components/ComponentName/` |
| **New Redux Domain** | Create feature folder | `src/feature/featureName/` |
| **New API Service** | Create file in service | `src/service/serviceName.ts` |
| **New Utility Functions** | Create file in utils | `src/utils/utilityName.ts` |
| **New Type Definition** | Add to interfaces | `src/interfaces/index.ts` |
| **New Constants** | Add to constants file | `src/constants/constants.ts` |

### File Naming Conventions

| Type | Format | Example |
|------|--------|---------|
| React Component | PascalCase | `ListCountries.tsx` |
| Utility Function | camelCase + prefix | `alphabeticalOrder.ts` |
| API Service | camelCase + prefix | `toRequestAll()` |
| Redux Slice | PascalCase + Slice suffix | `countrySlice.ts` |
| Types/Interfaces | PascalCase + T/I prefix | `TListData`, `ICountry` |
| CSS Module | camelCase + .module | `components.module.scss` |
| Test File | Same + .spec | `Component.spec.tsx` |

---

## 💻 Code Style & Standards

### TypeScript Configuration
- **Target:** ES5 (supports legacy browsers)
- **Strict Mode:** TRUE (enforced)
- **JSX Mode:** react-jsx (automatic)
- **Module Resolution:** node

### Naming Conventions

#### Components
```typescript
// PascalCase for component names
export const ListCountries = () => { ... }
export const InfoCountries = () => { ... }
export const MountListCountries = () => { ... }

// Default export for single export files
export default ListCountries
```

#### Functions & Variables
```typescript
// camelCase for functions and variables
const selectCountry = (event: React.ChangeEvent<HTMLSelectElement>) => { ... }
const countries = alphabeticalOrderData(data?.data ?? [])
```

#### Redux Actions & Selectors
```typescript
// camelCase for action creators
export const { update } = countrySlice.actions

// Descriptive names for selectors
const country = useSelector((state: ICountry) => state.country.country)
```

#### Constants
```typescript
// UPPER_SNAKE_CASE for constants
export const DEFAULT = {
    title: 'Type the name of a country'
}

export const API_TIMEOUT = 10000
export const CACHE_STALE_TIME = 300000
```

### Code Formatting Rules

#### Import Organization
```typescript
// 1. React & third-party libraries
import React, { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// 2. Internal modules (absolute if configured)
import { someFunction } from '../utils/moduleName'
import { ICountry } from '../interfaces'

// 3. Styles (last)
import './styles.scss'
```

#### Function Declaration
```typescript
// Prefer arrow functions for React components
export const MyComponent = () => {
  return <div>Content</div>
}

// Regular functions for utilities
export function helperFunction(param: string): string {
  return param.toUpperCase()
}
```

#### Conditional Rendering
```typescript
// Ternary for simple conditions
{isLoading ? <Loading /> : <Content />}

// Logical AND for presence checking
{data && <Display data={data} />}

// Early returns in functions
if (!data) return null
if (isError) return <Error />
return <Success />
```

#### Object & Array Literals
```typescript
// Multi-line objects
const user = {
  name: 'John',
  email: 'john@example.com',
  role: 'admin',
}

// Destructuring preferences
const { name, email } = user
const [first, ...rest] = array
```

### Comments & Documentation

#### JSDoc for Public Functions
```typescript
/**
 * Fetches all countries from REST Countries API
 * @returns Promise containing countries array and HTTP status
 * @throws AxiosError if API request fails
 * @example
 * const { data, status } = await toRequestAll()
 */
export const toRequestAll = async () => {
  const { data, status } = await api.get('/all')
  return { data, status }
}
```

#### Inline Comments
```typescript
// Use sparingly - code should be self-documenting
// Only explain WHY, not WHAT

// GOOD: Explains business logic
// Shadow DOM prevents CSS bleeding into parent application
const shadowRoot = sectionRef.current.attachShadow({ mode: 'open' })

// BAD: Obvious what code does
// Set loading to true
setLoading(true)
```

#### TODO & FIXME Comments
```typescript
// TODO: Implement caching strategy for countries list
// FIXME: Handle null response from API
// HACK: Temporary workaround until API is updated
```

---

## 🚀 Feature Development Workflow

### Phase 1: Planning
1. **Define Requirements**
   - What data is needed?
   - How will users interact?
   - What states need tracking?

2. **Design State Shape** (if using Redux)
   ```typescript
   {
     featureName: {
       data: [],
       loading: boolean,
       error: null | string,
     }
   }
   ```

3. **Identify API Needs**
   - New endpoints required?
   - Data transformation needed?
   - Error handling strategy?

4. **Component Hierarchy**
   - Sketch component structure
   - Identify reusable components
   - Plan prop drilling vs context

### Phase 2: Implementation

#### Step 1: Create Redux Slice (if needed)
```typescript
// src/feature/newFeature/newFeatureSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NewFeatureState {
  data: any[]
  loading: boolean
  error: string | null
}

const initialState: NewFeatureState = {
  data: [],
  loading: false,
  error: null,
}

const newFeatureSlice = createSlice({
  name: 'newFeature',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const { setLoading, setData, setError } = newFeatureSlice.actions
export default newFeatureSlice.reducer
```

#### Step 2: Register in Redux Store
```typescript
// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import countryReducer from '../feature/country/countrySlice'
import newFeatureReducer from '../feature/newFeature/newFeatureSlice'

export default configureStore({
  reducer: {
    country: countryReducer,
    newFeature: newFeatureReducer, // Add here
  }
})
```

#### Step 3: Create API Service Layer
```typescript
// src/service/newFeature.ts
import { api } from '../model/api'

export const toRequestNewFeatureData = async () => {
  try {
    const { data, status } = await api.get('/endpoint')
    return { data, status }
  } catch (error) {
    throw error
  }
}
```

#### Step 4: Create Component
```typescript
// src/components/NewFeature/NewFeature.tsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setData, setError } from '../../feature/newFeature/newFeatureSlice'
import { toRequestNewFeatureData } from '../../service/newFeature'

export const NewFeature = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector(state => state.newFeature)

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true))
      try {
        const result = await toRequestNewFeatureData()
        dispatch(setData(result.data))
      } catch (err) {
        dispatch(setError(err.message))
      }
    }
    fetchData()
  }, [dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return <div>{/* Render data */}</div>
}

export default NewFeature
```

#### Step 5: Create Tests
```typescript
// src/components/NewFeature/__tests__/NewFeature.spec.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../../store/store'
import NewFeature from '../NewFeature'

describe('NewFeature', () => {
  it('should render and fetch data', async () => {
    render(
      <Provider store={store}>
        <NewFeature />
      </Provider>
    )
    
    await waitFor(() => {
      expect(screen.getByText(/expected content/i)).toBeInTheDocument()
    })
  })
})
```

### Phase 3: Validation
- ✅ TypeScript compilation succeeds
- ✅ Tests pass (>80% coverage)
- ✅ No ESLint errors
- ✅ No accessibility issues
- ✅ Performance acceptable

---

## 🎨 Component Development

### Component Architecture

#### Presentational Component (UI Only)
```typescript
interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  disabled = false 
}) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
)
```

#### Container Component (With Logic)
```typescript
export const CountrySearchContainer = () => {
  const dispatch = useDispatch()
  const selectedCountry = useSelector(state => state.country.country)

  const handleSearch = (countryName: string) => {
    dispatch(update(countryName))
  }

  return <CountrySearch onSearch={handleSearch} />
}
```

#### Hooks-Based Component
```typescript
interface CountriesData {
  name: string
  population: number
}

export const useCountriesData = () => {
  const [countries, setCountries] = useState<CountriesData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true)
      try {
        const result = await toRequestAll()
        setCountries(result.data)
      } finally {
        setLoading(false)
      }
    }
    fetchCountries()
  }, [])

  return { countries, loading }
}
```

### Props Pattern

#### Define Interface
```typescript
interface ListCountriesProps {
  countries: ICommonName[]
  onSelect: (countryName: string) => void
  isLoading?: boolean
  error?: string | null
}
```

#### Use in Component
```typescript
export const ListCountries: React.FC<ListCountriesProps> = ({
  countries,
  onSelect,
  isLoading = false,
  error = null,
}) => {
  // Implementation
}
```

### Component Size Guidelines

| Size | Lines | When to Split |
|------|-------|---------------|
| Small | 0-50 | Self-contained feature |
| Medium | 50-150 | Multiple concerns |
| Large | 150+ | ⚠️ Split immediately |

---

## 🔄 State Management

### When to Use Redux vs Local State

| Scenario | Use | Reason |
|----------|-----|--------|
| Selected Country | Redux | Shared across multiple components |
| Form Input | useState | Local to component |
| Modal Open/Close | useState | Component-specific |
| API Response | Redux | Used by multiple features |
| Dropdown Open State | useState | Temporary UI state |
| User Authentication | Redux | Global app state |
| Theme | Redux | Persistent across routes |
| Sort Order | Local | Component feature |

### Redux Action Naming
```typescript
// Format: verb + noun
setCountry()        // Synchronous state update
setLoading()        // Boolean state
setError()          // Error state
clearData()         // Clear state
resetFilter()       // Reset to initial
fetchCountries()    // Async thunk action
```

### Selector Pattern
```typescript
// In component
const country = useSelector((state: RootState) => state.country.country)

// Or use selector function (for reusability)
export const selectCountry = (state: RootState) => state.country.country

// In component
const country = useSelector(selectCountry)
```

---

## 🌐 API Integration

### API Client Configuration
```typescript
// src/model/api.ts - Centralized Axios instance
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add interceptors for auth, logging, etc.
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)
```

### Service Layer Pattern
```typescript
// src/service/countries.ts
import { api } from '../model/api'

// Public API
export const toRequestAll = async () => {
  const { data, status } = await api.get('/all')
  return { data, status }
}

export const toRequestOne = (country: string) => {
  return api.get(`/name/${country}?fullText=true`)
}

// Private helper (if needed)
const transformCountryData = (raw: any) => {
  // Data transformation logic
  return raw
}
```

### Error Handling Strategy
```typescript
try {
  const response = await api.get('/endpoint')
  // Handle success
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // API returned error status
      const { status, data } = error.response
      if (status === 404) {
        // Country not found
      } else if (status === 500) {
        // Server error
      }
    } else if (error.request) {
      // Request made but no response (network error)
    } else {
      // Error in request setup
    }
  } else {
    // Non-Axios error
  }
}
```

### Data Caching
```typescript
// Use React Query for automatic caching
const { data, isLoading, error } = useQuery(
  'countries', // Query key
  toRequestAll, // Query function
  {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    retry: 3,
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
  }
)
```

---

## 🧪 Testing Strategy

### Test Structure
```
src/
├── components/
│   ├── MyComponent.tsx
│   ├── __tests__/
│   │   ├── MyComponent.spec.tsx      ← Test file
│   │   └── __snapshots__/            ← Snapshots
│   └── index.ts
```

### Testing Pyramid
```
        /\
       /  \  E2E Tests (few)
      /────\
     /      \  Integration Tests (moderate)
    /────────\
   /          \  Unit Tests (many)
  /____________\
```

### Unit Test Template
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../../store/store'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  // Before each test
  beforeEach(() => {
    // Setup
  })

  // Cleanup after each test
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render component correctly', () => {
    render(
      <Provider store={store}>
        <MyComponent />
      </Provider>
    )
    expect(screen.getByText(/expected/i)).toBeInTheDocument()
  })

  it('should handle user interaction', () => {
    render(
      <Provider store={store}>
        <MyComponent />
      </Provider>
    )
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(screen.getByText(/result/i)).toBeInTheDocument()
  })

  it('should handle error state', () => {
    // Setup error scenario
    render(
      <Provider store={store}>
        <MyComponent />
      </Provider>
    )
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })
})
```

### Mocking Patterns

#### Mock API Calls
```typescript
jest.mock('../service/request')
import * as requestService from '../service/request'

it('should display countries', async () => {
  requestService.toRequestAll.mockResolvedValue({
    data: [{ name: { common: 'Brazil' }, flag: '🇧🇷' }],
    status: 200,
  })

  render(<ListCountries />)
  await waitFor(() => {
    expect(screen.getByText('Brazil')).toBeInTheDocument()
  })
})
```

#### Mock Redux State
```typescript
import { configureStore } from '@reduxjs/toolkit'
import countryReducer from '../feature/country/countrySlice'

const createMockStore = (preloadedState) => {
  return configureStore({
    reducer: { country: countryReducer },
    preloadedState,
  })
}

it('should display selected country', () => {
  const mockStore = createMockStore({
    country: { country: 'Brazil' },
  })

  render(
    <Provider store={mockStore}>
      <InfoCountries />
    </Provider>
  )
})
```

### Coverage Goals
| Type | Target |
|------|--------|
| Statements | 80%+ |
| Branches | 75%+ |
| Functions | 80%+ |
| Lines | 80%+ |

---

## ⚡ Performance Guidelines

### Optimization Checklist

#### Component Optimization
- [ ] Use `React.memo` for expensive components
- [ ] Memoize callbacks with `useCallback`
- [ ] Memoize computations with `useMemo`
- [ ] Lazy load components with `React.lazy` + `Suspense`
- [ ] Split large components

#### State Management
- [ ] Normalize Redux state shape
- [ ] Use selectors to avoid unnecessary re-renders
- [ ] Avoid large object references in state
- [ ] Use reselect for memoized selectors

#### API & Data Fetching
- [ ] Implement proper caching strategy
- [ ] Paginate large datasets
- [ ] Debounce search inputs
- [ ] Cancel previous requests on new request

#### Bundle Size
- [ ] Audit dependencies: `npm ls`
- [ ] Check bundle size: `webpack-bundle-analyzer`
- [ ] Remove unused dependencies
- [ ] Use tree-shaking friendly imports

#### Image & Assets
- [ ] Use SVG for icons
- [ ] Lazy load images
- [ ] Optimize image formats (WebP, AVIF)
- [ ] Serve from CDN

### Performance Monitoring
```typescript
// Monitor component render time
const startTime = performance.now()
// ... component logic
const endTime = performance.now()
console.log(`Render time: ${endTime - startTime}ms`)

// Use React DevTools Profiler
// import { Profiler } from 'react'
// <Profiler id="list" onRender={onRenderCallback}>
```

---

## 🔐 Security Practices

### Input Validation
```typescript
// Validate user input before API calls
const validateCountryInput = (input: string): boolean => {
  if (!input || input.length === 0) return false
  if (input.length > 50) return false
  // Only alphanumeric and spaces
  return /^[a-zA-Z\s]*$/.test(input)
}

// Use in component
if (!validateCountryInput(countryName)) {
  setError('Invalid country name')
  return
}
```

### XSS Prevention
```typescript
// Always use React's built-in XSS protection
// ✅ SAFE - React escapes by default
<div>{userInput}</div>

// ❌ DANGEROUS - Only if you trust source
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// Use sanitizer for user-generated HTML
import DOMPurify from 'dompurify'
const clean = DOMPurify.sanitize(userHTML)
```

### Environment Variables
```typescript
// Store sensitive data in .env files
// REACT_APP_API_KEY=...
// REACT_APP_API_URL=...

// Use in code
const API_URL = process.env.REACT_APP_API_URL

// NEVER commit .env with secrets
```

### CSRF Protection
```typescript
// Ensure API requests use proper CORS headers
// Configure in Axios interceptors if needed
api.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  return config
})
```

---

## 📚 Documentation Standards

### README.md Structure
```markdown
# Project Name
Brief description

## Features
- Feature 1
- Feature 2

## Getting Started
Installation and setup instructions

## Project Structure
Folder organization

## Available Scripts
- npm start
- npm test
- npm run build

## API Documentation
Endpoints and usage

## Contributing
Guidelines for contributions

## License
```

### Component Documentation
```typescript
/**
 * ListCountries Component
 * 
 * Displays a dropdown select of all available countries.
 * Fetches data from REST Countries API and dispatches
 * selected country to Redux store.
 * 
 * @component
 * @example
 * return (
 *   <ListCountries />
 * )
 */
export const ListCountries = () => {
  // Implementation
}
```

### Architecture Documentation
Include:
- High-level overview
- Data flow diagrams
- Key design decisions
- Technology choices with rationale

---

## 🎓 Best Practices Summary

### DO ✅
- Write tests alongside code
- Use TypeScript strictly
- Keep components small (<100 lines)
- Document complex logic
- Follow naming conventions
- Use proper error handling
- Optimize performance
- Validate user input
- Commit frequently with clear messages
- Review code before merging

### DON'T ❌
- Use `any` type in TypeScript
- Write untested code
- Create giant components
- Mutate Redux state directly
- Ignore accessibility
- Skip error handling
- Leave console.logs in production
- Skip security considerations
- Force-push to main branch
- Commit node_modules or .env files

---

## 📞 Getting Help

When stuck:
1. Check existing code patterns
2. Review PROJECT_ANALYSIS.md
3. Check .instructions.md
4. Look at similar component/slice
5. Search for error message
6. Consult relevant documentation
7. Ask team lead if still unclear

---

**Version:** 1.0  
**Last Updated:** May 8, 2026  
**Applicable to:** TMX Earth v1.3.0+
