import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20 -mt-24 mb-16 px-4">
        <div className="max-w-7xl mx-auto mt-12 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Get in Touch</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We are here to assist you with any inquiries or requests. Reach out to our dedicated team 24/7.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Contact Information Side */}
          <div className="w-full lg:w-2/5 bg-gray-900 text-white p-10 md:p-14 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              
              <div className="space-y-8 text-gray-300">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Our Location</h3>
                    <p>Marine Drive, Nariman Point,<br/>Mumbai 400021<br/>India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-primary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Phone Number</h3>
                    <p>Reservations: +91 22 1234 5678<br/>Front Desk: +91 22 8765 4321</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-primary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email Address</h3>
                    <p>info@luxehotel.com<br/>support@luxehotel.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-primary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Operating Hours</h3>
                    <p>Front Desk: 24/7<br/>Support: Mon-Sun, 9AM-8PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="w-full lg:w-3/5 p-10 md:p-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-600 mb-8">Feel free to drop us a line below!</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50" placeholder="Rahul" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50" placeholder="Sharma" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50" placeholder="rahul@example.in" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input type="text" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50" placeholder="How can we help?" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea rows="5" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50 resize-none" placeholder="Type your message here..."></textarea>
              </div>

              <div className="pt-4">
                <button type="button" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center transition-all shadow-lg hover:shadow-xl w-full sm:w-auto transform hover:-translate-y-0.5">
                  <Send className="w-5 h-5 mr-3" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 bg-gray-200 rounded-3xl h-[400px] w-full overflow-hidden relative group">
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold shadow-xl flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" /> View on Google Maps
            </button>
          </div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15086.096387060596!2d72.82229550000001!3d18.930353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1e71c26b86f%3A0xc6e4ffca7cc4c5a9!2sMarine%20Drive!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale-[50%] contrast-[1.1]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
