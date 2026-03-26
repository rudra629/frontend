import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CreditCard, Clock, Coffee } from 'lucide-react';

const MyBookings = () => {
  const [roomBookings, setRoomBookings] = useState([]);
  const [serviceBookings, setServiceBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllBookings = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError("You must be logged in to view your bookings.");
        setLoading(false);
        return;
      }

      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        
        // Fetch BOTH Room Bookings and Service Reservations at the same time
        const [roomRes, serviceRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/bookings/', { headers }),
          fetch('http://127.0.0.1:8000/api/service-reservations/', { headers })
        ]);

        if (roomRes.ok) setRoomBookings(await roomRes.json());
        if (serviceRes.ok) setServiceBookings(await serviceRes.json());

      } catch (err) {
        setError("Cannot connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, []);

  if (loading) return <div className="min-h-screen pt-32 text-center font-bold text-xl text-gray-600">Loading your history...</div>;
  if (error) return <div className="min-h-screen pt-32 text-center font-bold text-red-500">{error}</div>;

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 mt-8">My Dashboard</h1>

        {roomBookings.length === 0 && serviceBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <h3 className="text-xl font-medium text-gray-900 mb-4">You have no reservations yet.</h3>
            <Link to="/rooms" className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition">
              Explore Luxe Hotels
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* ROOM BOOKINGS SECTION */}
            {roomBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Room Stays</h2>
                <div className="space-y-6">
                  {roomBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-md border flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 h-32 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={booking.room_details?.image_url || 'https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=2670'} alt="Room" className="w-full h-full object-cover"/>
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h2 className="text-xl font-bold">{booking.room_details?.title || 'Luxury Room'}</h2>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{booking.status}</span>
                          </div>
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-primary" /> {booking.check_in} to {booking.check_out}</div>
                            <div className="flex items-center"><CreditCard className="w-4 h-4 mr-2 text-primary" /> Total: ₹{Number(booking.total_price).toLocaleString()}</div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-4 flex items-center"><Clock className="w-3 h-3 mr-1" /> Booked on {new Date(booking.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SERVICE BOOKINGS SECTION */}
            {serviceBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Service Experiences</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {serviceBookings.map((service) => (
                    <div key={service.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-3 rounded-xl"><Coffee className="w-6 h-6 text-primary" /></div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{service.service_name}</h3>
                            <p className="text-sm text-gray-500">{service.hotel_name}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${service.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{service.status}</span>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
                        <div><strong>Date:</strong> {service.date}</div>
                        <div><strong>Time:</strong> {service.time.slice(0, 5)}</div>
                        <div><strong>Guests:</strong> {service.guests}</div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2 flex items-center"><Clock className="w-3 h-3 mr-1" /> Requested on {new Date(service.created_at).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;