import './style.css'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts';

export default function Dashboard() {

    const { logout } = useContext(AuthContext);

    async function handleLogout(){
        logout();
    }

    return(
        <div>
            <h1>Página Dashboard</h1>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}