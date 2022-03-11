import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "./store/store"

import { ListCoutries } from "./components/ListCoutries"
import { InfoCountries } from "./components/InfoCountries"

import "./global.css"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ListCoutries />
      <InfoCountries />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
