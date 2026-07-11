import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import { ListCountries } from "./components/ListCountries"
import store from "./store/store"
import React, { Suspense, useEffect, useRef, useState } from "react"
import Loading from "./components/Load"
import InfoCountries from "./components/Countries"
import "./styles/global.scss"
import { createPortal } from "react-dom"
import { rootStyle } from "./utils/styleScope"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { createAppTheme } from "./styles/theme"
import { useAppearancePreference } from "./hooks/useAppearancePreference"

const queryClient = new QueryClient()

const AppContent = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [shadowRootRef, setShadowRootRef] = useState<ShadowRoot | null>(null)

    useEffect(() => {
        if (sectionRef.current) {
            const shadowRoot = sectionRef.current.attachShadow({ mode: 'open', delegatesFocus: true });
            const event = new CustomEvent("shadowroot-created");
            sectionRef.current.dispatchEvent(event);
            setShadowRootRef(shadowRoot)

            shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>`

            const styleElement = rootStyle();
            if (styleElement) {
                const styleElement = rootStyle();
                styleElement && shadowRoot.appendChild(styleElement);
            }
        }
    }, []);

    return (
        <section id="tmx-earth" ref={sectionRef}>
        {shadowRootRef &&
            createPortal(
                <>
                    <ListCountries />
                    <InfoCountries />
                </>,
                shadowRootRef
        )}
        </section>
    )
}

const App = () => {
    const { appearance } = useAppearancePreference()
    const theme = createAppTheme(appearance)

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Suspense 
                        fallback={<Loading type="info">Loading app!</Loading>}>
                        <AppContent />
                    </Suspense>
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    )
}

export default App
