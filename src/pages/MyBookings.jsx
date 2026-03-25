import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CreditCard, Clock, CheckCircle } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyBookings = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError("You must be logged in to view your bookings.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/bookings/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          setError("Failed to load your bookings.");
        }
      } catch (err) {
        setError("Cannot connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []);

  if (loading) return <div className="min-h-screen pt-32 text-center font-bold text-xl text-gray-600">Loading your history...</div>;
  if (error) return <div className="min-h-screen pt-32 text-center font-bold text-red-500">{error}</div>;

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 mt-8">My Booking History</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <h3 className="text-xl font-medium text-gray-900 mb-4">You have no bookings yet.</h3>
            <Link to="/rooms" className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition">
              Explore Hotels
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col md:flex-row gap-6">
                
                {/* Image Placeholder */}
                <div className="w-full md:w-48 h-32 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={booking.room_details?.image_url || 'https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=2670'} 
                    alt="Room" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold text-gray-900">{booking.room_details?.title || 'Luxury Room'}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 
                        booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        {booking.check_in} to {booking.check_out}
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2 text-primary" />
                        Total: ₹{Number(booking.total_price).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-4 flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> Booked on {new Date(booking.created_at).toLocaleDateString()}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;