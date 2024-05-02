import React, { lazy, Suspense } from "react"
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux"
import store from "./store/store"

import { ListCountries } from "./components/ListCountries"
import Loading from "./components/Load"
import "./styles/global.scss"

const InfoCountries = lazy(() => import("./components/Countries"))
const appRoot = createRoot(document.getElementById("root") as HTMLElement);

appRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <ListCountries />
      <Suspense 
        fallback={<Loading type="info">Loading app!</Loading>}>
        <InfoCountries />
      </Suspense>
    </Provider>
  </React.StrictMode>
)
