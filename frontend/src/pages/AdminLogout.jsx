import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../store/auth/action";

const AdminLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Jalankan fungsi logout
    dispatch(doLogout());
    
    // Redirect ke halaman login
    navigate("/admin-login");
  }, [dispatch, navigate]);


};

export default AdminLogout; 