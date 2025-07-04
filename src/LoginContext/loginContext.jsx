import React, { useState, createContext, useContext, useEffect } from 'react';
import { use } from 'react';

const AuthContext = createContext();

export const LoginProvider = ({ children }) => {
    const isauth = localStorage.getItem("userId");
    const [user, setUser] = useState(isauth ? true : false);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
};
