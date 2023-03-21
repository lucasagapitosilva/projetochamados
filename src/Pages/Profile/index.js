import './style.css'
import Header from '../../Components/Header';
import Title from '../../Components/Title';

import { FiSettings } from 'react-icons/fi';

export default function Profile() {
    return (
        <div>
            <Header />

            <div className='content'>
                <Title name="Minha conta">
                    <FiSettings size={25} />
                </Title>
            </div>

            <h1>Página perfil</h1>
        </div>
    )
}