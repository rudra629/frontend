import { 
  Users, CalendarCheck, TrendingUp, BedIcon,
  CircleDollarSign, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Total Revenue', value: '₹34,52,310', change: '+20.1%', positive: true, icon: CircleDollarSign },
    { name: 'Total Bookings', value: '356', change: '+12.5%', positive: true, icon: CalendarCheck },
    { name: 'Available Rooms', value: '12', change: '-4.2%', positive: false, icon: BedIcon },
    { name: 'Active Users', value: '2,492', change: '+18.2%', positive: true, icon: Users },
  ];

  const recentBookings = [
    { id: '#B001', name: 'Rohan Sharma', room: 'Deluxe Ocean View', status: 'Confirmed', date: 'Oct 24, 2026', amount: '₹18,000' },
    { id: '#B002', name: 'Priya Desai', room: 'Executive Suite', status: 'Pending', date: 'Oct 25, 2026', amount: '₹35,000' },
    { id: '#B003', name: 'Arjun Kapoor', room: 'Premium City View', status: 'Confirmed', date: 'Oct 26, 2026', amount: '₹12,000' },
    { id: '#B004', name: 'Sneha Singh', room: 'Family Connecting', status: 'Cancelled', date: 'Oct 27, 2026', amount: '₹25,000' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-[160px] relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-gray-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
              <stat.icon className="w-6 h-6 text-gray-400" />
            </div>
            
            <div className="relative z-10">
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <div className={`flex items-center text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.positive ? <ArrowUpRight className="w-4 h-4 mr-1"/> : <ArrowDownRight className="w-4 h-4 mr-1"/>}
                {stat.change} since last month
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
            <button className="text-sm font-medium text-primary hover:text-primary/80">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Guest</th>
                  <th className="pb-3 font-medium">Room Type</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-mono text-gray-500">{booking.id}</td>
                    <td className="py-4 font-bold text-gray-900">{booking.name}</td>
                    <td className="py-4 text-gray-600">{booking.room}</td>
                    <td className="py-4 text-gray-600">{booking.date}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 font-medium text-gray-900">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-lg p-6 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Quick Actions</h2>
            <p className="text-gray-400 text-sm mb-6">Streamline your daily administrative tasks here.</p>
            
            <div className="space-y-3">
              <button className="w-full bg-white/10 hover:bg-white/20 transition-colors px-4 py-3 rounded-xl flex items-center text-sm font-medium border border-white/5">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex justify-center items-center mr-3 text-primary">
                  <BedIcon className="w-4 h-4"/>
                </span>
                Add New Room
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 transition-colors px-4 py-3 rounded-xl flex items-center text-sm font-medium border border-white/5">
                <span className="w-8 h-8 rounded-lg bg-green-500/20 flex justify-center items-center mr-3 text-green-400">
                  <CalendarCheck className="w-4 h-4"/>
                </span>
                Manual Booking Check-in
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 transition-colors px-4 py-3 rounded-xl flex items-center text-sm font-medium border border-white/5">
                <span className="w-8 h-8 rounded-lg bg-yellow-500/20 flex justify-center items-center mr-3 text-yellow-400">
                  <TrendingUp className="w-4 h-4"/>
                </span>
                Generate Monthly Report
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <span className="text-xs text-gray-400 mt-2 block">System Status: All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
