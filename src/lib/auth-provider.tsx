

export interface ClientUserData {
    type: string;
    email: string;
    picture?: string;
    token: string;
}

import { useState, createContext, useContext, useEffect, Context } from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<ClientUserData | null>(null);

    const login = (user: ClientUserData) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    return (

        <AuthContext.Provider value={{ user, login, logout } as any} >
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return useContext(AuthContext as Context<any>) 
}
