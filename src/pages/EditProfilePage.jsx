import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import AnimatedBackground from '../components/AnimatedBackground';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    firstName: user?.firstName || '',
    middleName: user?.middleName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    gender: user?.gender || 'Male'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate username
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      toast.error('Username can only contain letters, numbers, and underscores');
      return;
    }

    toast.success('Profile updated successfully!');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-black">
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          {/* Back Button */}
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Profile</span>
          </button>

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Edit <span className="text-[#00FFD1]">Profile</span>
            </h1>
            <p className="text-white/60 text-lg">
              Update your profile information
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors rounded-md"
              />

              {/* First Name */}
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors rounded-md"
              />

              {/* Middle Name */}
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Middle Name (Optional)"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors rounded-md"
              />

              {/* Last Name */}
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last Name"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors rounded-md"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors rounded-md"
              />

              {/* Gender Field */}
              <div className="grid grid-cols-3 gap-3">
                {['Male', 'Female', 'Other'].map((option) => (
                  <label
                    key={option}
                    className={`
                      flex items-center justify-center py-3 px-4 border rounded-md cursor-pointer transition-all
                      ${formData.gender === option 
                        ? 'bg-[#00FFD1]/20 border-[#00FFD1] text-[#00FFD1]' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={handleChange}
                      required
                      className="sr-only"
                    />
                    <span className="font-medium">{option}</span>
                  </label>
                ))}
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full bg-[#00FFD1] text-black font-semibold py-3 rounded-md hover:bg-[#00FFD1]/90 transition-colors"
              >
                Save Changes
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditProfilePage;
