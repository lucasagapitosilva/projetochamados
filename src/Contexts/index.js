import { useState, createContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { db, auth } from '../Services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { toast } from 'react-toastify';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    async function signIn(email, password) {
        setLoadingAuth(true)

        await signInWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid
            const docRef = doc(db, 'users', uid)
            const docSnap = await getDoc(docRef)

            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
            }

            setUser(data);
            userStorage(data);
            setLoadingAuth(false)
            toast.success('Login efetuado com sucesso!')
            navigate('/dashboard')

        })
        .catch((error) => {
            console.log(error)
            setLoadingAuth(false)
            toast.error('Ops algo deu errado!')
        })

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
                userStorage(data);
                setLoadingAuth(false);
                toast.success('Seja bem-vindo! '+ name)
                navigate('/dashboard');
            })
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        })
    }

    function userStorage(data) {
        localStorage.setItem('@chamados', JSON.stringify(data));
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