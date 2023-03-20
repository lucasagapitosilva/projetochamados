import './style.css'
import Logo from '../../assets/logo.png'

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../Contexts'; 

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useContext(AuthContext);

    function handleSignIn(event) {
        event.preventDefault();

        if(email !== '' && password !== '') {
            signIn(email, password);
        }
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={Logo} alt='Logo do sistema de chamados'/>
                </div>

                <form onSubmit={handleSignIn}>
                    <h1>Entrar</h1>
                    <input 
                    type='text'
                    placeholder='email@email.com'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />
                    <input 
                    type='password'
                    placeholder='******'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
                    <button type='submit'>Acessar</button> 
                </form>

                <Link to='/register'>Criar uma conta</Link>
            </div>
        </div>
    )
}