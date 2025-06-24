import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const LoginProvider = ({ children }) => {
    const isauth = sessionStorage.getItem("email");
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
