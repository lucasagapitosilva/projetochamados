import Header from '../../Components/Header';
import Title from '../../Components/Title';

import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { db } from '../../Services/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';

export default function Customers(){

    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [andress, setAndress] = useState('');

    async function handleRegister(e){
        e.preventDefault();

        if(name !== '' && cnpj !== '' && andress !== ''){
            await addDoc(collection(db, "customers"), {
                name: name,
                cnpj: cnpj,
                endereco: andress
            })
            .then(() => {
                setName('');
                setCnpj('');
                setAndress('');
                toast.success("Empresa registrada !")
            })
            .catch((error) => {
                console.log(error)
                toast.error("Ops! Algo deu errado!")
            })
        } else {
            toast.error("Preencha os campos por favor !")
        }
    }

    return(
        <div>
            <Header/>1

            <div className='content'>
                <Title name="Clientes">
                    <FiUser size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Nome fantasia</label>
                        <input 
                        type="text"
                        placeholder="Nome da empresa"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                        <label>Nome fantasia</label>
                        <input 
                        type="text"
                        placeholder="Digite o CNPJ"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        />
                        <label>Nome fantasia</label>
                        <input 
                        type="text"
                        placeholder="Endereço da empresa"
                        value={andress}
                        onChange={(e) => setAndress(e.target.value)}
                        />

                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        
        </div>
    )
}