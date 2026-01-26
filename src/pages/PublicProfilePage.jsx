import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Trophy,
  Shield,
  Flame,
  Star,
  Crown,
  Heart,
  MessageCircle,
  UserPlus,
  MoreVertical,
  ExternalLink,
  Award,
  Zap,
  BadgeCheck
} from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import { toast } from 'sonner';
import avatarImage from '../assets/avatar.png';

const PublicProfilePage = () => {
  const { username } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock user data - in real app, fetch based on username
  const profileData = {
    username: username || 'Pro-Polok',
    fullName: 'Meliodas',
    avatar: avatarImage,
    coverImage: '/assets/avatar.jpg',
    memberSince: 'January 2024',
    about: 'Passionate gamer and content creator. Love playing PUBG Mobile, Valorant, and exploring new games. Always ready for a squad match! 🎮',
    
    // Education
    education: {
      school: 'Dhaka High School',
      college: 'Notre Dame College',
      university: 'University of Dhaka - Computer Science & Engineering'
    },
    
    // Professional
    profession: 'Full Stack Developer & Gaming Content Creator',
    location: 'Dhaka, Bangladesh',
    
    // Gaming Stats
    stats: {
      totalOrders: 47,
      totalSpent: 1250.50,
      level: 24,
      points: 8450,
      followers: 342,
      following: 128
    },
    
    // Badges
    badges: [
      { 
        id: 1, 
        name: 'Early Adopter', 
        icon: Shield, 
        color: 'text-blue-400',
        description: 'Joined in the first month',
        rarity: 'Legendary'
      },
      { 
        id: 2, 
        name: 'Top Spender', 
        icon: Crown, 
        color: 'text-yellow-400',
        description: 'Spent over $1000',
        rarity: 'Epic'
      },
      { 
        id: 3, 
        name: 'Hot Streak', 
        icon: Flame, 
        color: 'text-orange-400',
        description: '30 day purchase streak',
        rarity: 'Rare'
      },
      { 
        id: 4, 
        name: 'Five Star', 
        icon: Star, 
        color: 'text-purple-400',
        description: '50+ verified purchases',
        rarity: 'Epic'
      },
      { 
        id: 5, 
        name: 'Community Hero', 
        icon: Heart, 
        color: 'text-pink-400',
        description: 'Helped 100+ users',
        rarity: 'Rare'
      },
      { 
        id: 6, 
        name: 'Speed Demon', 
        icon: Zap, 
        color: 'text-cyan-400',
        description: 'Lightning fast checkouts',
        rarity: 'Common'
      }
    ],
    
    // Favorite Games
    favoriteGames: [
      { name: 'PUBG Mobile', icon: '🎮', hoursPlayed: 450 },
      { name: 'Valorant', icon: '🔫', hoursPlayed: 320 },
      { name: 'Mobile Legends', icon: '⚔️', hoursPlayed: 280 },
      { name: 'Genshin Impact', icon: '🗡️', hoursPlayed: 150 }
    ],
    
    // Recent Activity
    recentActivity: [
      { id: 1, type: 'tournament', game: 'PUBG Mobile', text: 'Participated in Squad Championship', date: '2 hours ago' },
      { id: 2, type: 'achievement', text: 'Earned "Hot Streak" badge', date: '1 day ago' },
      { id: 3, type: 'event', game: 'Valorant', text: 'Joined Ranked Season 7 Event', date: '3 days ago' },
      { id: 4, type: 'level', text: 'Reached Level 24', date: '5 days ago' },
      { id: 5, type: 'community', text: 'Helped 5 new players in the community', date: '1 week ago' },
      { id: 6, type: 'stream', game: 'Mobile Legends', text: 'Went live for 3 hours', date: '1 week ago' }
    ]
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 'Unfollowed successfully' : 'Following successfully');
  };

  const handleMessage = () => {
    toast.info('Messaging feature coming soon!');
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Legendary': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50';
      case 'Epic': return 'from-purple-500/20 to-pink-500/20 border-purple-500/50';
      case 'Rare': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/50';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-16">
      <AnimatedBackground />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Profile Header & Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mt-8"
        >
          {/* Profile Section - Avatar and Card Side by Side */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Avatar Column */}
            <div className="lg:col-span-1 flex justify-center items-center">
              <div className="relative flex-shrink-0 w-40">
                <div className="w-40 h-40 rounded-2xl border-2 border-white/20 overflow-hidden bg-white/5">
                  <img 
                    src={profileData.avatar} 
                    alt={profileData.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Verified Badge */}
                <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                  <BadgeCheck className="w-5 h-5 text-white" />
                </div>
                {/* Level Badge */}
                <div className="absolute -bottom-2 -right-2 bg-black/80 backdrop-blur-sm border-2 border-gray-400 text-white font-bold text-sm px-4 py-2 rounded-full flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  LVL {profileData.stats.level}
                </div>
              </div>
            </div>

            {/* Profile Info Card */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                {/* Name and Badges */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-1">
                      {profileData.fullName}
                    </h1>
                    <p className="text-white/60 text-lg">@{profileData.username}</p>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex gap-2">
                    {profileData.badges.slice(0, 3).map((badge) => {
                      const IconComponent = badge.icon;
                      return (
                        <div
                          key={badge.id}
                          className="group relative"
                        >
                          <div className={`w-10 h-10 rounded-lg ${badge.color} bg-white/10 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                            <div className="bg-black border border-white/20 rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap shadow-xl">
                              <div className="font-bold">{badge.name}</div>
                              <div className="text-white/60">{badge.description}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {profileData.memberSince}
                  </span>
                  {profileData.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profileData.location}
                    </span>
                  )}
                </div>

                {/* About Me */}
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">About Me</h3>
                  <p className="text-white/70 leading-relaxed">{profileData.about}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
            {/* Favorite Games */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#00FFD1]" />
                Favorite Games
              </h2>
              <div className="space-y-3">
                {profileData.favoriteGames.map((game, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                    <span className="text-white font-medium">{game.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#00FFD1]" />
                Recent Activity
              </h2>
              <div className="space-y-3">
                {profileData.recentActivity.map((activity, index) => (
                  <motion.div 
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 py-3 border-l-2 border-white/10 pl-4 hover:border-[#00FFD1] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FFD1]/20 to-[#00B8A9]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {activity.type === 'tournament' && <Trophy className="w-4 h-4 text-[#00FFD1]" />}
                      {activity.type === 'achievement' && <Award className="w-4 h-4 text-yellow-400" />}
                      {activity.type === 'level' && <Star className="w-4 h-4 text-purple-400" />}
                      {activity.type === 'event' && <Zap className="w-4 h-4 text-cyan-400" />}
                      {activity.type === 'community' && <Heart className="w-4 h-4 text-pink-400" />}
                      {activity.type === 'stream' && <User className="w-4 h-4 text-green-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white">
                        {activity.type === 'tournament' && (
                          <><span className="text-[#00FFD1] font-medium">{activity.text}</span> in {activity.game}</>
                        )}
                        {activity.type === 'event' && (
                          <><span className="text-cyan-400 font-medium">{activity.text}</span> in {activity.game}</>
                        )}
                        {activity.type === 'stream' && (
                          <><span className="text-green-400 font-medium">{activity.text}</span> • {activity.game}</>
                        )}
                        {activity.type === 'achievement' && <span className="font-medium">{activity.text}</span>}
                        {activity.type === 'level' && <span className="font-medium">{activity.text}</span>}
                        {activity.type === 'community' && <span className="text-pink-400 font-medium">{activity.text}</span>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Achievements */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#00FFD1]" />
                Achievements
              </h2>
              <div className="space-y-3">
                {profileData.badges.map((badge) => {
                  const IconComponent = badge.icon;
                  return (
                    <motion.div
                      key={badge.id}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className={`w-14 h-14 rounded-xl ${badge.color} bg-white/10 flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-bold">{badge.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${badge.color} bg-white/10`}>
                            {badge.rarity}
                          </span>
                        </div>
                        <p className="text-sm text-white/60">{badge.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
