import { useContext } from "react";
import { AuthContext } from '../Contexts';
import { Navigate } from 'react-router-dom';

export default function Private({ children }) {
    const { signed, loading } = useContext(AuthContext);

    if(loading){
        return(
            <div></div>
        )
    }

    if(!signed) {
        return <Navigate to={"/"}/>
    }

    return children;
}