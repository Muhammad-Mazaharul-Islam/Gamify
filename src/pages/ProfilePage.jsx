import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  ShoppingBag, 
  Trophy,
  Settings,
  LogOut,
  Package,
  Clock,
  CheckCircle,
  DollarSign,
  Edit2,
  X,
  Camera,
  Bell,
  Lock,
  Globe
} from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import avatarImage from '../assets/avatar.png';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Mock user data
  const userData = {
    name: user?.name || 'John Gamer',
    email: user?.email || 'john.gamer@example.com',
    memberSince: 'January 2024',
    avatar: avatarImage,
    totalOrders: 15,
    totalSpent: 450.50,
    level: 12,
    points: 2450
  };

  // Mock order history
  const orders = [
    {
      id: 'ORD-001',
      date: '2026-01-15',
      status: 'completed',
      items: [
        { name: '1000 UC', game: 'PUBG Mobile' },
        { name: '100 Diamonds', game: 'Free Fire' }
      ],
      total: 45.00,
      paymentMethod: 'bKash'
    },
    {
      id: 'ORD-002',
      date: '2026-01-10',
      status: 'completed',
      items: [
        { name: 'Battle Pass', game: 'PUBG Mobile' }
      ],
      total: 15.00,
      paymentMethod: 'Nagad'
    },
    {
      id: 'ORD-003',
      date: '2026-01-05',
      status: 'completed',
      items: [
        { name: '500 CP', game: 'Call of Duty Mobile' },
        { name: '2000 Diamonds', game: 'Mobile Legends' }
      ],
      total: 75.00,
      paymentMethod: 'Card'
    },
    {
      id: 'ORD-004',
      date: '2025-12-28',
      status: 'processing',
      items: [
        { name: '300 Diamonds', game: 'Free Fire' }
      ],
      total: 20.00,
      paymentMethod: 'Rocket'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'processing':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'cancelled':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      default:
        return 'text-white/60 bg-white/5 border-white/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="w-24 h-24 rounded-full bg-white/10 border-2 border-[#00FFD1]"
              />
              <button 
                onClick={() => setShowAvatarModal(true)}
                className="absolute bottom-0 right-0 w-8 h-8 bg-[#00FFD1] rounded-full flex items-center justify-center hover:bg-[#00FFD1]/80 transition-colors"
              >
                <Edit2 className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{userData.name}</h1>
              <div className="flex flex-wrap gap-4 text-white/60">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {userData.memberSince}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link
                to="/edit-profile"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-[#00FFD1] transition-colors group rounded-md"
              >
                <Edit2 className="w-4 h-4 text-white/60 group-hover:text-[#00FFD1]" />
                <span className="text-white/60 group-hover:text-white text-sm">Edit Profile</span>
              </Link>
              <Link
                to="/settings"
                className="px-4 py-2 bg-white/5 border border-white/10 hover:border-[#00FFD1] transition-colors text-white/60 hover:text-white text-sm rounded-md"
              >
                Settings
              </Link>
              <button 
                onClick={handleLogout}
                className="p-3 bg-white/5 border border-white/10 hover:border-red-400 transition-colors group rounded-md"
              >
                <LogOut className="w-5 h-5 text-white/60 group-hover:text-red-400" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#00FFD1]/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#00FFD1]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{userData.totalOrders}</p>
                <p className="text-white/60 text-sm">Total Orders</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">${userData.totalSpent}</p>
                <p className="text-white/60 text-sm">Total Spent</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Level {userData.level}</p>
                <p className="text-white/60 text-sm">Player Level</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{userData.points}</p>
                <p className="text-white/60 text-sm">Reward Points</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex gap-4 border-b border-white/10">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-semibold transition-colors relative ${
                activeTab === 'orders'
                  ? 'text-[#00FFD1]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Order History
              {activeTab === 'orders' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FFD1]"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-3 font-semibold transition-colors relative ${
                activeTab === 'achievements'
                  ? 'text-[#00FFD1]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Achievements
              {activeTab === 'achievements' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FFD1]"
                />
              )}
            </button>
          </div>
        </motion.div>

        {/* Content */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-6 hover:border-white/20 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">Order {order.id}</h3>
                      <span className={`px-3 py-1 text-xs font-semibold border flex items-center gap-1 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm">
                      {new Date(order.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#00FFD1]">${order.total.toFixed(2)}</p>
                    <p className="text-white/60 text-sm">via {order.paymentMethod}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-white/80">
                      <Package className="w-4 h-4 text-[#00FFD1]" />
                      <span>{item.name}</span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/60">{item.game}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                  <button 
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowOrderDetails(true);
                    }}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-white/80 hover:border-[#00FFD1] hover:text-[#00FFD1] transition-colors text-sm"
                  >
                    View Details
                  </button>
                  {order.status === 'completed' && (
                    <button className="px-4 py-2 bg-white/5 border border-white/10 text-white/80 hover:border-[#00FFD1] hover:text-[#00FFD1] transition-colors text-sm">
                      Buy Again
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'achievements' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              { title: 'First Purchase', desc: 'Made your first order', icon: '🎉', unlocked: true },
              { title: 'Big Spender', desc: 'Spent over $500', icon: '💰', unlocked: false },
              { title: 'Loyal Customer', desc: 'Made 10 orders', icon: '⭐', unlocked: true },
              { title: 'Game Collector', desc: 'Bought from 5 different games', icon: '🎮', unlocked: true },
              { title: 'Early Bird', desc: 'Made a purchase before 6 AM', icon: '🌅', unlocked: false },
              { title: 'Night Owl', desc: 'Made a purchase after midnight', icon: '🦉', unlocked: true }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 border ${
                  achievement.unlocked
                    ? 'bg-[#00FFD1]/5 border-[#00FFD1]/30'
                    : 'bg-white/5 border-white/10 opacity-50'
                }`}
              >
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="text-lg font-bold text-white mb-1">{achievement.title}</h3>
                <p className="text-white/60 text-sm">{achievement.desc}</p>
                {achievement.unlocked && (
                  <div className="mt-3 flex items-center gap-2 text-[#00FFD1] text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    Unlocked
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {showOrderDetails && selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
              onClick={() => setShowOrderDetails(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowOrderDetails(false)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-black border border-white/10 p-6 max-h-[85vh] overflow-auto"
              >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Order Details</h2>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="p-2 hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Order ID</p>
                    <p className="text-white font-semibold">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Status</p>
                    <span className={`px-3 py-1 text-xs font-semibold border inline-flex items-center gap-1 ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      {selectedOrder.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Date</p>
                    <p className="text-white font-semibold">
                      {new Date(selectedOrder.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Payment Method</p>
                    <p className="text-white font-semibold">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <h3 className="text-lg font-bold text-white mb-4">Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-[#00FFD1]" />
                          <div>
                            <p className="text-white font-semibold">{item.name}</p>
                            <p className="text-white/60 text-sm">{item.game}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-[#00FFD1]">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Avatar Change Modal */}
      <AnimatePresence>
        {showAvatarModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
              onClick={() => setShowAvatarModal(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowAvatarModal(false)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-black border border-white/10 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Change Profile Picture</h2>
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className="p-2 hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img 
                      src={userData.avatar} 
                      alt="Profile"
                      className="w-32 h-32 rounded-full bg-white/10 border-2 border-[#00FFD1]"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white/80 hover:border-[#00FFD1] hover:text-[#00FFD1] transition-colors text-left flex items-center gap-3">
                    <Camera className="w-5 h-5" />
                    Upload Photo
                  </button>
                  <button className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white/80 hover:border-[#00FFD1] hover:text-[#00FFD1] transition-colors text-left flex items-center gap-3">
                    <Globe className="w-5 h-5" />
                    Choose Avatar
                  </button>
                </div>

                <button 
                  onClick={() => {
                    toast.success('Profile picture updated!');
                    setShowAvatarModal(false);
                  }}
                  className="btn-primary w-full text-center mt-4"
                >
                  Save
                </button>
              </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
