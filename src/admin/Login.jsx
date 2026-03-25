import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hotel, Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
        <div className="text-center justify-center flex flex-col items-center mb-8">
          <Hotel className="w-12 h-12 text-primary mb-2" />
          <h1 className="text-3xl font-bold text-gray-900 tracking-tighter">LUXE ADMIN</h1>
          <p className="text-gray-500 text-sm mt-2">Enter your credentials to access the portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50"
                placeholder="admin@luxe.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full border-gray-300 rounded-xl p-3 border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
              Remember me
            </label>
            <a href="#" className="font-medium text-primary hover:text-primary/80">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Sign in to Dashboard
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Demo Credentials: Any email & password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
