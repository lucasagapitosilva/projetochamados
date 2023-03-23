import './style.css';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Contexts';
import { Link } from 'react-router-dom';

import Header from '../../Components/Header';
import Title from '../../Components/Title';
import Modal from '../../Components/Modal';

import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi';
import { format } from 'date-fns';

import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore';
import { db } from '../../Services/firebaseConnection';

const listaRef = collection(db, "chamados")

export default function Dashboard() {

    const { logout } = useContext(AuthContext);

    const [called, setCalled] = useState([]);
    const [loading, setLoading] = useState(true);

    const [lastDocs, setLastDocs] = useState();
    const [loadMore, setLoadMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const [detailModal, setDetailModal] = useState();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function loadCalled() {
            const q = query(listaRef, orderBy("created", "desc"), limit(10))
            const querySnapshot = await getDocs(q)

            updateState(querySnapshot);

            setLoading(false);
        }

        loadCalled();


        return () => { }
    }, []);

    async function updateState(querySnapshot) {

        const collectionEmpty = querySnapshot.size === 0;

        if (!collectionEmpty) {
            let list = [];

            querySnapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    complemento: doc.data().complemento,
                    created: doc.data().created,
                    createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                });
            })

            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

            setCalled(called => [...called, ...list]);
            setLastDocs(lastDoc);

        } else {
            setIsEmpty(true);
        }

        setLoadMore(false);
    }


    async function handleMore() {
        setLoadMore(true);
        const q = query(listaRef, orderBy("created", "desc"), startAfter(lastDocs), limit(5))
        const querySnapshot = await getDocs(q);
        await updateState(querySnapshot);
    }


    if (loading) {
        return (
            <div>
                <Header />
                <div className="content">
                    <Title name="Tickets">
                        <FiMessageSquare size={25} />
                    </Title>

                    <div className="container dashboard">
                        <span>Buscando chamados...</span>
                    </div>
                </div>
            </div>
        )
    }

    function toggleModal(item){
        setShowModal(!showModal);
        setDetailModal(item);
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Tickets">
                    <FiMessageSquare size={25} />
                </Title>

                <>
                    {called.length === 0 ? (
                        <div className="container dashboard">
                            <span>Nenhum chamado encontrado...</span>
                            <Link to="/new" className="new">
                                <FiPlus color="#FFF" size={25} />
                                Novo chamado
                            </Link>
                        </div>
                    ) : (
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
                                    {called.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td data-label="Cliente">{item.cliente}</td>
                                                <td data-label="Assunto">{item.assunto}</td>
                                                <td data-label="Status">
                                                    <span className="badge" style={{ backgroundColor: item.status === "Aberto" ? '#5CB85C' : '#999' }}>{item.status}</span>
                                                </td>
                                                <td data-label="Cadastrado">{item.createdFormat}</td>
                                                <td data-label="#">
                                                    <button className="action" style={{ backgroundColor: '#3583F6' }} onClick={() => toggleModal(item)}>
                                                        <FiSearch color="#FFF" size={25} />
                                                    </button>
                                                    <Link to={`/new/${item.id}`} className="action" style={{ backgroundColor: '#F6A935' }}>
                                                        <FiEdit2 color="#FFF" size={25} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            {loadMore && <h3>Buscando mais chamados...</h3>}
                            {!loadMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar novos chamados</button>}
                        </>
                    )}
                </>
            </div>

            {showModal && (<Modal details={detailModal} close={() => setShowModal(!showModal)}/>)}
        </div>
    )
}