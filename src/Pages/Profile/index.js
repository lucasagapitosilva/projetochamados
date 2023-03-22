import './style.css'
import Header from '../../Components/Header';
import Title from '../../Components/Title';
import avatar from '../../assets/avatar.png'
import { FiSettings, FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts';

import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../Services/firebaseConnection';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function Profile() {

    const { user, setUser, logout, userStorage } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imagemAvatar, setImagemAvatar] = useState(null);
    const [name, setName] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);

    function handleImage(e) {
        const image = e.target.files[0];

        if(image){
            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImagemAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))
            } else {
                toast.error('Envie uma imagem do tipo PNG ou JPEG')
                setImagemAvatar(null);
                return;
            }
        }
    }

    async function handleUpload(){
        const currentUid = user.uid;
        const uploadRef = ref(storage, `images/${currentUid}/${imagemAvatar.name}`)
        const uploadTask = uploadBytes(uploadRef, imagemAvatar)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref)
            .then(async (downloadURL) => {
                let urlFoto = downloadURL;

                const docRef = doc(db, "users", currentUid);
                await updateDoc(docRef, {
                    avatarUrl: urlFoto,
                    nome: name,
                })
                .then(() => {
                    let data = {
                        ...user,
                        nome: name,
                        avatarUrl: urlFoto,
                    }
                    
                    setUser(data);
                    userStorage(data);
                    setImagemAvatar(data);
                    toast.success('Perfil atualizado com sucesso!');
                })
            })
        })
    }

    async function handleSubmit(e){
        e.preventDefault();

        if(imagemAvatar === null && name !== ''){
            const docRef = doc(db, "users", user.uid)
            await updateDoc(docRef, {
                nome: name,
            })
            .then(() => {
                let data = {
                    ...user,
                    nome: name
                }
                
                setUser(data);
                userStorage(data);
                toast.success('Nome alterado com sucesso!')
            })
        } else if (imagemAvatar !== null && name !== '') {
            handleUpload();
        }
    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name="Minha conta">
                    <FiSettings size={25} />
                </Title>
            
                <div className='container'>
                    <form className='form-profile' onSubmit={handleSubmit}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color="#FFF" size={25}/>
                            </span>

                            <input type="file" accept="image/*" onChange={handleImage}/><br/>
                            {avatarUrl === null ? (
                                <img src={avatar} alt="Foto de perfil" width={250} height={250}/>
                            ) : (
                                <img src={avatarUrl} alt="Foto de perfil" width={250} height={250}/>
                            )}
                        </label>

                        <label>Nome</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        <label>Email</label>
                        <input type="email" value={email} disabled={true}/>
                        <button type="submit">Salvar</button>
                    </form>
                </div>

                <div className='container'>
                    <button className='logout-btn' onClick={logout}>Sair</button>
                </div>
            </div>

        </div>
    )
}