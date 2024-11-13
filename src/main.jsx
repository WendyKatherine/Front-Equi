import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/common/theme.jsx'; // Importar el tema que creaste

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}> {/* Usar el tema aquí */}
    <StrictMode>
      <App />
    </StrictMode>,
  </ThemeProvider>
);
