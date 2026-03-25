import { useState } from 'react';
import { Check, X, Search, ChevronDown } from 'lucide-react';

const Bookings = () => {
  const [filter, setFilter] = useState('All');
  const [bookings] = useState([
    { id: 'B001', guest: 'Rohan Sharma', room: 'Deluxe Ocean View', checkIn: '2026-10-24', checkOut: '2026-10-27', amount: 54000, status: 'Confirmed' },
    { id: 'B002', guest: 'Priya Desai', room: 'Executive Suite', checkIn: '2026-10-25', checkOut: '2026-10-28', amount: 105000, status: 'Pending' },
    { id: 'B003', guest: 'Arjun Kapoor', room: 'Premium City View', checkIn: '2026-10-26', checkOut: '2026-10-28', amount: 24000, status: 'Confirmed' },
    { id: 'B004', guest: 'Sneha Singh', room: 'Family Connecting', checkIn: '2026-10-27', checkOut: '2026-10-30', amount: 75000, status: 'Cancelled' },
    { id: 'B005', guest: 'Vikram Malhotra', room: 'Cozy Standard', checkIn: '2026-10-28', checkOut: '2026-10-29', amount: 8000, status: 'Pending' },
  ]);

  const filteredBookings = filter === 'All' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
          <p className="text-gray-500 text-sm">Approve, reject, or view guest bookings.</p>
        </div>
        
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
          {['All', 'Pending', 'Confirmed', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === status 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Ref ID</th>
                <th className="px-6 py-4 font-medium">Guest Name</th>
                <th className="px-6 py-4 font-medium">Room Assigned</th>
                <th className="px-6 py-4 font-medium">Dates (In - Out)</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-500">#{booking.id}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{booking.guest}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.room}</td>
                  <td className="px-6 py-4 text-gray-600 font-mono text-xs">{booking.checkIn} &rarr; {booking.checkOut}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">₹{booking.amount.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center w-fit ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {booking.status === 'Confirmed' && <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"/>}
                      {booking.status === 'Pending' && <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2"/>}
                      {booking.status === 'Cancelled' && <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"/>}
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {booking.status === 'Pending' ? (
                      <div className="flex justify-end gap-2">
                        <button title="Approve" className="p-1.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors border border-green-200">
                          <Check className="w-4 h-4" />
                        </button>
                        <button title="Reject" className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-200">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                        Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No bookings found for status: {filter}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
