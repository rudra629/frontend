import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Home, CheckCircle, CreditCard, Lock, ShieldCheck, UserPlus, User } from 'lucide-react';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: '1',
    children: '0',
    roomType: 'deluxe',
    primaryName: '',
    email: '',
    phone: '',
    additionalAdults: [],
    childrenGuests: [],
    specialRequests: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const getPrice = () => {
    switch(formData.roomType) {
      case 'standard': return 8000;
      case 'deluxe': return 18000;
      case 'premium': return 12000;
      case 'suite': return 35000;
      default: return 18000;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuestChange = (type, index, value) => {
    const updatedArray = [...formData[type]];
    updatedArray[index] = value;
    setFormData({ ...formData, [type]: updatedArray });
  };

  const initGuests = () => {
    const adultCount = parseInt(formData.adults);
    const childCount = parseInt(formData.children);
    
    setFormData(prev => ({
      ...prev,
      additionalAdults: Array(Math.max(0, adultCount - 1)).fill(''),
      childrenGuests: Array(childCount).fill('')
    }));
  };

  const handleNextToGuests = (e) => {
    e.preventDefault();
    initGuests();
    setStep(2);
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-8">
        
        {/* Left Side bg image & Progress bar */}
        <div 
          className="hidden md:block md:w-2/5 md:bg-cover md:bg-center relative"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1574643004689-d1bd55e88d07?q=80&w=2574&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm mix-blend-multiply" />
          <div className="absolute inset-0 p-10 flex flex-col justify-between text-white">
            <div>
              <h2 className="text-3xl font-bold mb-4">Reserve Your Stay</h2>
              <p className="text-white/80 leading-relaxed">Experience a perfect combination of luxury, comfort, and exceptional service.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 1 ? 'bg-white text-primary' : 'bg-white/20'}`}>1</div>
                <span className={step >= 1 ? 'text-white font-medium' : 'text-white/60'}>Select Dates & Room</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 2 ? 'bg-white text-primary' : 'bg-white/20'}`}>2</div>
                <span className={step >= 2 ? 'text-white font-medium' : 'text-white/60'}>Guest Details</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 3 ? 'bg-white text-primary' : 'bg-white/20'}`}>3</div>
                <span className={step >= 3 ? 'text-white font-medium' : 'text-white/60'}>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 4 ? 'bg-white text-primary' : 'bg-white/20'}`}>4</div>
                <span className={step >= 4 ? 'text-white font-medium' : 'text-white/60'}>Confirmation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-3/5 p-8 md:p-12">
          
          {step === 1 && (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Dates & Accommodation</h3>
              <form onSubmit={handleNextToGuests} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center"><Calendar className="w-4 h-4 mr-2 text-primary" /> Check In</label>
                    <input type="date" required name="checkIn" value={formData.checkIn} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center"><Calendar className="w-4 h-4 mr-2 text-primary" /> Check Out</label>
                    <input type="date" required name="checkOut" value={formData.checkOut} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center"><Users className="w-4 h-4 mr-2 text-primary" /> Adults</label>
                    <select name="adults" value={formData.adults} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white">
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center"><Users className="w-4 h-4 mr-2 text-primary" /> Children</label>
                    <select name="children" value={formData.children} onChange={handleChange} className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white">
                      {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center"><Home className="w-4 h-4 mr-2 text-primary" /> Room Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Standard', 'Premium', 'Deluxe', 'Suite'].map(type => (
                      <label key={type} className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.roomType === type.toLowerCase() ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary/50'}`}>
                        <input type="radio" name="roomType" value={type.toLowerCase()} checked={formData.roomType === type.toLowerCase()} onChange={handleChange} className="sr-only" />
                        <span className="font-semibold text-gray-900 block">{type} Room</span>
                        <span className="text-sm text-gray-500 mt-1 block">From ₹{type === 'Standard' ? '8,000' : type === 'Deluxe' ? '18,000' : type === 'Premium' ? '12,000' : '35,000'}/nt</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                    Continue to Guest Details
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center">
                  <button onClick={() => setStep(1)} className="text-gray-500 hover:text-primary font-medium text-sm mr-4 flex items-center">
                    &larr; Back
                  </button>
                  <h3 className="text-2xl font-bold text-gray-900">Guest Details</h3>
                </div>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                  {formData.adults} Adult(s), {formData.children} Child(ren)
                </div>
              </div>
              
              <form onSubmit={handleNextToPayment} className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                
                {/* Primary Guest Details */}
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-primary" /> Primary Guest (Lead Booker)
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input type="text" required name="primaryName" value={formData.primaryName} onChange={handleChange} placeholder="Rahul Sharma" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input type="email" required name="email" value={formData.email} onChange={handleChange} placeholder="rahul@example.in" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" required name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Adults if any */}
                {formData.additionalAdults.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 flex items-center border-b pb-2">
                      <UserPlus className="w-5 h-5 mr-2 text-gray-500" /> Additional Adults
                    </h4>
                    {formData.additionalAdults.map((adultName, index) => (
                      <div key={`adult-${index}`}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Adult {index + 2} Details</label>
                        <div className="flex gap-4">
                          <input 
                            type="text" 
                            required 
                            placeholder={`Adult ${index + 2} Full Name`} 
                            value={adultName}
                            onChange={(e) => handleGuestChange('additionalAdults', index, e.target.value)}
                            className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Children if any */}
                {formData.childrenGuests.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 flex items-center border-b pb-2">
                      <Users className="w-5 h-5 mr-2 text-gray-500" /> Children
                    </h4>
                    {formData.childrenGuests.map((childName, index) => (
                      <div key={`child-${index}`}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Child {index + 1} Details</label>
                        <div className="flex gap-4">
                          <input 
                            type="text" 
                            required 
                            placeholder={`Child ${index + 1} Full Name & Age (e.g., Aryan, 8)`}
                            value={childName}
                            onChange={(e) => handleGuestChange('childrenGuests', index, e.target.value)}
                            className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests (Optional)</label>
                  <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows="3" placeholder="Any dietary requirements, arrival time, cribs needed, etc..." className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"></textarea>
                </div>

                <div className="pt-6 sticky bottom-0 bg-white shadow-[0_-20px_20px_-20px_rgba(0,0,0,0.1)] pb-2 z-10">
                  <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg flex justify-center items-center transition-all transform hover:-translate-y-0.5">
                    Proceed to Payment <Lock className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <button onClick={() => setStep(2)} className="text-gray-500 hover:text-primary font-medium text-sm mr-4 flex items-center">
                    &larr; Back
                  </button>
                  <h3 className="text-2xl font-bold text-gray-900">Secure Payment</h3>
                </div>
                <div className="flex text-gray-400 gap-2">
                  <ShieldCheck className="w-6 h-6 text-green-500" />
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8">
                <div className="flex justify-between items-end mb-4 border-b border-gray-200 pb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Amount Due</p>
                    <p className="text-3xl font-bold text-gray-900">₹{getPrice().toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p className="font-semibold">{formData.roomType.toUpperCase()} ROOM</p>
                    <p>{formData.checkIn} to {formData.checkOut || 'TBD'}</p>
                  </div>
                </div>

                <form onSubmit={handlePayment} className="space-y-5">
                  <h4 className="font-semibold text-gray-800 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-primary" /> Card Details
                  </h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input type="text" required placeholder={formData.primaryName || "Name on card"} className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input type="text" required placeholder="0000 0000 0000 0000" maxLength="19" className="w-full font-mono border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white tracking-widest" />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input type="text" required placeholder="MM/YY" maxLength="5" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-center" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input type="password" required placeholder="•••" maxLength="3" className="w-full font-mono border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-center tracking-widest" />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit" 
                      disabled={isProcessing}
                      className={`w-full py-4 rounded-xl font-bold text-lg flex justify-center items-center transition-all ${isProcessing ? 'bg-primary/70 cursor-not-allowed text-white' : 'bg-green-600 hover:bg-green-700 text-white shadow-lg transform hover:-translate-y-0.5'}`}
                    >
                      {isProcessing ? (
                        <span className="flex items-center animate-pulse">Processing Payment...</span>
                      ) : (
                        `Pay ₹${getPrice().toLocaleString('en-IN')} Now`
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center">
                      <Lock className="w-3 h-3 mr-1" /> Payments are secure and encrypted.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-12 animate-[scaleIn_0.5s_ease-out]">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
              <h4 className="text-xl font-medium text-gray-700 mb-4">Booking Confirmed</h4>
              
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8 max-w-sm mx-auto text-left space-y-2">
                <p className="text-gray-600 flex justify-between"><span>Reference No:</span> <strong className="text-gray-900">#LUXE-{Math.floor(Math.random() * 90000) + 10000}</strong></p>
                <p className="text-gray-600 flex justify-between"><span>Amount Paid:</span> <strong className="text-gray-900">₹{getPrice().toLocaleString('en-IN')}</strong></p>
                <p className="text-gray-600 flex justify-between mt-2 pt-2 border-t border-gray-200">
                  <span>Guest Total:</span> 
                  <strong className="text-gray-900">{parseInt(formData.adults)} Adult(s), {parseInt(formData.children)} Child(ren)</strong>
                </p>
              </div>

              <p className="text-gray-500 mb-8">
                We've sent a detailed confirmation email and receipt with all guest passes to <strong>{formData.email}</strong>.
              </p>
              <Link to="/" className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-md">
                Return to Home
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Booking;
