import { useState, useEffect } from 'react';
import { Menu, X, Hotel, UserCircle, LogOut, Calendar } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/rooms' },
    { name: 'Services', path: '/services' },
    { name: 'Offers', path: '/offers' },
    { name: 'Contact', path: '/contact' },
  ];

  // Check authentication status whenever the route changes
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
    // Close mobile menu and profile dropdown on route change
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // Clear the tokens from browser storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setIsProfileOpen(false);
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Hotel className={`w-8 h-8 ${isScrolled ? 'text-primary' : 'text-white'}`} />
            <span className={`text-2xl font-bold tracking-tighter ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              LUXE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path 
                    ? 'text-primary' 
                    : isScrolled ? 'text-gray-600' : 'text-gray-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 border-l border-gray-300/50 pl-6 ml-2">
              
              {/* Conditional Rendering based on Authentication */}
              {isAuthenticated ? (
                <div className="relative flex items-center space-x-4">
                  {/* Profile Dropdown Trigger */}
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`focus:outline-none transition-colors hover:text-primary ${
                      isScrolled ? 'text-gray-700' : 'text-white'
                    }`}
                  >
                    <UserCircle className="w-8 h-8" />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute top-12 right-32 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      
                      {/* NEW: My Bookings Link */}
                      <Link 
                        to="/my-bookings" 
                        className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary flex items-center transition-colors"
                      >
                        <Calendar className="w-4 h-4 mr-3" />
                        My Bookings
                      </Link>

                      <div className="h-px bg-gray-100 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center text-left transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`text-sm font-medium transition-colors ${
                      isScrolled ? 'text-gray-700 hover:text-primary' : 'text-gray-200 hover:text-white'
                    }`}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
                      isScrolled 
                        ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white' 
                        : 'border-white text-white hover:bg-white hover:text-gray-900'
                    }`}
                  >
                    Sign up
                  </Link>
                </>
              )}

              <Link
                to="/booking"
                className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={isScrolled ? 'text-gray-900' : 'text-white'}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col space-y-4 border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-800 hover:text-primary font-medium px-2 py-1"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex flex-col space-y-3 pt-4 mt-2 border-t border-gray-100">
            {isAuthenticated ? (
              <>
                {/* NEW: My Bookings Link (Mobile) */}
                <Link
                  to="/my-bookings"
                  className="text-gray-700 font-medium px-4 py-2 flex items-center hover:text-primary"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  My Bookings
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-red-600 font-medium px-4 py-2 flex items-center text-left hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 font-medium px-4 py-2 text-center border border-gray-200 rounded-full hover:bg-gray-50"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-900 font-medium px-4 py-2 text-center border border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
            <Link
              to="/booking"
              className="bg-primary text-white text-center px-6 py-2 rounded-full font-medium"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;