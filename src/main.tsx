
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './lib/theme.tsx'
import { AuthProvider } from './hooks/useAuth'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark">
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);
