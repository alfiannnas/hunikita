import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Home, Users, UserCircle, FileText, HelpCircle, UserCog, LogOut } from "lucide-react";

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: "/admin-home", label: "Dashboard", icon: LayoutGrid },
        { path: "/admin-properti", label: "Properti", icon: Home },
        { path: "/admin-pemilik-properti", label: "Pemilik Properti", icon: Users },
        { path: "/admin-penyewa", label: "Penyewa", icon: UserCircle },
        { path: "/admin-artikel", label: "Artikel", icon: FileText },
        { path: "/admin-pusat-bantuan", label: "Pusat Bantuan", icon: HelpCircle },
        { path: "/admin-profil", label: "Profil Admin", icon: UserCog },
        { path: "/admin-logout", label: "Logout", icon: LogOut },
    ];

    return (
        <div className="w-64 bg-white shadow-lg">
            <div className="p-4 border-b">
                <img src="/hunikita-logo-3.png" className="h-14 w-auto" alt="Logo" />
            </div>
            <nav className="p-4">
                <ul className="space-y-2">
                    {menuItems.map(({ path, label, icon: Icon }) => (
                        <li key={path}>
                            <Link
                                to={path}
                                className={`flex items-center p-2 rounded-lg transition ${
                                    (location.pathname === path || 
                                     (path === '/admin-profil' && location.pathname.startsWith('/admin-profil/')))
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                <span>{label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
