import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCC7LqjgG-czeQtgMudmQC4939TL8hknQk",
    authDomain: "modulo26aula02projetochamados.firebaseapp.com",
    projectId: "modulo26aula02projetochamados",
    storageBucket: "modulo26aula02projetochamados.appspot.com",
    messagingSenderId: "568764611419",
    appId: "1:568764611419:web:13300f43637cbc3766f87e",
    measurementId: "G-GLVCN7YR57"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage }; 