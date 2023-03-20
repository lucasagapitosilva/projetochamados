import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png'

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={Logo} alt='Logo do sistema de chamados'/>
                </div>

                <form>
                    <h1>Nova conta</h1>
                    <input 
                    type='text'
                    placeholder='Seu nome'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    />
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
                    <button type='submit'>Cadastrar</button> 
                </form>

                <Link to='/'>Já possui uma conta? Faça login</Link>
            </div>
        </div>
    )
}