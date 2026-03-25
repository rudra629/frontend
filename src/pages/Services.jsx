import { Coffee, Activity, Heart, Music } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Fine Dining",
      icon: Coffee,
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop",
      description: "Experience culinary excellence at our award-winning restaurants. From exotic local flavors to international cuisines prepared by Michelin-starred chefs, every meal is a journey of taste.",
      features: ["3 Michelin-star Restaurant", "Rooftop Lounge", "24/7 Room Service", "Private Dining"]
    },
    {
      id: 2,
      title: "Holistic Spa & Wellness",
      icon: Activity,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2670&auto=format&fit=crop",
      description: "Rejuvenate your body and soul in our tranquil sanctuary. Offering a wide range of therapies, massages, and beauty treatments using organic products and ancient techniques.",
      features: ["Aromatherapy", "Thermal Baths", "Yoga Classes", "Couples Massage"]
    },
    {
      id: 3,
      title: "Weddings & Celebrations",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2670&auto=format&fit=crop",
      description: "Make your dream wedding a reality. Our dedicated team of planners will orchestrate every detail, ensuring your special day is flawless and unforgettable in our grand venues.",
      features: ["Grand Ballroom", "Dedicated Planners", "Custom Catering", "Photography Services"]
    },
    // {
    //   id: 4,
    //   title: "Corporate Events",
    //   icon: Music,
    //   image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2612&auto=format&fit=crop",
    //   description: "Host productive and inspiring events. Our state-of-the-art conference facilities are equipped with the latest technology, perfect for board meetings, seminars, and networking events.",
    //   features: ["Smart Tech Rooms", "High-speed Wi-Fi", "Event Coordinators", "Business Center"]
    // }
  ];

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="bg-gray-900 text-white py-20 -mt-24 mb-16 px-4">
        <div className="max-w-7xl mx-auto mt-12 text-center">
          <span className="text-primary font-medium tracking-widest uppercase mb-4 block">World-Class Facilities</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Services & Amenities</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Indulge in an array of world-class facilities designed to make your stay truly exceptional. 
            From gourmet dining to holistic wellness, we cater to your every need.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {services.map((service, index) => (
          <div key={service.id} className={`flex flex-col gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            {/* Image side */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <img 
                src={service.image} 
                alt={service.title} 
                className="relative z-10 w-full h-[400px] object-cover rounded-3xl shadow-xl transform group-hover:-translate-y-2 transition-transform duration-500"
              />
              <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Content side */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {service.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {service.description}
              </p>
              
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-gray-700 font-medium">
                    <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <button className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto">
                  Reserve Experience
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
