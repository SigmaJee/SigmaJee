import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { LoginProvider } from './LoginContext/loginContext.jsx';
import { CanSignupContext } from './components/CanGoSignup/canSignupContext.jsx';
import { UserProvider } from './UserContext/userContext.jsx';
import { TestContext } from './Test/TestContext/TestContext.jsx';
  createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TestContext>
        <LoginProvider>
          <CanSignupContext>
            <App />
          </CanSignupContext>
        </LoginProvider>
        </TestContext>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)

