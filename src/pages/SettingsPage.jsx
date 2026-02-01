import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Shield, Smartphone, Bell, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import AnimatedBackground from '../components/AnimatedBackground';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotionalEmails: false,
    newGames: true,
    securityAlerts: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    toast.success('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationToggle = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-black">
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Profile</span>
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              <span className="text-[#00FFD1]">Settings</span>
            </h1>
            <p className="text-white/60 text-lg">
              Manage your security and preferences
            </p>
          </div>

          <div className="space-y-8">
            {/* Change Password Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 p-6 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-[#00FFD1]" />
                <h2 className="text-2xl font-bold text-white">Change Password</h2>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Current Password"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="New Password"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Confirm New Password"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00FFD1] text-black font-semibold py-3 rounded-md hover:bg-[#00FFD1]/90 transition-colors"
                >
                  Update Password
                </button>
              </form>
            </motion.div>

            {/* Two-Factor Authentication */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 p-6 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <Smartphone className="w-6 h-6 text-[#00FFD1]" />
                <h2 className="text-2xl font-bold text-white">Two-Factor Authentication</h2>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 mb-1">Enable 2FA for extra security</p>
                  <p className="text-white/40 text-sm">Protect your account with an additional layer of security</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={(e) => {
                      setTwoFactorEnabled(e.target.checked);
                      toast.success(e.target.checked ? '2FA enabled' : '2FA disabled');
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#00FFD1]"></div>
                </label>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 border border-white/10 p-6 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-[#00FFD1]" />
                <h2 className="text-2xl font-bold text-white">Notifications</h2>
              </div>
              
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between cursor-pointer">
                    <span className="text-white/80 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleNotificationToggle(key)}
                      className="w-5 h-5 bg-white/5 border border-white/10 rounded accent-[#00FFD1] cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={handleSaveSettings}
                className="w-full bg-[#00FFD1] text-black font-semibold py-3 rounded-md hover:bg-[#00FFD1]/90 transition-colors"
              >
                Save All Settings
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
