import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hotel } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
          username: formData.email, // Satisfies Django's requirement for a username
          email: formData.email,
          password: formData.password,
          first_name: formData.name // Captures the "Full Name" field
        }),
      });

      if (response.ok) {
        // Registration successful, send them to login
        navigate('/login');
      } else {
        const data = await response.json();
        // Extract the first error message from the object
        const errorMessage = Object.values(data).flat()[0];
        setError(errorMessage || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to the server. Is Django running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        
        <div className="flex flex-col items-center">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <Hotel className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Join LUXE</h2>
          <p className="mt-2 text-sm text-gray-500">Create an account to manage your bookings</p>
        </div>

        {/* Error Message Alert */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors outline-none"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors outline-none"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors outline-none"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-black transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
            Log in instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;