import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
const AuthProvider = createContext();
export const CanSignupContext = ({ children }) => {
   const isValid = sessionStorage.getItem("isvalid");
   const [canSignup, setCanSignup] = useState(isValid ? true : false);
   return (
      <AuthProvider.Provider value={{ canSignup, setCanSignup }}>
         {children}
      </AuthProvider.Provider>
   );
};
export const SignupAuth = () => {
   return useContext(AuthProvider);
}