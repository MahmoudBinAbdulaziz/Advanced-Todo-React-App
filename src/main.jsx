import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./App.css"
import { createTheme,ThemeProvider } from '@mui/material';
import { TodoContext } from './context/todoContext.js';
const theme = createTheme({
  typography: {
    fontFamily: ['A'],
  },
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    
    <App  />
    </ThemeProvider>
  </StrictMode>,
)
