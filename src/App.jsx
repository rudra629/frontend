import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Rooms from './pages/Rooms'; // This is currently acting as your Hotels list
import HotelRooms from './pages/HotelRooms'; 
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings'; // <-- NEW: Imported the My Bookings page
import Services from './pages/Services';
import Offers from './pages/Offers';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Admin Pages
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/Dashboard';
import AdminRooms from './admin/Rooms';
import AdminBookings from './admin/Bookings';
import AdminUsers from './admin/Users';
import AdminLogin from './admin/Login';

const PublicLayout = () => (
  <div className="flex min-h-screen flex-col pt-24">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="rooms" element={<AdminRooms />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="hotels/:id" element={<HotelRooms />} /> 
          <Route path="booking" element={<Booking />} />
          
          {/* NEW: Added the route for users to see their past bookings */}
          <Route path="my-bookings" element={<MyBookings />} /> 
          
          <Route path="services" element={<Services />} />
          <Route path="offers" element={<Offers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;