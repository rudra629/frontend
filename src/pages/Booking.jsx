import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, Users, Home, CheckCircle, CreditCard, Lock, ShieldCheck, UserPlus, User, Building } from 'lucide-react';

const Booking = () => {
  const [searchParams] = useSearchParams();
  
  // State for workflow and data fetching
  const [step, setStep] = useState(1);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize formData by reading URL params immediately
  const [formData, setFormData] = useState({
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    adults: searchParams.get('adults') || '1',
    children: '0',
    roomId: searchParams.get('room') || '', 
    primaryName: '',
    email: '',
    phone: '',
    additionalAdults: [],
    childrenGuests: [],
    specialRequests: ''
  });

  // 1. Sync state if URL parameters change (e.g., coming from Home page)
  useEffect(() => {
    const qRoom = searchParams.get('room');
    const qIn = searchParams.get('checkIn');
    const qOut = searchParams.get('checkOut');
    const qAdults = searchParams.get('adults');

    setFormData(prev => ({
      ...prev,
      checkIn: qIn || prev.checkIn,
      checkOut: qOut || prev.checkOut,
      adults: qAdults || prev.adults,
      roomId: qRoom || prev.roomId
    }));
  }, [searchParams]);

  // 2. Fetch Hotels and handle pre-selected logic
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/hotels/');
        if (response.ok) {
          const data = await response.json();
          setHotels(data);
          
          // Auto-select hotel if a roomId was passed in the URL
          const preRoomId = searchParams.get('room');
          if (preRoomId) {
            data.forEach(hotel => {
              const roomFound = hotel.rooms.find(r => r.id.toString() === preRoomId);
              if (roomFound) {
                setSelectedHotel(hotel.id.toString());
                setAvailableRooms(hotel.rooms);
              }
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotels();
  }, [searchParams]);

  const handleHotelChange = (e) => {
    const hotelId = e.target.value;
    setSelectedHotel(hotelId);
    const hotel = hotels.find(h => h.id.toString() === hotelId);
    setAvailableRooms(hotel ? hotel.rooms : []);
    setFormData(prev => ({ ...prev, roomId: '' })); // Reset room selection on hotel change
  };

  const getPrice = () => {
    if (!formData.roomId) return 0;
    const room = availableRooms.find(r => r.id.toString() === formData.roomId.toString());
    if (!room) return 0;

    let nights = 1;
    if (formData.checkIn && formData.checkOut) {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) nights = diffDays;
    }
    return room.price_per_night * nights;
  };

  const getSelectedRoomTitle = () => {
    const room = availableRooms.find(r => r.id.toString() === formData.roomId.toString());
    return room ? room.title : 'Selected Room';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      alert("Please log in to complete your booking.");
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/bookings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          room: formData.roomId,
          check_in: formData.checkIn,
          check_out: formData.checkOut
        })
      });

      const resData = await response.json();

      if (response.ok) {
        setStep(4);
      } else {
        alert(resData.detail || "Booking failed. Dates may be unavailable.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24 font-bold text-gray-500">Initializing Booking Engine...</div>;

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-8">
        
        {/* Left Side: Progress */}
        <div className="hidden md:block md:w-2/5 relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1574643004689-d1bd55e88d07?q=80&w=2574&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
          <div className="absolute inset-0 p-10 flex flex-col justify-between text-white">
            <div>
              <h2 className="text-3xl font-bold mb-4">Reserve Your Stay</h2>
              <p className="text-white/80">Experience world-class hospitality in our curated selection of hotels.</p>
            </div>
            <div className="space-y-6">
              {['Dates & Room', 'Guest Details', 'Payment', 'Confirmation'].map((t, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= i + 1 ? 'bg-white text-primary' : 'bg-white/20'}`}>{i + 1}</div>
                  <span className={step >= i + 1 ? 'text-white' : 'text-white/60'}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Forms */}
        <div className="w-full md:w-3/5 p-8 md:p-12">
          {step === 1 && (
            <div className="animate-in fade-in duration-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Dates & Hotel</h3>
              <form onSubmit={(e) => { e.preventDefault(); if(formData.roomId) setStep(2); else alert("Select a room!"); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center"><Building className="w-4 h-4 mr-2 text-primary" /> Destination</label>
                  <select required value={selectedHotel} onChange={handleHotelChange} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary bg-white">
                    <option value="" disabled>-- Choose Hotel --</option>
                    {hotels.map(h => <option key={h.id} value={h.id}>{h.name} - {h.location}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center"><Calendar className="w-4 h-4 mr-2 text-primary" /> In</label>
                    <input type="date" required name="checkIn" value={formData.checkIn} onChange={handleChange} className="w-full border rounded-lg p-3 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center"><Calendar className="w-4 h-4 mr-2 text-primary" /> Out</label>
                    <input type="date" required name="checkOut" value={formData.checkOut} onChange={handleChange} className="w-full border rounded-lg p-3 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-4 flex items-center"><Home className="w-4 h-4 mr-2 text-primary" /> Rooms</label>
                  {!selectedHotel ? (
                    <div className="text-center p-6 border rounded-xl text-gray-400">Select a hotel to see availability</div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto pr-2">
                      {availableRooms.map(room => (
                        <label key={room.id} className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.roomId === room.id.toString() ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-primary/50'}`}>
                          <input type="radio" name="roomId" value={room.id.toString()} checked={formData.roomId === room.id.toString()} onChange={handleChange} className="sr-only" />
                          <div className="flex justify-between font-bold"><span>{room.title}</span> <span>₹{Number(room.price_per_night).toLocaleString()}</span></div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <button type="submit" className={`w-full py-4 rounded-xl font-bold ${formData.roomId ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Continue</button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setStep(1)} className="text-gray-400">&larr; Back</button>
                <h3 className="text-2xl font-bold">Guest Details</h3>
                <div />
              </div>
              <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
                <input type="text" required name="primaryName" value={formData.primaryName} onChange={handleChange} placeholder="Full Name" className="w-full border rounded-lg p-3" />
                <input type="email" required name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border rounded-lg p-3" />
                <input type="tel" required name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full border rounded-lg p-3" />
                <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold">Secure Payment &rarr;</button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in duration-500">
              <button onClick={() => setStep(2)} className="text-gray-400 mb-4">&larr; Back</button>
              <div className="bg-gray-50 p-6 rounded-2xl border mb-6">
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="text-3xl font-bold">₹{getPrice().toLocaleString()}</p>
                <div className="mt-4 text-sm text-gray-600 border-t pt-4">
                  <p className="font-bold">{getSelectedRoomTitle()}</p>
                  <p>{formData.checkIn} to {formData.checkOut}</p>
                </div>
              </div>
              <form onSubmit={handlePayment} className="space-y-4">
                <input type="text" required placeholder="Card Number" className="w-full border rounded-lg p-3 font-mono" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" required placeholder="MM/YY" className="w-full border rounded-lg p-3 text-center" />
                  <input type="password" required placeholder="CVV" className="w-full border rounded-lg p-3 text-center" />
                </div>
                <button type="submit" disabled={isProcessing} className="w-full py-4 bg-green-600 text-white rounded-xl font-bold">
                  {isProcessing ? "Validating..." : `Pay ₹${getPrice().toLocaleString()} Now`}
                </button>
              </form>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-12 animate-in zoom-in duration-500">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">Success!</h3>
              <p className="text-gray-500 mb-8">Your luxury stay is confirmed. Check your email for details.</p>
              <Link to="/my-bookings" className="inline-block bg-primary text-white px-10 py-3 rounded-full font-bold shadow-lg">View History</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;