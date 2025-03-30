import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const UserProtectedRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);

    if (!auth || !auth.token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(auth.token);
        if (decoded.role !== 'Penyewa' && decoded.role !== 'Pemilik') {
            return <Navigate to="/login" />;
        }
    } catch (error) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default UserProtectedRoute; 