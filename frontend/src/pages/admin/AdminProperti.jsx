import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const AdminProperti = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar/>
            <div className="flex-1 overflow-auto">
                <Header />
            </div>
        </div>
    );
};
    
export default AdminProperti;
  