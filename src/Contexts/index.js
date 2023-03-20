import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    function signIn(email, password) {
        alert('Logado com Sucesso ' + email + password)
    }

    return(
        <AuthContext.Provider
        value={{
            signed: !!user,
            user,
            signIn,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}