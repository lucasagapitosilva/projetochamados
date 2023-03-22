import './style.css';
import Header from '../../Components/Header';
import Title from '../../Components/Title';

import { useState, useEffect, useContext } from 'react';
import { collection, getDoc, getDocs, doc, addDoc } from 'firebase/firestore';
import { db } from '../../Services/firebaseConnection';
import { AuthContext } from '../../Contexts';

import { FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

const docRef = collection(db, "customers")

export default function New() {

    const { user } = useContext(AuthContext);

    const [customers, setCustomers] = useState([]);
    const [loadCustomer, setLoadCustomer] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [complement, setComplement] = useState('');
    const [subject, setSubject] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');

    useEffect(() => {
        async function loadCustomers(){
            const querySnapshot = await getDocs(docRef)
            .then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().name
                    })
                })

                if(snapshot.docs.size === 0){
                    setLoadCustomer(false);
                    setCustomers([ {id: '1', nomeFantasia: 'FREELA'} ])
                    return;
                }

                setLoadCustomer(false);
                setCustomers(lista);
            })
            .catch((error) => {
                console.log(error)
                setLoadCustomer(false);
            })
        }

        loadCustomers();
    }, []);

    function handleOptionChange(e) {
        setStatus(e.target.value);
    }

    function handleCustomerSelected(e){
        setCustomerSelected(e.target.value);
    }

    function handleSubjectSelected(e){
        setSubject(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await addDoc(collection(db, "chamados"), {
            created: new Date(),
            clienteId: customers[customerSelected].id,
            userId: user.uid,
            status: status,
            assunto: subject,
            cliente: customers[customerSelected].nomeFantasia,
            complemento: complement
        })
        .then(() =>{
            toast.success("Novo chamado registrado!")
            setCustomerSelected(0);
            setSubject('Suporte');
            setComplement('');
            setStatus('Aberto')
        })
        .catch((error) => {
            console.log(error)
            toast.error("Não foi possivel registrar o chamado.")
        })
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Novo chamado">
                    <FiPlusCircle size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit}>
                        <label>Clientes</label>
                        {
                            loadCustomer ? (
                                <input type="text" disabled={true} value="Carregando..."/>
                            ) : (
                                <select value={customerSelected} onChange={handleCustomerSelected} >
                                    {customers.map((item, index) => {
                                        return(
                                            <option key={index} value={index}>{item.nomeFantasia}</option>
                                        )
                                    })}
                                </select>
                            )
                        }
                        <label>Assunto</label>
                        <select value={subject} onChange={handleSubjectSelected}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input
                                type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}
                            />
                            <span>Em Aberto</span>
                            <input
                                type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={handleOptionChange}
                                checked={status === 'Progresso'}
                            />
                            <span>Progresso</span>
                            <input
                                type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={handleOptionChange}
                                checked={status === 'Atendido'}
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            type="text"
                            placeholder="Descreva seu problema (opcional)."
                            value={complement}
                            onChange={(e) => setComplement(e.target.value)}
                        />

                        <button type="submit">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}