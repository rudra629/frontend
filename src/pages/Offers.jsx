import { Gift, Clock, CreditCard, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: "Weekend Getaway Spa Package",
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2670&auto=format&fit=crop",
      description: "Escape the city buzz with our exclusive weekend package. Includes a 2-night stay, complimentary breakfast, and a 60-minute couples massage.",
      validUntil: "Dec 31, 2026",
      code: "WKNDSPA20"
    },
    {
      id: 2,
      title: "Advance Purchase Save 25%",
      discount: "25% OFF",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2670&auto=format&fit=crop",
      description: "Plan ahead and save big. Book your stay at least 30 days in advance and instantly unlock 25% off our best available rates.",
      validUntil: "Ongoing",
      code: "EARLYBIRD"
    },
    {
      id: 3,
      title: "Romantic Escape for Two",
      discount: "SPECIAL",
      image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=2564&auto=format&fit=crop",
      description: "Celebrate love in luxury. Enjoy a beautifully decorated suite, champagne on arrival, intimate candlelight dinner, and late checkout.",
      validUntil: "Feb 28, 2026",
      code: "ROMANCE26"
    },
    {
      id: 4,
      title: "Extended Stay Rate",
      discount: "STAY 4, PAY 3",
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop",
      description: "Stay longer, experience more. Book a minimum of 4 nights and get the 4th night absolutely free. Unwind and explore at your own pace.",
      validUntil: "Ongoing",
      code: "STAY4PAY3"
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="bg-gray-900 text-white py-16 -mt-24 mb-16 px-4">
        <div className="max-w-7xl mx-auto mt-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-yellow-500 mr-4" />
            Exclusive Offers
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover our carefully curated packages designed to make your stay unforgettable while offering exceptional value.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row group border border-gray-100 relative">
              
              {/* Image Section */}
              <div className="w-full md:w-2/5 relative overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover min-h-[250px] transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-0 left-0 bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-br-2xl shadow-lg z-10 flex items-center">
                  <Gift className="w-4 h-4 mr-2" />
                  {offer.discount}
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{offer.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {offer.description}
                  </p>
                </div>
                
                <div className="mt-auto space-y-4 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      Valid until: <span className="font-semibold text-gray-900 ml-1">{offer.validUntil}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                    <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 border-dashed text-gray-700 font-mono text-sm tracking-widest flex items-center w-full sm:w-auto justify-center">
                      <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                      {offer.code}
                    </div>
                    
                    <Link to="/booking" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold text-[15px] w-full sm:w-auto text-center transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      Redeem Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
