import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import { ListCountries } from "./components/ListCountries"
import store from "./store/store"
import React, { Suspense, useEffect, useRef, useState } from "react"
import Loading from "./components/Load"
import InfoCountries from "./components/Countries"
import "./styles/global.scss"
import { createPortal } from "react-dom"
import shadowStyles from './styles/shadowStyles'
import { useAppearancePreference } from "./hooks/useAppearancePreference"
import DarkModeToggle from "./components/DarkModeToggle"

const queryClient = new QueryClient()

const AppContent = ({ appearance }: { appearance: string }) => {
    const sectionRef = useRef<HTMLElement>(null)
    const [shadowRootRef, setShadowRootRef] = useState<ShadowRoot | null>(null)

    useEffect(() => {
        if (sectionRef.current) {
            sectionRef.current.dataset.theme = appearance
        }
    }, [appearance])

    useEffect(() => {
        if (sectionRef.current) {
            const shadowRoot = sectionRef.current.attachShadow({ mode: 'open', delegatesFocus: true })
            const event = new CustomEvent("shadowroot-created")
            sectionRef.current.dispatchEvent(event)
            setShadowRootRef(shadowRoot)

            shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>`

            const styleElement = document.createElement('style')
            styleElement.innerHTML = shadowStyles
            shadowRoot.appendChild(styleElement)
        }
    }, [])

    return (
        <section
            id="tmx-earth"
            ref={sectionRef}
            style={{
                backgroundColor: appearance === 'dark' ? '#101418' : '#FFFBFE',
                color: appearance === 'dark' ? '#F4EFF4' : '#1D1B20',
                transition: 'background-color 200ms ease, color 200ms ease',
            }}
        >
        {shadowRootRef &&
            createPortal(
                <>
                    <div className="app-shell">
                        <header className="app-header">
                            <div className="brand-block">
                                <div className="brand-mark" aria-hidden="true">
                                    <span className="brand-mark-inner" />
                                </div>
                                <div className="brand-copy">
                                    <h1>InfoPaíses</h1>
                                    <small>Dados e informações do mundo</small>
                                </div>
                            </div>
                            <div className="header-actions">
                                <div className="theme-control-group">
                                    <DarkModeToggle />
                                    <button type="button" className="info-button" aria-label="Informações adicionais">i</button>
                                </div>
                            </div>
                        </header>
                        <ListCountries />
                        <InfoCountries />
                    </div>
                </>,
                shadowRootRef,
        )}
        </section>
    )
}

const App = () => {
    const { appearance } = useAppearancePreference()

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Suspense 
                    fallback={<Loading type="info">Loading app!</Loading>}>
                    <AppContent appearance={appearance} />
                </Suspense>
            </QueryClientProvider>
        </Provider>
    )
}

export default App
