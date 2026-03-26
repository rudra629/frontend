import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle2, Quote, Calendar, Users } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  // 1. State to hold the search criteria
  const [searchData, setSearchData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1'
  });

  // 2. Function to handle the "Check Availability" click
  const handleCheckAvailability = (e) => {
    e.preventDefault();
    if (!searchData.checkIn || !searchData.checkOut) {
      alert("Please select your check-in and check-out dates first.");
      return;
    }

    // This redirects the user to /booking and attaches the dates to the URL
    const queryParams = new URLSearchParams({
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      adults: searchData.guests
    }).toString();

    navigate(`/booking?${queryParams}`);
  };

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 motion-safe:animate-[pulse_20s_ease-in-out_infinite_alternate]"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-c6a4d27ce66b?q=80&w=2670&auto=format&fit=crop")' }}
        />

        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-primary font-medium tracking-widest uppercase mb-4 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
            Welcome to Paradise
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight opacity-0 animate-[fadeInUp_1s_ease-out_0.3s_forwards]">
            Experience Luxury <br /> Like Never Before
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
            Discover the perfect blend of comfort, elegance, and world-class hospitality right in the heart of the city.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_forwards]">
            <Link 
              to="/booking" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(197,168,128,0.4)]"
            >
              Book Your Stay
            </Link>
            <Link 
              to="/rooms" 
              className="bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-full font-medium text-lg transition-all"
            >
              Explore Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Form Widget - NOW FUNCTIONAL */}
      <section className="relative z-30 -mt-16 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-4 items-end backdrop-blur-xl bg-white/95 border border-gray-100">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary" /> Check In
            </label>
            <input 
              type="date" 
              name="checkIn"
              value={searchData.checkIn}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary" /> Check Out
            </label>
            <input 
              type="date" 
              name="checkOut"
              value={searchData.checkOut}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Users className="w-4 h-4 mr-2 text-primary" /> Guests
            </label>
            <select 
              name="guests"
              value={searchData.guests}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="1">1 Adult</option>
              <option value="2">2 Adults</option>
              <option value="3">3 Adults</option>
              <option value="4">4 Adults</option>
            </select>
          </div>
          <button 
            onClick={handleCheckAvailability}
            className="w-full md:w-auto bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-0.5 shadow-lg h-[50px]"
          >
            Check Availability
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -ml-10 -mt-10"></div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop" 
                  alt="Hotel Entrance" 
                  className="rounded-3xl object-cover h-64 w-full shadow-lg transform translate-y-8"
                />
                <img 
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2670&auto=format&fit=crop" 
                  alt="Hotel Pool" 
                  className="rounded-3xl object-cover h-80 w-full shadow-xl"
                />
              </div>
            </div>
            
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full font-medium text-sm">
                About Luxe Hotel
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                A Legacy of <br/> Exceptional Hospitality
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Since our grand opening, Luxe Hotel has remained the crown jewel of the city, offering a curated experience that transcends ordinary luxury. Our commitment to flawless service and exquisite design ensures every moment of your stay is nothing short of majestic.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div>
                  <h3 className="text-3xl font-bold text-primary mb-1">5+</h3>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Restaurants</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-primary mb-1">200+</h3>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Luxury Rooms</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-primary mb-1">15+</h3>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Spa Treatments</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-primary mb-1">24/7</h3>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Concierge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase mb-2 block">Accommodations</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Rooms</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Experience our most popular accommodations, carefully designed to provide the ultimate comfort and aesthetic brilliance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Room Card 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2670&auto=format&fit=crop" 
                  alt="Deluxe Ocean View" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-gray-900 shadow-sm">
                  ₹18,000/night
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Deluxe Ocean View</h3>
                  <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-1 rounded-md">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold ml-1">4.9</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Spacious luxury room with breathtaking panoramic views of the ocean, premium bedding, and a private balcony.
                </p>
                <Link to="/booking" className="flex items-center text-primary font-bold hover:text-primary/80 transition-colors group/link">
                  Reserve Room <ArrowRight className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Room Card 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2670&auto=format&fit=crop" 
                  alt="Executive Suite" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-gray-900 shadow-sm">
                  ₹35,000/night
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Executive Suite</h3>
                  <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-1 rounded-md">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold ml-1">5.0</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our signature suite featuring a separate living area, marble bathroom with a deep soaking tub, and VIP club access.
                </p>
                <Link to="/booking" className="flex items-center text-primary font-bold hover:text-primary/80 transition-colors group/link">
                  Reserve Room <ArrowRight className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Room Card 3 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1631049307264-da0ec4d701c4?q=80&w=2670&auto=format&fit=crop" 
                  alt="Premium City View" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-gray-900 shadow-sm">
                  ₹12,000/night
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Premium City View</h3>
                  <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-1 rounded-md">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold ml-1">4.8</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Modern design meets comfort in this stylish room offering stunning skyline views of the vibrant city center.
                </p>
                <Link to="/booking" className="flex items-center text-primary font-bold hover:text-primary/80 transition-colors group/link">
                  Reserve Room <ArrowRight className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/rooms" className="inline-flex items-center text-gray-600 hover:text-gray-900 font-semibold border-b-2 border-primary pb-1 transition-colors">
              View All Accommodations
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery & Other Sections remain the same */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase mb-2 block">Moments to Remember</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explore Our World</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="https://images.unsplash.com/photo-1541971875076-8f970d573be6?q=80&w=2574&auto=format&fit=crop" alt="Gallery 1" className="rounded-2xl h-64 w-full object-cover md:col-span-2 md:row-span-2 md:h-full hover:opacity-90 transition-opacity cursor-pointer" />
            <img src="https://images.unsplash.com/photo-1551882547-ff40eb0d1b73?q=80&w=2674&auto=format&fit=crop" alt="Gallery 2" className="rounded-2xl h-64 w-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
            <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2670&auto=format&fit=crop" alt="Gallery 3" className="rounded-2xl h-64 w-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
            <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop" alt="Gallery 4" className="rounded-2xl h-64 w-full object-cover md:col-span-2 hover:opacity-90 transition-opacity cursor-pointer" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-primary rounded-3xl transform rotate-3 scale-105"></div>
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2670&auto=format&fit=crop" 
                alt="Spa Services" 
                className="relative z-10 rounded-3xl shadow-2xl object-cover h-[500px] w-full"
              />
            </div>
            <div className="flex-1 space-y-6">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-primary font-semibold tracking-wider uppercase text-sm border border-white/10">Special Offer</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Weekend Spa <br/> Getaway</h2>
              <p className="text-lg text-gray-300">Escape the daily grind with our exclusive weekend package including 2 nights and massage.</p>
              <div className="pt-8">
                <Link to="/offers" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold flex justify-center w-full sm:w-auto sm:inline-flex items-center transition-all shadow-lg">
                  Claim Your Offer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Guest Experiences</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Absolutely phenomenal experience. The attention to detail left me amazed.", author: "Priya Desai", role: "Travel Blogger" },
              { text: "The conference facilities are state-of-the-art and staff are great.", author: "Rohan Sharma", role: "Director, TechFlow India" },
              { text: "The hospitality is unmatched, the spa package was heavenly.", author: "Arjun Kapoor", role: "Verified Guest" }
            ].map((review, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-3xl relative">
                <Quote className="w-12 h-12 text-primary/20 absolute top-8 right-8" />
                <p className="text-gray-700 leading-relaxed mb-8 italic">"{review.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary mr-4">{review.author.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.author}</h4>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;