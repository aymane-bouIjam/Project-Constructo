import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(() => {
        return JSON.parse(localStorage.getItem('userInfo')) || null;
    });

    const login = (user) => {
        setUserInfo(user);
        localStorage.setItem('userInfo', JSON.stringify(user));
    };

    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={{ userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
