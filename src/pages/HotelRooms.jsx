import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Maximize, User, ArrowLeft } from 'lucide-react';

const HotelRooms = () => {
  const { id } = useParams(); // Gets the hotel ID from the URL
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        // Fetch the specific hotel. Our Django serializer automatically includes its rooms!
        const response = await fetch(`http://127.0.0.1:8000/api/hotels/${id}/`);
        if (!response.ok) throw new Error('Failed to fetch hotel details');
        
        const data = await response.json();
        setHotel(data);
        setLoading(false);
      } catch (err) {
        setError('Could not load rooms. Is the Django server running?');
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-24 text-xl font-semibold">Loading rooms...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center pt-24 text-red-500 font-semibold">{error}</div>;
  if (!hotel) return <div className="min-h-screen flex items-center justify-center pt-24">Hotel not found.</div>;

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16 -mt-24 mb-12 px-4">
        <div className="max-w-7xl mx-auto mt-16 text-center relative">
          <Link to="/rooms" className="absolute left-0 top-2 flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Hotels
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{hotel.name}</h1>
          <div className="flex justify-center items-center text-yellow-400 mb-4">
            <Star className="w-5 h-5 fill-current mr-2" />
            <span className="text-lg">{hotel.star_rating} Star Property • {hotel.location}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Available Rooms</h2>
        
        {/* Room Grid */}
        {hotel.rooms && hotel.rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotel.rooms.map(room => (
              <div key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-lg group flex flex-col hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img 
                    src={room.image_url || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2670&auto=format&fit=crop'} 
                    alt={room.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-gray-900 shadow-sm">
                    ₹{Number(room.price_per_night).toLocaleString('en-IN')} <span className="text-sm font-normal text-gray-600">/ night</span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{room.title}</h3>
                  
                  <div className="flex gap-4 mb-4 text-sm text-gray-500 border-b border-gray-100 pb-4">
                    <span className="flex items-center"><Maximize className="w-4 h-4 mr-1"/> {room.size_sqm} sqm</span>
                    <span className="flex items-center"><User className="w-4 h-4 mr-1"/> {room.capacity} Guests</span>
                  </div>

                  <p className="text-gray-600 mb-6 flex-1 text-sm line-clamp-3 leading-relaxed">
                    {room.description || "A beautiful room awaiting your stay."}
                  </p>

                  <Link 
                    to={`/booking?room=${room.id}`} 
                    className="w-full block text-center bg-gray-50 hover:bg-primary hover:text-white text-primary px-4 py-3 border border-primary/20 hover:border-primary rounded-xl font-semibold transition-all"
                  >
                    Book This Room
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">No rooms have been added to this hotel yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelRooms;