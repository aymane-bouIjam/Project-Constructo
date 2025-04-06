import { useContext } from 'react';
import { AuthContext } from '../backend/context/Auth';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const { userInfo } = useContext(AuthContext); 
    
    if (!userInfo) { 
        return <Navigate to='/admin' />;
    }

    return children;
};

export default RequireAuth;
