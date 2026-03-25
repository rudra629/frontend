import { useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

const Rooms = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Deluxe Ocean View', type: 'Deluxe', price: 18000, status: 'Available' },
    { id: 2, name: 'Executive Suite', type: 'Suite', price: 35000, status: 'Booked' },
    { id: 3, name: 'Premium City View', type: 'Premium', price: 12000, status: 'Maintenance' },
    { id: 4, name: 'Family Connecting', type: 'Family', price: 25000, status: 'Available' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Room Management</h2>
          <p className="text-gray-500 text-sm">Add, update, or remove property rooms.</p>
        </div>
        
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search rooms..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border-gray-300 rounded-xl p-2.5 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50 text-sm"
            />
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-bold flex items-center transition-all shadow-md shrink-0 text-sm"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Room
          </button>
        </div>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Room ID</th>
                <th className="px-6 py-4 font-medium">Room Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Price/Night</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredRooms.map((room) => (
                <tr key={room.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-500">#{room.id.toString().padStart(4, '0')}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{room.name}</td>
                  <td className="px-6 py-4 text-gray-600">{room.type}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">₹{room.price.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      room.status === 'Available' ? 'bg-green-100 text-green-700' :
                      room.status === 'Booked' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {room.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10 mr-1">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRooms.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No rooms found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Room Modal (simplified demo) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Room</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
                <input type="text" className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-white">
                    <option>Standard</option>
                    <option>Deluxe</option>
                    <option>Suite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input type="number" className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-colors">
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
