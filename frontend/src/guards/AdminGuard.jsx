import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

const AdminGuard = ({ children }) => {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const checkAdminAccess = () => {
            if (!auth || !auth.token) {
                navigate('/admin-login');
                return;
            }

            try {
                const decoded = jwt_decode(auth.token);
                if (decoded.role !== 'Admin') {
                    navigate('/admin-login');
                }
            } catch (error) {
                navigate('/admin-login');
            }
        };

        checkAdminAccess();
    }, [auth, navigate]);

    return children;
};

export default AdminGuard; 