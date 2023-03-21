import './style.css'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts';

import Header from '../../Components/Header';

export default function Dashboard() {

    const { logout } = useContext(AuthContext);

    async function handleLogout(){
        logout();
    }

    return(
        <div>
            <Header/>

            <h1>Página Dashboard</h1>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}