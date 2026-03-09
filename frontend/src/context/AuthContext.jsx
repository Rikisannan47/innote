import { createContext, useState } from "react";

export const AuthContext = createContext(null);



export const AuthProvider = ({ children}) => {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = (token, userData) => {
        setToken(token);
        setUser(userData);
    };

    const logout = () => {
        setToken (null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{token, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
