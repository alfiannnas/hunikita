import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const PemilikProtectedRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);

    if (!auth || !auth.token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(auth.token);
        if (decoded.role !== 'Pemilik') {
            return <Navigate to="/home" />;
        }
    } catch (error) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default PemilikProtectedRoute; 