import { useState, useEffect } from 'react';
import { Menu, X, Hotel } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Services', path: '/services' },
    { name: 'Offers', path: '/offers' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
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
          <div className="hidden md:flex items-center space-x-8">
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
            <Link
              to="/booking"
              className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              Book Now
            </Link>
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
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-800 hover:text-primary font-medium px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/booking"
            className="bg-primary text-white text-center px-6 py-2 rounded-full font-medium"
            onClick={() => setIsOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
