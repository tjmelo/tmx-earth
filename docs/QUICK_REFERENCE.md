# TMX Earth - Quick Reference Guide

## ⚡ Quick Links to Documentation

- **Project Analysis:** [PROJECT_ANALYSIS.md](PROJECT_ANALYSIS.md)
- **AI Agent Instructions:** [.instructions.md](.instructions.md)
- **Development Guidelines:** [DEVELOPMENT_GUIDELINES.md](DEVELOPMENT_GUIDELINES.md)
- **Architecture & Features:** [ARCHITECTURE_PATTERNS.md](ARCHITECTURE_PATTERNS.md)

---

## 🎯 Project At a Glance

| Item | Value |
|------|-------|
| **Name** | TMX Earth |
| **Type** | React 18 SPA |
| **Version** | 1.3.0 |
| **Main Purpose** | Search & display country information |
| **Tech Stack** | React, TypeScript, Redux, Webpack, SCSS |
| **API** | REST Countries v3.1 |
| **Deployment** | GitHub Pages |

---

## 📁 File Location Quick Reference

```
✅ Redux Slice       → src/feature/[name]/[name]Slice.ts
✅ Component         → src/components/[Name]/[Name].tsx
✅ Test File         → src/components/[Name]/__tests__/[Name].spec.tsx
✅ API Service       → src/service/[name].ts
✅ Type Definition   → src/interfaces/index.ts
✅ Constants         → src/constants/constants.ts
✅ Utilities         → src/utils/[name].ts
✅ Component Styles  → src/styles/components.module.scss
✅ Global Styles     → src/styles/global.scss
✅ Redux Store       → src/store/store.ts
✅ Axios Config      → src/model/api.ts
```

---

## 🔨 Common Commands

```bash
# Development
npm start              # Start dev server (http://localhost:8080)
npm test               # Run tests with coverage
npm run build          # Production build
npm run serve          # Serve production build locally
npm run stylelint      # Check SCSS syntax

# Deployment
npm run predeploy      # Build before deploy
npm run deploy         # Deploy to GitHub Pages

# Git
git checkout -b feature/name   # Create feature branch
git commit -m "feat: description"
git push origin feature/name   # Push and create PR
```

---

## 🎨 Component Template

```typescript
// src/components/ComponentName/ComponentName.tsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../../styles/components.module.scss'

interface ComponentNameProps {
  prop1: string
  prop2?: boolean
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  prop1,
  prop2 = false,
}) => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.feature.data)

  return (
    <div className={styles.container}>
      {/* JSX here */}
    </div>
  )
}

export default ComponentName
```

---

## 🔄 Redux Slice Template

```typescript
// src/feature/featureName/featureNameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FeatureState {
  data: any[]
  loading: boolean
  error: null | string
}

const initialState: FeatureState = {
  data: [],
  loading: false,
  error: null,
}

const featureSlice = createSlice({
  name: 'featureName',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const { setLoading, setData, setError } = featureSlice.actions
export default featureSlice.reducer
```

**Don't forget:** Register in `src/store/store.ts`!

---

## 🌐 API Service Template

```typescript
// src/service/feature.ts
import { api } from '../model/api'
import { IFeatureData } from '../interfaces'

export const toRequestFeatureData = async (
  params?: any
): Promise<IFeatureData[]> => {
  try {
    const { data, status } = await api.get('/endpoint', { params })
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const toRequestFeatureDetail = (id: string) => {
  return api.get(`/endpoint/${id}`)
}
```

---

## 🧪 Test Template

```typescript
// src/components/ComponentName/__tests__/ComponentName.spec.tsx
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../../store/store'
import ComponentName from '../ComponentName'

describe('ComponentName', () => {
  it('should render without errors', () => {
    render(
      <Provider store={store}>
        <ComponentName prop1="test" />
      </Provider>
    )
    expect(screen.getByText(/expected/i)).toBeInTheDocument()
  })

  it('should handle user interaction', () => {
    render(
      <Provider store={store}>
        <ComponentName prop1="test" />
      </Provider>
    )
    // Add test logic
  })
})
```

---

## 📦 Key Dependencies

| Package | Version | Usage |
|---------|---------|-------|
| `react` | 18.3.1 | UI Framework |
| `react-redux` | 9.1.1 | Redux bindings |
| `@reduxjs/toolkit` | 2.2.3 | Redux utilities |
| `react-query` | 3.39.3 | Server state |
| `axios` | 1.6.8 | HTTP client |
| `typescript` | 5.4.5 | Type safety |
| `webpack` | 5.97.1 | Bundler |

---

## 🔍 Type Definitions

### Main Types (from `src/interfaces/index.ts`)

```typescript
// Country name with flag
interface ICommonName {
  name: { common: string }
  flag: string
}

// Complete country data
type TListData = {
  name: TName
  coatOfArms: { svg: string }
  flags: { svg: string }
  currencies: TCurrencies
  capital: string
  region: string
  subregion: string
  languages: Object
  borders: []
  population: number
  area: number
  tld: []
}

// Redux state shape
interface ICountry {
  country: { country: string }
}
```

---

## 🚀 Redux Usage Patterns

### Dispatch an Action
```typescript
import { useDispatch } from 'react-redux'
import { update } from '../feature/country/countrySlice'

const dispatch = useDispatch()
dispatch(update('Brazil'))
```

### Select from State
```typescript
import { useSelector } from 'react-redux'

const country = useSelector(state => state.country.country)
const data = useSelector(state => state.feature.data)
```

### Access Full State
```typescript
const state = useSelector(state => state)
```

---

## 🌐 API Usage Patterns

### Fetch All Countries (with React Query)
```typescript
import { useQuery } from 'react-query'
import { toRequestAll } from '../service/request'

const { data, isLoading, error } = useQuery(
  'requestAll',
  toRequestAll,
  { staleTime: 300000 } // 5 min cache
)
```

### Fetch Single Country
```typescript
import { toRequestOne } from '../service/request'

try {
  const response = await toRequestOne('Brazil')
  const countryData = response.data
} catch (error) {
  console.error(error)
}
```

---

## 🎯 Common Patterns

### Loading State Handler
```typescript
if (loading) return <Loading type="info">Loading...</Loading>
if (error) return <Loading type="danger">{error}</Loading>
return <Content data={data} />
```

### Conditional Rendering
```typescript
{showContent && <Component />}

{data ? <Display /> : <Placeholder />}

{data.length > 0 && <List items={data} />}
```

### Form Input Handler
```typescript
const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const value = event.target.value
  dispatch(action(value))
}

<select onChange={handleChange} defaultValue="Select">
  <option value="Select">Select a country</option>
  {countries.map((country, idx) => (
    <option key={idx} value={country.name.common}>
      {country.flag} {country.name.common}
    </option>
  ))}
</select>
```

---

## 🧩 Component Composition

### Parent → Child Props
```typescript
// Parent
<ChildComponent data={countries} onSelect={handleSelect} />

// Child
interface ChildProps {
  data: Country[]
  onSelect: (country: Country) => void
}

export const ChildComponent: React.FC<ChildProps> = ({ data, onSelect }) => {
  return (
    <select onChange={e => onSelect(e.target.value)}>
      {data.map(country => (
        <option key={country.cca2}>{country.name.common}</option>
      ))}
    </select>
  )
}
```

---

## 🎨 Styling Patterns

### Module Styles
```typescript
import styles from '../styles/components.module.scss'

<div className={styles.container}>
  <p className={styles.title}>Title</p>
</div>
```

### CSS Module Content
```scss
.container {
  display: flex;
  gap: 1rem;
  padding: 1rem;

  .title {
    font-weight: bold;
    color: #333;
  }
}
```

### Inline Styles (if needed)
```typescript
const customStyle: React.CSSProperties = {
  color: 'blue',
  fontSize: '16px',
}

<div style={customStyle}>Content</div>
```

---

## 🧪 Testing Patterns

### Render with Redux
```typescript
render(
  <Provider store={store}>
    <MyComponent />
  </Provider>
)
```

### Mock API
```typescript
jest.mock('../service/request')
import * as requestService from '../service/request'

requestService.toRequestAll.mockResolvedValue({
  data: mockData,
  status: 200,
})
```

### Check Element Exists
```typescript
expect(screen.getByText(/Brazil/i)).toBeInTheDocument()
expect(screen.getByRole('button')).toBeInTheDocument()
expect(screen.getByLabelText(/search/i)).toBeInTheDocument()
```

### User Interactions
```typescript
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()
await user.click(screen.getByRole('button'))
await user.type(screen.getByRole('textbox'), 'Brazil')
```

---

## ⚠️ Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `any` type | Proper TypeScript types |
| Mutating state | Using reducers |
| API in render | API in useEffect |
| No error handling | try/catch or .catch() |
| Unreachable code | Early returns |
| Unused imports | Clean imports |
| console.log in prod | Removed before deploy |
| No tests | Tested code (>80%) |

---

## 🔐 Security Checklist

- [ ] Validate user input before API calls
- [ ] Escape user-generated content
- [ ] No sensitive data in localStorage
- [ ] Use HTTPS for API calls
- [ ] Set proper CORS headers
- [ ] Sanitize external HTML
- [ ] No hardcoded secrets
- [ ] Validate API responses

---

## 📊 Performance Checklist

- [ ] Component size < 100 lines (split if larger)
- [ ] Memoize expensive computations
- [ ] Cache API responses
- [ ] Lazy load images
- [ ] Check bundle size
- [ ] Remove unused dependencies
- [ ] Optimize re-renders
- [ ] Monitor Core Web Vitals

---

## 🚢 Deployment Checklist

- [ ] `tsc --noEmit` passes
- [ ] `npm test` passes (>80% coverage)
- [ ] No console errors/warnings
- [ ] Build succeeds: `npm run build`
- [ ] No accessibility issues
- [ ] Performance acceptable
- [ ] Git commits are clean
- [ ] Code is documented
- [ ] Ready for code review

---

## 📞 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Tests Failing
```bash
# Run with verbose output
npm test -- --verbose

# Update snapshots if intentional
npm test -- -u
```

### TypeScript Errors
```bash
# Check for compilation errors
tsc --noEmit

# Fix if possible
npm install --save-dev typescript@latest
```

### Hot Module Replacement Not Working
```bash
# Restart dev server
npm start
```

---

## 🎓 Learning Path

### Day 1: Understand the Codebase
1. Read PROJECT_ANALYSIS.md
2. Explore folder structure
3. Review main components
4. Understand Redux setup

### Day 2: Redux Deep Dive
1. Study Redux Toolkit
2. Review countrySlice.ts
3. Understand selectors
4. Practice creating new slice

### Day 3: API Integration
1. Review API configuration
2. Study request services
3. Understand React Query
4. Practice adding endpoint

### Day 4: Component Development
1. Study existing components
2. Review component patterns
3. Practice building feature
4. Add tests

### Week 2: Feature Development
1. Pick a feature from ARCHITECTURE_PATTERNS.md
2. Plan implementation
3. Create Redux slice
4. Build components
5. Write tests
6. Deploy

---

## 🔗 Useful Links

**Official Docs:**
- React: https://react.dev/
- Redux Toolkit: https://redux-toolkit.js.org/
- React Query: https://tanstack.com/query/
- TypeScript: https://www.typescriptlang.org/
- Webpack: https://webpack.js.org/

**API Reference:**
- REST Countries: https://restcountries.com/

**Testing:**
- Jest: https://jestjs.io/
- React Testing Library: https://testing-library.com/

**Tools:**
- TypeScript Compiler: `tsc`
- ESLint: `npm run lint`
- Stylelint: `npm run stylelint`

---

## 📝 Commit Message Format

```bash
# Use conventional commits
feat: Add search filter feature
fix: Correct country name sorting
refactor: Reorganize component structure
test: Add tests for filter service
docs: Update README with new features
style: Format SCSS according to standards
perf: Optimize country list rendering
chore: Update dependencies

# Format: type(scope): subject
feat(filter): Add country search by region
```

---

## 🎯 Quick Feature Checklist

When implementing a new feature:

- [ ] Create Redux slice (if needed)
- [ ] Add types to interfaces
- [ ] Create service layer
- [ ] Build components
- [ ] Add styling
- [ ] Write tests (>80% coverage)
- [ ] Add documentation (JSDoc)
- [ ] Update CHANGELOG
- [ ] Code review ready
- [ ] Performance check

---

**Last Updated:** May 8, 2026  
**Version:** 1.3.0  
**For:** TMX Earth Project

💡 **Tip:** Use Ctrl+F (Cmd+F on Mac) to search this guide quickly!
