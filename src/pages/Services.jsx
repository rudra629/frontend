import { useState, useEffect } from 'react';
import { Coffee, Activity, Heart, Music, X, Calendar, Clock, Users, Building } from 'lucide-react';

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // NEW: State for Hotels
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    hotelId: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: ''
  });

  const services = [
    {
      id: 1, title: "Fine Dining", icon: Coffee,
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop",
      description: "Experience culinary excellence at our award-winning restaurants. From exotic local flavors to international cuisines prepared by Michelin-starred chefs, every meal is a journey of taste.",
      features: ["3 Michelin-star Restaurant", "Rooftop Lounge", "24/7 Room Service", "Private Dining"]
    },
    {
      id: 2, title: "Holistic Spa & Wellness", icon: Activity,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2670&auto=format&fit=crop",
      description: "Rejuvenate your body and soul in our tranquil sanctuary. Offering a wide range of therapies, massages, and beauty treatments using organic products and ancient techniques.",
      features: ["Aromatherapy", "Thermal Baths", "Yoga Classes", "Couples Massage"]
    },
    {
      id: 3, title: "Weddings & Celebrations", icon: Heart,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2670&auto=format&fit=crop",
      description: "Make your dream wedding a reality. Our dedicated team of planners will orchestrate every detail, ensuring your special day is flawless and unforgettable in our grand venues.",
      features: ["Grand Ballroom", "Dedicated Planners", "Custom Catering", "Photography Services"]
    }
  ];

  // Fetch Hotels when the page loads
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/hotels/');
        if (res.ok) setHotels(await res.json());
      } catch (err) {
        console.error("Failed to fetch hotels:", err);
      }
    };
    fetchHotels();
  }, []);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setFormData({ hotelId: '', date: '', time: '', guests: '', specialRequests: '' });
    setTimeout(() => setSelectedService(null), 300);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReserveSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert("You must be logged in to reserve an experience.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/service-reservations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          hotel: formData.hotelId,
          service_name: selectedService.title,
          date: formData.date,
          time: formData.time,
          guests: formData.guests,
          special_requests: formData.specialRequests
        })
      });

      if (response.ok) {
        alert("Success! Your reservation has been booked. You can view it in 'My Bookings'.");
        handleCloseModal();
      } else {
        alert("Failed to submit reservation. Please check your details.");
      }
    } catch (err) {
      alert("Network error. Is the Django server running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen relative">
      <div className="bg-gray-900 text-white py-20 -mt-24 mb-16 px-4">
        <div className="max-w-7xl mx-auto mt-12 text-center">
          <span className="text-primary font-medium tracking-widest uppercase mb-4 block">World-Class Facilities</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Services & Amenities</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Indulge in an array of world-class facilities designed to make your stay truly exceptional. 
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {services.map((service, index) => (
          <div key={service.id} className={`flex flex-col gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <img src={service.image} alt={service.title} className="relative z-10 w-full h-[400px] object-cover rounded-3xl shadow-xl transform group-hover:-translate-y-2 transition-transform duration-500"/>
              <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{service.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{service.description}</p>
              
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-gray-700 font-medium">
                    <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>{feature}
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <button onClick={() => handleOpenModal(service)} className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-full font-medium transition-colors shadow-lg w-full sm:w-auto">
                  Reserve Experience
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RESERVATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 md:p-8 animate-in zoom-in-95 duration-200">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full p-2">
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 pr-8">
              <h3 className="text-2xl font-bold text-gray-900">Reserve {selectedService?.title}</h3>
            </div>

            <form onSubmit={handleReserveSubmit} className="space-y-5">
              
              {/* NEW: Hotel Selection Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><Building className="w-4 h-4 mr-1 text-primary" /> Select Hotel Location</label>
                <select name="hotelId" value={formData.hotelId} onChange={handleChange} required className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-primary outline-none bg-gray-50 focus:bg-white">
                  <option value="" disabled>-- Choose Hotel --</option>
                  {hotels.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><Calendar className="w-4 h-4 mr-1 text-primary" /> Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-primary outline-none bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><Clock className="w-4 h-4 mr-1 text-primary" /> Time</label>
                  <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-primary outline-none bg-gray-50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><Users className="w-4 h-4 mr-1 text-primary" /> Guests</label>
                <input type="number" name="guests" value={formData.guests} onChange={handleChange} min="1" max="20" required placeholder="e.g., 2" className="w-full border-gray-300 rounded-xl p-3 border outline-none bg-gray-50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
                <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows="3" className="w-full border-gray-300 rounded-xl p-3 border outline-none bg-gray-50 resize-none"></textarea>
              </div>

              <div className="pt-4 mt-6 border-t flex gap-3">
                <button type="button" onClick={handleCloseModal} className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">Cancel</button>
                <button type="submit" disabled={isSubmitting} className={`flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-md ${isSubmitting ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90'}`}>
                  {isSubmitting ? 'Submitting...' : 'Confirm Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;