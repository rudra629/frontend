import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Building } from 'lucide-react';

const Hotels = () => {
  // 1. State to hold our backend data
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default fallback image
  const defaultHotelImage = 'https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=2670&auto=format&fit=crop';

  // Helper function to validate the image URL
  const getImageUrl = (url) => {
    if (url && url.startsWith('http')) {
      return url;
    }
    return defaultHotelImage;
  };

  // 2. Fetch data from Django when the component loads
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/hotels/');
        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }
        const data = await response.json();
        setHotels(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Could not load hotels. Is the Django server running?');
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24 text-xl font-semibold text-gray-600">
        Loading luxury destinations...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16 -mt-24 mb-16 px-4">
        <div className="max-w-7xl mx-auto mt-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Our Premier Hotels</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover comfort and elegance across our global locations. Select a hotel to explore available rooms and suites.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* If no hotels exist yet, show a friendly message */}
        {hotels.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-12">
            No hotels found. Add some in the Django Admin panel!
          </div>
        ) : (
          /* Hotel Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map(hotel => (
              <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-lg group flex flex-col hover:shadow-2xl transition-shadow duration-300">
                
                {/* BULLETPROOF IMAGE CONTAINER */}
                <div className="relative h-64 w-full bg-gray-200 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                    style={{ 
                      backgroundImage: `url(${getImageUrl(hotel.image_url)})` 
                    }}
                  />
                  
                  {/* Badge showing how many rooms are in this hotel */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-gray-900 shadow-sm flex items-center gap-2 text-sm z-10">
                    <Building className="w-4 h-4 text-primary" />
                    {hotel.rooms?.length || 0} Rooms
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{hotel.name}</h3>
                    <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-1 rounded min-w-max ml-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium ml-1">{hotel.star_rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mb-4 text-sm text-gray-500 border-b border-gray-100 pb-4">
                    <span className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1 text-primary"/> 
                      {hotel.location}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6 flex-1 text-sm line-clamp-3 leading-relaxed">
                    {hotel.description}
                  </p>

                  <Link 
                    to={`/hotels/${hotel.id}`}
                    className="w-full block text-center bg-gray-50 hover:bg-primary hover:text-white text-primary px-4 py-3 border border-primary/20 hover:border-primary rounded-xl font-semibold transition-all"
                  >
                    View Rooms
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;