import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import KinokoLanding from './KinokoLanding.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KinokoLanding />
  </StrictMode>,
)
