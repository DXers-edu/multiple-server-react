import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CookiesProvider>
    </StrictMode>,
)
