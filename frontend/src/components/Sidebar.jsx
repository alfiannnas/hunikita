import {
  LayoutGrid,
  Home,
  Users,
  UserCircle,
  FileText,
  HelpCircle,
  UserCog,
  LogOut,
  Search,
  Plus
} from 'lucide-react';


const Sidebar = () => {
    return (
        <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <img src="/hunikita-logo-3.png" className="h-14 w-auto"/>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-2 text-blue-600 bg-blue-50 rounded-lg">
                <LayoutGrid className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Home className="w-5 h-5 mr-3" />
                <span>Properti</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 mr-3" />
                <span>Pemilik Properti</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <UserCircle className="w-5 h-5 mr-3" />
                <span>Penyewa</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 mr-3" />
                <span>Artikel</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <HelpCircle className="w-5 h-5 mr-3" />
                <span>Pusat Bantuan</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <UserCog className="w-5 h-5 mr-3" />
                <span>Profil Admin</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;
