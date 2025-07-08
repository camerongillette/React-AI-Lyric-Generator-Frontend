import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import LyricGenerator from './LyricGenerator.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LyricGenerator />
  </StrictMode>,
)
