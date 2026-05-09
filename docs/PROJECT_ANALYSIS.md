# TMX Earth - Análise Aprofundada do Projeto

## 📋 Resumo Executivo

**TMX Earth** é uma aplicação web full-stack Frontend construída em **React 18 + TypeScript** que permite pesquisar e visualizar informações detalhadas sobre países do mundo utilizando a API REST Countries.

- **Versão:** 1.3.0
- **Tipo:** Single Page Application (SPA) com Module Federation
- **Stack Principal:** React 18, Redux Toolkit, TypeScript, Webpack 5
- **APIs Externas:** [REST Countries v3.1](https://restcountries.com/)

---

## 🏗️ Arquitetura do Projeto

### Camadas de Aplicação

```
┌─────────────────────────────────────┐
│     UI Components (React)           │
│  ├─ ListCountries (Select)          │
│  ├─ InfoCountries (Details)         │
│  └─ Mount Components (Data Display) │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│   State Management (Redux Toolkit)  │
│  └─ Country Slice (country state)   │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│   API Integration Layer             │
│  ├─ Request Service (toRequestAll)  │
│  ├─ Request Service (toRequestOne)  │
│  └─ Axios Instance (api client)     │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│  REST Countries API (External)      │
│  https://restcountries.com/v3.1     │
└─────────────────────────────────────┘
```

### Estrutura de Diretórios

```
src/
├── components/              # Componentes React
│   ├── ListCountries.tsx   # Select dropdown para países
│   ├── Countries/
│   │   └── InfoCountries.tsx # Exibição de detalhes
│   ├── Load/
│   │   └── loading.tsx     # Componente de loading
│   ├── Mount/
│   │   ├── mountListCountries.tsx
│   │   └── sectionList.tsx
│   ├── Skeleton/
│   │   └── Skeleton.tsx    # Skeleton Loading (AppLoading)
│   └── ___tests__/         # Testes dos componentes
├── feature/
│   └── country/
│       └── countrySlice.ts # Redux slice
├── service/
│   ├── request.ts          # Requisições API
│   └── request.spec.ts     # Testes do serviço
├── model/
│   └── api.ts              # Configuração Axios
├── interfaces/
│   └── index.ts            # TypeScript interfaces/types
├── constants/
│   └── constants.ts        # Constantes da app
├── utils/
│   ├── alphabeticalOrder.ts
│   ├── parse-number.ts
│   └── styleScope.ts       # Shadow DOM styling
├── store/
│   └── store.ts            # Redux store
├── styles/
│   ├── global.scss         # Estilos globais
│   └── components.module.scss # Estilos modulares
├── App.tsx                 # Componente raiz
├── bootstrap.tsx           # Entry point
└── index.ts                # Main file
```

---

## 🔄 Fluxo de Dados

### 1. Inicialização da Aplicação

```typescript
// App.tsx - Configuração principal
→ Redux Provider (store)
→ React Query Provider (queryClient)
→ Shadow DOM criado para encapsulamento
→ ListCountries + InfoCountries renderizados
```

### 2. Seleção de País

```
Usuário seleciona país no <select>
    ↓
ListCountries.tsx dispara: dispatch(update(countryName))
    ↓
Redux atualiza state.country.country
    ↓
InfoCountries.tsx (useSelector) detecta mudança
    ↓
Chamada a toRequestOne(countryName)
    ↓
Rendering da informação do país
```

### 3. Carregamento Inicial de Países

```
App monta
    ↓
ListCountries.tsx executa useQuery('requestAll', toRequestAll)
    ↓
toRequestAll() faz GET /all da API
    ↓
Dados ordenados alfabeticamente
    ↓
<select> preenchido com opções
```

---

## 🛠️ Componentes Principais

### ListCountries.tsx
- **Responsabilidade:** Listar todos os países em um dropdown
- **Estados:** isError, loading (via React Query)
- **Ações:** Dispatch update() ao selecionar país
- **Dados:** Via `useQuery('requestAll', toRequestAll)`

```typescript
const { data, isError } = useQuery('requestAll', toRequestAll)
const countries = alphabeticalOrderData(data?.data ?? [])
```

### InfoCountries.tsx
- **Responsabilidade:** Exibir detalhes do país selecionado
- **Dependência:** Redux state (country)
- **Estados:** AppLoading, Warning, Error
- **Dados:** Via `toRequestOne(countryName)`

```typescript
const country = useSelector((state: ICountry) => state.country.country)
```

### MountListCountries.tsx
- **Responsabilidade:** Renderizar layout dos detalhes
- **Props:** dados completos do país
- **Subitens:** sectionList.tsx para seções específicas

### Loading.tsx
- **Responsabilidade:** Componentes de loading/erro
- **Props:** type (info, danger, warning), children (mensagem)

### Skeleton.tsx (AppLoading)
- **Responsabilidade:** Skeleton loading para UX melhorada

---

## 📦 Redux State Management

### Country Slice
```typescript
// state.country = { country: [] | string }
// Initial: { country: [] }
// Action: update(payload) → { country: payload }
```

**Mutações Disponíveis:**
- `update(value: string | [])` - Atualiza o país selecionado

**Seleção de State:**
```typescript
const country = useSelector((state: ICountry) => state.country.country)
```

---

## 🌐 Integração com API REST Countries

### Endpoints Utilizados

| Método | Endpoint | Uso |
|--------|----------|-----|
| GET | `/all` | Lista todos os países |
| GET | `/name/{country}?fullText=true` | Busca país específico |

### Axios Configuration
```typescript
// src/model/api.ts
baseURL: 'https://restcountries.com/v3.1'
timeout: 10000 (10 segundos)
```

### Request Services

**toRequestAll()** - Retorna todos os países
```typescript
{ data: CountryArray[], status: number }
```

**toRequestOne(country: string)** - Retorna país específico
```typescript
Promise<AxiosResponse<CountryArray[], Element>>
```

---

## 📊 Data Models

### ICommonName (Listagem)
```typescript
{
  name: { common: string }
  flag: string
}
```

### TListData (Detalhes Completos)
```typescript
{
  coatOfArms: { svg: string }
  flags: { svg: string }
  currencies: { [key]: { name, symbol } }
  name: { official, nativeName, common }
  capital: string
  region: string
  subregion: string
  languages: Object
  borders: []
  population: number
  area: number
  tld: []
}
```

---

## 🎨 Styling & Encapsulamento

### Shadow DOM
- **Arquivo:** `src/utils/styleScope.ts`
- **Objetivo:** Encapsular estilos da aplicação
- **Localização:** `#tmx-earth` section

```typescript
// App.tsx
const shadowRoot = sectionRef.current.attachShadow({ mode: 'open' })
// Integração com React Portal
createPortal(<App />, shadowRoot)
```

### SCSS Modules
- **Global:** `src/styles/global.scss`
- **Componentes:** `src/styles/components.module.scss`
- **Loader:** Style-loader com injeção customizada

---

## 🧪 Testes

### Estrutura de Testes
```
src/components/___tests__/
├── InfoCoutries.spec.tsx     # Testes do componente de detalhes
├── ListCoutries.spec.tsx     # Testes do componente de listagem
├── loading.spec.tsx          # Testes do loading
├── mountListCountries.spec.tsx # Testes do mount
└── __snapshots__/            # Snapshots dos testes
```

### Configuração Jest
```json
{
  "transformIgnorePatterns": ["node_modules/(?!axios)/"]
}
```

**Command:** `npm test` - Executa com coverage e sem watch

---

## 🔧 Build & Deployment

### Webpack Configuration
- **Entry:** `src/index.ts`
- **Output:** `build/` directory
- **Plugin:** HTML Webpack Plugin
- **Module Federation:** Preparado para micro-frontends

### Build Targets
- **Development:** Webpack Dev Server (Hot Module Replacement)
- **Production:** Minified bundle com code splitting

### Deployment
- **Plataforma:** GitHub Pages
- **Branch:** gh-pages
- **Homepage:** https://tjmelo.github.io/tmx-earth

**Deploy Script:**
```bash
npm run predeploy  # npm run build
npm run deploy     # gh-pages -d build
```

---

## 📚 Dependencies & Tools

### Frontend Framework
- **React 18.3.1** - UI library
- **React-DOM 18.3.1** - React rendering
- **React-Query 3.39.3** - Server state management
- **React-Redux 9.1.1** - Redux bindings

### State Management
- **@reduxjs/toolkit 2.2.3** - Redux utilities
- **Redux** - State container

### Styling
- **Bootstrap 5.3.3** - CSS framework
- **SCSS/SASS** - CSS preprocessing
- **@emotion (React, Styled)** - CSS-in-JS
- **@mui/material 6.0.2** - Material UI components

### HTTP Client
- **Axios 1.6.8** - HTTP requests

### Build & Dev Tools
- **Webpack 5.97.1** - Bundler
- **Webpack-dev-server 5.2.0** - Dev server
- **TypeScript 5.4.5** - Type checking
- **Babel 7.26.7** - JavaScript transpiler

### Testing & Quality
- **@testing-library/react 15.0.5** - Component testing
- **Jest 29.5.12** - Test runner
- **Stylelint 16.4.0** - CSS linter

---

## ⚙️ TypeScript Configuration

```typescript
{
  "target": "es5",                          // Suporta IE11+
  "lib": ["dom", "dom.iterable", "esnext"], // APIs disponíveis
  "strict": true,                           // Type checking rigoroso
  "jsx": "react-jsx",                       // JSX automático (React 17+)
  "module": "esnext",
  "moduleResolution": "node"
}
```

---

## 🚀 Performance Considerations

1. **React Query Caching** - Dados de países cacheados
2. **Code Splitting** - Module Federation ready
3. **Lazy Loading** - Suspense boundaries (Loading fallback)
4. **Shadow DOM** - Encapsulamento de estilos (sem CSS bleeding)
5. **Alphabetical Ordering** - Performante em memória

---

## 🔐 Security Notes

- **API External:** REST Countries é pública, sem auth necessária
- **Timeout:** 10s em requisições Axios
- **CORS:** Configurado para origin da API
- **Input:** Validação de country name em toRequestOne

---

## 📝 Conventions

### Naming
- Componentes: PascalCase (React)
- Arquivos: camelCase ou PascalCase
- Funções Utilitárias: camelCase com prefixo (toRequest*, alphabeticalOrder*)
- Redux Slices: Sufixo "Slice"

### File Organization
- Um componente principal por arquivo
- Testes ao lado com `.spec.tsx`
- Tipos em `interfaces/index.ts`
- Configurações em `constants/constants.ts`

### Imports
```typescript
// Preferência: absolute imports não configurados
// Relative: '../' para sair de diretórios
import { ICommonName } from '../interfaces'
```

---

## 🎯 Key Metrics

| Métrica | Valor |
|---------|-------|
| React Version | 18.3.1 |
| TypeScript Version | 5.4.5 |
| Total Componentes | 8 principais |
| Redux Slices | 1 (country) |
| API Endpoints | 2 |
| Test Files | 4 suites |
| Lines of Source Code | ~500 (est.) |

---

## 🔮 Pontos de Extensão

1. **Novos Reducers Redux** - Adicionar em `feature/` e registrar em store
2. **Novos Componentes** - Seguir padrão em `components/`
3. **Novos Endpoints API** - Expandir `service/request.ts`
4. **Novos Styles** - Usar `components.module.scss` ou `global.scss`
5. **Module Federation** - Webpack já preparado para micro-frontends
6. **Testes** - Adicionar .spec.tsx no `___tests__/` correspondente
