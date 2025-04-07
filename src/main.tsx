import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthorsProvider } from './context/authors.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthorsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthorsProvider>
  </StrictMode>
)
