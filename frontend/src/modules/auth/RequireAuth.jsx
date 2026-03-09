import { useContext } from "react";
import {Navigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';


//Este es el componente guardián 

const RequireAuth = ({ children, role}) => {

    //Sacamos token y usuario del contexto
    const { token, user} = useContext(AuthContext);

    if (!token || !user) {
        //Lo mandamos al login
        return <Navigate to="/login" replace/>;
    }
    //Si está autenticado pero no tiene el rol requerido
    if (role && user.rol !==role) {
        return <Navigate to="/login" replace/>
    }

    //Todo Ok, renderiza lo que protege
    return children;
}

export default RequireAuth;
