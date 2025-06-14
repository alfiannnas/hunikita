import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const AdminProtectedRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);

    if (!auth || !auth.token) {
        return <Navigate to="/admin-login" />;
    }

    try {
        const decoded = jwtDecode(auth.token);
        if (decoded.role !== 'Admin') {
            return <Navigate to="/admin-login" />;
        }
    } catch (error) {
        return <Navigate to="/admin-login" />;
    }

    return children;
};

export default AdminProtectedRoute; 