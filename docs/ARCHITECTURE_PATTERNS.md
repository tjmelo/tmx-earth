# TMX Earth - Architecture Patterns & Feature Roadmap

## 🏗️ Architecture Patterns

### 1. Data Flow Architecture

```
┌─────────────────────────────────────────────────────┐
│                  USER INTERFACE                     │
│        (ListCountries, InfoCountries, Mount)        │
└──────────────────────┬──────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────┐
│              REDUX STORE (State)                    │
│      ┌──────────────────────────────────────┐       │
│      │ country: {                           │       │
│      │   country: string | []               │       │
│      │ }                                    │       │
│      └──────────────────────────────────────┘       │
└──────────────────────┬──────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────┐
│           SELECTORS & HOOKS (React Query)           │
│      (useSelector, useQuery, useMemo)               │
└──────────────────────┬──────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────┐
│             SERVICE LAYER (API Calls)               │
│      (toRequestAll, toRequestOne)                   │
└──────────────────────┬──────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────┐
│         EXTERNAL API (REST Countries)               │
│     (https://restcountries.com/v3.1)               │
└─────────────────────────────────────────────────────┘
```

### 2. Component Hierarchy

```
App (Root)
├── Provider (Redux)
├── QueryClientProvider (React Query)
└── [Shadow DOM Container]
    ├── ListCountries (Select Component)
    │   ├── Loading
    │   ├── Error
    │   └── <select>
    │       └── OptionsCountry (Children)
    │
    └── InfoCountries (Details Component)
        ├── AppLoading (Skeleton)
        ├── Loading
        ├── Error
        └── MountListCountries
            ├── sectionList
            └── [Country Details Components]
```

### 3. State Management Pattern

```
REDUX FLOW:
──────────

Action → Reducer → State Update → Selector → Component Re-render
  ↓        ↓           ↓           ↓
[Dispatch] [Pure Fn] [Immutable] [Memoized]

EXAMPLE:
--------
dispatch(update('Brazil'))
    ↓
countrySlice.reducers.update(state, action)
    ↓
state.country.country = 'Brazil'
    ↓
useSelector(state => state.country.country)
    ↓
InfoCountries component updates
```

### 4. API Integration Pattern

```
Component
    ↓
useQuery / useEffect
    ↓
toRequestOne / toRequestAll
    ↓
api.get() [Axios Instance]
    ↓
REST Countries API
    ↓
Response / Error
    ↓
Transform Data
    ↓
dispatch(setData) or setState
    ↓
Component Re-render
```

---

## 🔄 Common Feature Patterns

### Pattern 1: Filter/Search Feature

```typescript
// Step 1: Add to Redux
interface FilterState {
  searchTerm: string
  filterType: 'region' | 'capital' | 'all'
  results: Country[]
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload
    },
    setResults: (state, action) => {
      state.results = action.payload
    },
  },
})

// Step 2: Create Service
export const toRequestFiltered = async (query: string, type: string) => {
  const { data } = await api.get(buildEndpoint(query, type))
  return data
}

// Step 3: Create Component
export const FilterCountries = () => {
  const dispatch = useDispatch()
  const { searchTerm } = useSelector(state => state.filter)
  
  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term))
    // Fetch filtered data
  }
  
  return <SearchInput onChange={handleSearch} />
}
```

### Pattern 2: Comparison Feature

```typescript
// Step 1: Track Multiple Countries
interface ComparisonState {
  selectedCountries: Country[]
  comparisonMode: boolean
}

// Step 2: Toggle Comparison
const toggleComparison = (country: Country) => {
  // Add/remove from array
  // Max 3-5 countries
}

// Step 3: Display Side-by-Side
<ComparisonTable countries={selectedCountries} />
```

### Pattern 3: Favorites/Bookmarks

```typescript
// Use LocalStorage + Redux
interface FavoritesState {
  favoriteIds: string[]
}

// Action to add/remove
export const toggleFavorite = (countryId: string) => {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

// Persist & Hydrate
useEffect(() => {
  const saved = localStorage.getItem('favorites')
  if (saved) dispatch(setFavorites(JSON.parse(saved)))
}, [])
```

### Pattern 4: Sort/Order Feature

```typescript
interface SortState {
  sortBy: 'name' | 'population' | 'area' | 'density'
  sortOrder: 'asc' | 'desc'
}

const sortCountries = (countries: Country[], sortBy: string, order: string) => {
  return [...countries].sort((a, b) => {
    const aVal = a[sortBy]
    const bVal = b[sortBy]
    return order === 'asc' ? aVal - bVal : bVal - aVal
  })
}
```

---

## 🚀 Feature Roadmap & Implementation Ideas

### Phase 1: Core Enhancements (Priority: HIGH)

#### Feature 1.1: Advanced Search & Filters
**Description:** Allow filtering countries by region, subregion, capital, language  
**Complexity:** Medium  
**Time Estimate:** 2-3 days

**Implementation Path:**
1. Add `FilterState` to Redux
2. Create `FilterCountries` component
3. Add filter endpoints to service
4. Update `ListCountries` with filter UI
5. Add tests for filter logic

**API Endpoints:**
- `/region/{region}` - Countries by region
- `/subregion/{subregion}` - Countries by subregion
- `/capital/{capital}` - Countries by capital
- `/lang/{lang}` - Countries by language

**Files to Modify/Create:**
```
src/
├── feature/filter/filterSlice.ts (NEW)
├── service/filter.ts (NEW)
├── components/FilterCountries/ (NEW)
│   ├── FilterCountries.tsx
│   ├── RegionFilter.tsx
│   ├── LanguageFilter.tsx
│   └── __tests__/FilterCountries.spec.tsx
└── interfaces/index.ts (UPDATE)
```

#### Feature 1.2: Comparison Mode
**Description:** Compare 2-3 countries side by side  
**Complexity:** Medium  
**Time Estimate:** 3-4 days

**Implementation Path:**
1. Add `ComparisonState` to Redux
2. Create `ComparisonView` component
3. Add toggle comparison to country card
4. Display comparison table/cards
5. Add tests

**Files to Modify/Create:**
```
src/
├── feature/comparison/comparisonSlice.ts (NEW)
├── components/ComparisonView/ (NEW)
│   ├── ComparisonView.tsx
│   ├── ComparisonTable.tsx
│   └── __tests__/ComparisonView.spec.tsx
└── styles/components.module.scss (UPDATE)
```

#### Feature 1.3: Sort & Order
**Description:** Sort countries by population, area, name  
**Complexity:** Low  
**Time Estimate:** 1-2 days

**Implementation Path:**
1. Add `SortState` to Redux
2. Create sort selector component
3. Implement sort logic utility
4. Update list display with sorted data
5. Add tests

**Files to Modify/Create:**
```
src/
├── feature/sort/sortSlice.ts (NEW)
├── utils/sortCountries.ts (NEW)
├── components/SortSelector/ (NEW)
└── components/ListCountries.tsx (UPDATE)
```

### Phase 2: User Experience (Priority: MEDIUM)

#### Feature 2.1: Favorites/Bookmarks
**Description:** Save favorite countries to LocalStorage  
**Complexity:** Low  
**Time Estimate:** 2 days

**Implementation Path:**
1. Create favorites service with LocalStorage
2. Add `FavoritesState` to Redux
3. Create favorite button component
4. Add favorites view
5. Persist & hydrate on app load

**Key Components:**
- Favorites heart button
- Favorites list/grid view
- LocalStorage service with backup

#### Feature 2.2: Search History
**Description:** Track recently viewed countries  
**Complexity:** Low  
**Time Estimate:** 1-2 days

**Implementation Path:**
1. Add `SearchHistoryState` to Redux
2. Intercept country selections
3. Display history dropdown
4. Implement "Clear History" action

#### Feature 2.3: Export/Share
**Description:** Export country data as JSON/CSV, share via link  
**Complexity:** Medium  
**Time Estimate:** 2-3 days

**Implementation Path:**
1. Create export service (JSON, CSV)
2. Generate shareable links
3. Add export UI buttons
4. Handle URL-based country loading

**Files to Modify/Create:**
```
src/
├── service/export.ts (NEW)
├── utils/shareUrl.ts (NEW)
└── components/ExportButton/ (NEW)
```

### Phase 3: Analytics & Insights (Priority: MEDIUM)

#### Feature 3.1: Country Statistics Dashboard
**Description:** Show global statistics (population, area, etc.)  
**Complexity:** Medium  
**Time Estimate:** 3-4 days

**Implementation Path:**
1. Add data aggregation utility
2. Create `StatsState` in Redux
3. Build stats components with charts
4. Integrate chart library (Chart.js/Recharts)
5. Add caching for stats

**Possible Charts:**
- World population distribution
- Countries by region
- Average metrics by region
- Top countries by metric

#### Feature 3.2: Saved Reports
**Description:** Save custom reports with filtered data  
**Complexity:** High  
**Time Estimate:** 4-5 days

**Implementation Path:**
1. Define report schema
2. Create report builder component
3. Add save/load functionality
4. Support export of reports
5. Add report templates

### Phase 4: Advanced Features (Priority: LOW)

#### Feature 4.1: Multi-language Support
**Description:** Support multiple UI languages  
**Complexity:** Medium  
**Time Estimate:** 3-4 days

**Implementation Path:**
1. Choose i18n library (react-i18next)
2. Create translation files
3. Wrap UI strings with translation keys
4. Add language selector
5. Persist language preference

**Files to Create:**
```
src/
├── locales/
│   ├── en.json
│   ├── pt.json
│   ├── es.json
│   └── fr.json
├── i18n/config.ts
└── hooks/useTranslation.ts
```

#### Feature 4.2: Map Integration
**Description:** Display country on interactive map  
**Complexity:** High  
**Time Estimate:** 4-5 days

**Implementation Path:**
1. Choose map library (Leaflet, Mapbox)
2. Add coordinates to country data
3. Create map component
4. Add map controls and layers
5. Optimize map rendering

#### Feature 4.3: API Caching & Offline Support
**Description:** Service Worker for offline functionality  
**Complexity:** High  
**Time Estimate:** 3-4 days

**Implementation Path:**
1. Create Service Worker
2. Implement cache strategies
3. Add offline indicator
4. Handle offline API calls
5. Sync when online

---

## 📊 Feature Impact Matrix

| Feature | Complexity | Effort | Impact | Priority |
|---------|-----------|--------|--------|----------|
| Advanced Search | Medium | 3d | HIGH | 1 |
| Comparison Mode | Medium | 3d | HIGH | 2 |
| Sort & Order | Low | 1d | MEDIUM | 3 |
| Favorites | Low | 2d | MEDIUM | 4 |
| Search History | Low | 1d | LOW | 5 |
| Export/Share | Medium | 2d | MEDIUM | 6 |
| Statistics | Medium | 4d | MEDIUM | 7 |
| Multi-language | Medium | 4d | MEDIUM | 8 |
| Map Integration | High | 5d | HIGH | 9 |
| Offline Support | High | 4d | MEDIUM | 10 |

---

## 🔧 Technology Recommendations

### For New Features

| Use Case | Recommended | Alternative |
|----------|-------------|-------------|
| Filtering | Custom Redux | Redux Query |
| Data Sorting | Native JS sort | Lodash |
| Charts | Recharts | Chart.js, D3 |
| Maps | Leaflet | Mapbox, Google Maps |
| i18n | react-i18next | react-intl |
| Export | papaparse (CSV) | xlsx (Excel) |
| Offline | Workbox | Service Worker API |
| UI Components | Material-UI | Chakra UI |

### External APIs to Consider

| Service | Purpose | Cost |
|---------|---------|------|
| Nominatim (OSM) | Coordinates/Geocoding | Free |
| Wikidata | Additional country info | Free |
| Exchange Rates API | Currency conversion | Free/Paid |
| Google Translate | Text translation | Paid |

---

## 🎯 Implementation Guidelines for Features

### Before Starting Any Feature

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Design State Shape**
   - Sketch Redux state structure
   - Identify selectors needed
   - Plan actions required

3. **API Planning**
   - Identify endpoints needed
   - Plan data transformation
   - Handle errors

4. **Component Architecture**
   - Sketch component hierarchy
   - Define prop interfaces
   - Identify reusable components

5. **Test Strategy**
   - Plan unit tests
   - Plan integration tests
   - Identify edge cases

### During Implementation

1. **Start with Redux** (if state needed)
2. **Create Service Layer** (if API calls needed)
3. **Build Components** (UI layer)
4. **Add Tests** (alongside code)
5. **Document** (JSDoc, README)
6. **Performance Audit** (bundle size, render time)
7. **Security Review** (input validation, XSS)

### Before Merging

- [ ] TypeScript passes (`tsc --noEmit`)
- [ ] ESLint passes (`npm run lint` if configured)
- [ ] Tests pass with >80% coverage (`npm test`)
- [ ] No console errors/warnings
- [ ] Performance acceptable
- [ ] Accessibility audit passed
- [ ] Documentation updated
- [ ] Code reviewed by team

---

## 📚 Learning Resources for New Features

### Redux & State Management
- https://redux.js.org/
- https://redux-toolkit.js.org/
- Redux patterns for specific use cases

### React Patterns
- https://react.dev/reference
- Custom hooks documentation
- Performance optimization guides

### UI Components & Libraries
- Material-UI docs
- Bootstrap documentation
- Emotion CSS-in-JS guide

### Testing
- Jest documentation
- React Testing Library best practices
- Test coverage strategies

---

## 🔮 Future Considerations

### Scalability
- Consider breaking into feature modules
- Prepare for Redux persistence
- Plan for lazy loading
- Cache strategy for large datasets

### Maintenance
- Regular dependency updates
- Security patches
- Performance monitoring
- User feedback integration

### Deployment
- CI/CD pipeline setup
- Staging environment
- Performance monitoring
- Error tracking (Sentry)

---

## 📞 Design Decision Records (DDR)

### DDR-001: Why Shadow DOM?
**Decision:** Encapsulate component styles using Shadow DOM  
**Rationale:** Prevent CSS conflicts, enable micro-frontend support  
**Alternative Considered:** CSS-in-JS, BEM naming convention  
**Trade-offs:** Slightly more complex styling, better isolation  

### DDR-002: Redux for Country State
**Decision:** Use Redux for country selection state  
**Rationale:** Shared across multiple components, needed by InfoCountries  
**Alternative Considered:** Context API, prop drilling  
**Trade-offs:** Boilerplate code, but scalability and DevTools support  

### DDR-003: React Query for Server State
**Decision:** Use React Query for API data caching  
**Rationale:** Built-in caching, automatic refetching, error handling  
**Alternative Considered:** Redux, SWR, manual caching  
**Trade-offs:** Additional dependency, learning curve  

---

**Last Updated:** May 8, 2026  
**Applicable Version:** 1.3.0+  
**Review Frequency:** Quarterly
