import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, User, Maximize, Wifi, Coffee } from 'lucide-react';

const Rooms = () => {
  const [filter, setFilter] = useState('All');

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Ocean View',
      type: 'Deluxe',
      price: 18000,
      rating: 4.9,
      size: '45 sqm',
      capacity: '2 Adults',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2670&auto=format&fit=crop',
      description: 'Spacious luxury room with breathtaking panoramic views of the ocean, premium bedding, and a private balcony.',
      amenities: ['Free WiFi', 'Breakfast Included', 'Ocean View', 'Mini Bar']
    },
    {
      id: 2,
      name: 'Executive Suite',
      type: 'Suite',
      price: 35000,
      rating: 5.0,
      size: '85 sqm',
      capacity: '3 Adults',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2670&auto=format&fit=crop',
      description: 'Our signature suite featuring a separate living area, marble bathroom with a deep soaking tub, and VIP access.',
      amenities: ['Lounge Access', 'Butler Service', 'City View', 'Spa Access']
    },
    {
      id: 3,
      name: 'Premium City View',
      type: 'Premium',
      price: 12000,
      rating: 4.8,
      size: '40 sqm',
      capacity: '2 Adults',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec4d701c4?q=80&w=2670&auto=format&fit=crop',
      description: 'Modern design meets comfort in this stylish room offering stunning views of the vibrant city skyline.',
      amenities: ['Free WiFi', 'City View', 'Smart TV', 'Room Service']
    },
    {
      id: 4,
      name: 'Family Connecting Room',
      type: 'Family',
      price: 25000,
      rating: 4.7,
      size: '75 sqm',
      capacity: '4 Adults',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop',
      description: 'Perfect for families, our connecting rooms offer the perfect balance of togetherness and privacy.',
      amenities: ['Child Friendly', 'Pool View', 'Game Console', 'Kitchenette']
    },
    {
      id: 5,
      name: 'Presidential Penthouse',
      type: 'Suite',
      price: 85000,
      rating: 5.0,
      size: '200 sqm',
      capacity: '4 Adults',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop',
      description: 'The pinnacle of luxury. Taking over the entire top floor with a private pool, grand piano, and dedicated staff.',
      amenities: ['Private Pool', 'Chef', 'Helipad Access', 'Panoramic View']
    },
    {
      id: 6,
      name: 'Cozy Standard Room',
      type: 'Standard',
      price: 8000,
      rating: 4.5,
      size: '30 sqm',
      capacity: '2 Adults',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2670&auto=format&fit=crop',
      description: 'A comfortable escape featuring our signature luxury bed, work desk, and a beautifully appointed modern bathroom.',
      amenities: ['Free WiFi', 'Quiet Zone', 'Work Desk', 'Smart TV']
    }
  ];

  const filteredRooms = filter === 'All' ? rooms : rooms.filter(room => room.type === filter);
  const roomTypes = ['All', 'Standard', 'Deluxe', 'Premium', 'Suite', 'Family'];

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16 -mt-24 mb-16 px-4">
        <div className="max-w-7xl mx-auto mt-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Our Rooms & Suites</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover comfort and elegance in equal measure. Every room is designed to provide you with a peaceful sanctuary in the city.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {roomTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === type 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map(room => (
            <div key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-lg group flex flex-col hover:shadow-2xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-gray-900 shadow-sm">
                  ₹{room.price.toLocaleString('en-IN')} <span className="text-sm font-normal text-gray-600">/ night</span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                  <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-1 rounded">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium ml-1">{room.rating}</span>
                  </div>
                </div>
                
                <div className="flex gap-4 mb-4 text-sm text-gray-500 border-b border-gray-100 pb-4">
                  <span className="flex items-center"><Maximize className="w-4 h-4 mr-1"/> {room.size}</span>
                  <span className="flex items-center"><User className="w-4 h-4 mr-1"/> {room.capacity}</span>
                </div>

                <p className="text-gray-600 mb-6 flex-1 text-sm line-clamp-3 leading-relaxed">
                  {room.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <Link 
                  to="/booking" 
                  className="w-full block text-center bg-gray-50 hover:bg-primary hover:text-white text-primary px-4 py-3 border border-primary/20 hover:border-primary rounded-xl font-semibold transition-all"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
