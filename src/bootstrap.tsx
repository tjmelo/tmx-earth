import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";

const appRoot = createRoot(document.getElementById("root") as HTMLElement);

appRoot.render(<App />)
