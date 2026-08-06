import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Dumbbell } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
// Assuming api.js exists and has login method. We won't change the api.
// import api from '../utils/api'; 

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call for now. In reality, use: await api.login(formData)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-darkBg/80 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="Gym Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-darkSurface/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-black mb-4 shadow-lg shadow-primary/20">
              <Dumbbell size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-gray-400 mt-2 text-center text-sm">
              Sign in to manage your premium fitness center.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              icon={Mail}
              label="Email Address"
              type="email"
              placeholder="admin@gymmaster.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            
            <div className="space-y-2">
              <Input
                icon={Lock}
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <div className="flex justify-between items-center px-1">
                <label className="flex items-center space-x-2 text-sm text-gray-400 cursor-pointer">
                  <input type="checkbox" className="rounded border-white/20 bg-darkBg text-primary focus:ring-primary focus:ring-offset-darkSurface" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-lg mt-4"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
