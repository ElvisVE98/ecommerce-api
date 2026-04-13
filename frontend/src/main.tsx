import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)

// browserRouter es basicamente un componente que envuelve a toda la aplicación y le proporciona la capacidad de manejar rutas. Permite que la aplicación tenga diferentes URL para diferentes componentes o páginas, lo que facilita la navegación dentro de la aplicación sin recargar la página completa. Es una parte fundamental para implementar el enrutamiento en aplicaciones React.
