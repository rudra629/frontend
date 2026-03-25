import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BedIcon, CalendarCheck, Users, LogOut, Settings, Hotel } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Rooms', path: '/admin/rooms', icon: BedIcon },
    { name: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
    { name: 'Users', path: '/admin/users', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <Hotel className="w-8 h-8 text-primary mr-2" />
          <span className="text-2xl font-bold tracking-tighter text-gray-900">LUXE ADMIN</span>
        </div>
        
        <div className="flex-1 py-6 flex flex-col gap-2 px-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 ml-4">Main Menu</p>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-bold' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link to="/admin/settings" className="flex items-center px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all font-medium">
            <Settings className="w-5 h-5 mr-3 text-gray-400" />
            Settings
          </Link>
          <Link to="/admin/login" className="flex items-center px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-medium">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-gray-800">
            {menuItems.find(m => m.path === location.pathname)?.name || 'Admin Panel'}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              A
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8 bg-gray-50/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
