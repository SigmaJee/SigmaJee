import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LoginProvider } from './LoginContext/loginContext.jsx'
import { CanSignupContext } from './components/CanGoSignup/canSignupContext.jsx'
createRoot(document.getElementById('root')).render(

    <LoginProvider>
        <CanSignupContext>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
      </CanSignupContext>
    </LoginProvider>

)
