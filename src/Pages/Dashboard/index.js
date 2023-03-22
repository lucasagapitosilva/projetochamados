import './style.css'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts';
import { Link } from 'react-router-dom';

import Header from '../../Components/Header';
import Title from '../../Components/Title';

import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi';

export default function Dashboard() {

    const { logout } = useContext(AuthContext);

    async function handleLogout() {
        logout();
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Tickets">
                    <FiMessageSquare size={25} />
                </Title>

                <>
                    <Link to="/new" className="new">
                        <FiPlus color="#FFF" size={25} />
                        Novo chamado
                    </Link>

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">Assunto</th>
                                <th scope="col">Status</th>
                                <th scope="col">Cadastrado em</th>
                                <th scope="col">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Cliente">Mercado esquina</td>
                                <td data-label="Assunto">Suporte</td>
                                <td data-label="Status">
                                    <span className="badge" style={{ backgroundColor: '#999' }}>Em aberto</span>
                                </td>
                                <td data-label="Cadastrado">22/03/2023</td>
                                <td data-label="#">
                                    <button className="action" style={{ backgroundColor: '#3583F6' }}>
                                        <FiSearch color="#FFF" size={25} />
                                    </button>
                                    <button className="action" style={{ backgroundColor: '#F6A935' }}>
                                        <FiEdit2 color="#FFF" size={25} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            </div>
        </div>
    )
}