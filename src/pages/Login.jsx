import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hotel } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.email, // Django simplejwt expects 'username' by default
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save tokens to local storage
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        
        // Redirect to homepage
        navigate('/');
      } else {
        // Show error from backend (e.g., "No active account found")
        setError(data.detail || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Unable to connect to the server. Is Django running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        
        <div className="flex flex-col items-center">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <Hotel className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500">Sign in to your LUXE account</p>
        </div>

        {/* Error Message Alert */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">Forgot password?</a>
              </div>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-primary hover:text-primary/80 transition-colors">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;