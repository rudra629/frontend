import { useState } from 'react';
import { Trash2, Search, Mail, Phone, Calendar } from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState([
    { id: 'USR-001', name: 'Rohan Sharma', email: 'rohan.sharma@example.in', phone: '+91 98765 43210', joined: 'Oct 15, 2026', totalBookings: 2 },
    { id: 'USR-002', name: 'Priya Desai', email: 'priya.desai@example.in', phone: '+91 98765 43211', joined: 'Oct 18, 2026', totalBookings: 1 },
    { id: 'USR-003', name: 'Arjun Kapoor', email: 'arjun.k@example.in', phone: '+91 98765 43212', joined: 'Oct 20, 2026', totalBookings: 5 },
    { id: 'USR-004', name: 'Sneha Singh', email: 'sneha.s@example.in', phone: '+91 98765 43213', joined: 'Oct 22, 2026', totalBookings: 0 },
    { id: 'USR-005', name: 'Vikram Malhotra', email: 'vikram.m@example.in', phone: '+91 98765 43214', joined: 'Oct 24, 2026', totalBookings: 3 },
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-500 text-sm">View customer profiles and booking history.</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full border-gray-300 rounded-xl p-2.5 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow relative group">
            
            <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{user.name}</h3>
                <span className="text-xs font-mono text-gray-500">{user.id}</span>
              </div>
            </div>

            <div className="space-y-3 flex-1 text-sm text-gray-600 border-t border-gray-50 pt-4 mt-2">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                <span>Joined {user.joined}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
              <span className="text-gray-500">Total Bookings</span>
              <span className={`font-bold px-2.5 py-1 rounded-full text-xs ${user.totalBookings > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {user.totalBookings} times
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500">No users found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default Users;
