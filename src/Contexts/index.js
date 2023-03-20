import { useState, createContext, useEffect } from 'react';

import { db, auth } from '../Services/firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [user, setUser] = useState(null);

    function signIn(email, password) {
        alert('Logado com Sucesso ' + email + password)
    }

    async function signUp(email, password, name) {
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            
            await setDoc(doc(db, "users", uid), {
                nome: name,
                avatarUrl: false,
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                    avatarUrl: null
                }

                setUser(data);
                setLoadingAuth(false);
            })
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        })
    }

    return(
        <AuthContext.Provider
        value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            loadingAuth
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}