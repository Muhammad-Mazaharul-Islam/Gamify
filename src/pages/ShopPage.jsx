import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Star, ShoppingCart, X } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import { games } from '../data/mock';
import { useCart } from '../contexts/CartContext';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart, cartItemCount } = useCart();
  
  const [selectedGame, setSelectedGame] = useState(null); // null = showing game cards
  const [searchQuery, setSearchQuery] = useState('');

  // Check URL parameter and auto-select game
  useEffect(() => {
    const gameSlug = searchParams.get('game');
    if (gameSlug) {
      const game = games.find(g => g.slug === gameSlug);
      if (game) {
        setSelectedGame(game);
      }
    }
  }, [searchParams]);

  const filteredGames = useMemo(() => {
    let result = games;
    
    if (searchQuery) {
      result = result.filter(game => 
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return result;
  }, [searchQuery]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setSearchParams({ game: game.slug });
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {!selectedGame ? (
          // Game Cards View
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Game <span className="text-[#00FFD1]">Shop</span>
              </h1>
              <p className="text-white/60 text-lg">
                Browse and purchase in-game currencies for your favorite games
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-4 mb-8"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors"
                />
              </div>
              <button
                onClick={() => navigate('/cart')}
                className="relative btn-primary flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Cart
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-black text-sm font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </motion.div>

            {/* Game Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white/5 border border-white/10 overflow-hidden cursor-pointer group"
                  onClick={() => handleGameClick(game)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00FFD1] transition-colors">
                      {game.name}
                    </h3>
                    <p className="text-white/60 mb-4">{game.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-sm">
                        {game.currencies.length} packages available
                      </span>
                      <span className="text-[#00FFD1] font-semibold group-hover:translate-x-2 transition-transform">
                        Shop Now →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredGames.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-white/60 text-lg">No games found matching your search.</p>
              </motion.div>
            )}
          </>
        ) : (
          // Currency Packages View
          <>
            {/* Back Button & Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <button
                onClick={handleBackToGames}
                className="text-white/60 hover:text-[#00FFD1] mb-6 flex items-center gap-2 transition-colors"
              >
                ← Back to Games
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 overflow-hidden"
            >
              {/* Game Header */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={selectedGame.image}
                  alt={selectedGame.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">{selectedGame.name}</h2>
                    <p className="text-white/60">{selectedGame.description}</p>
                  </div>
                  <button
                    onClick={() => navigate('/cart')}
                    className="relative btn-primary flex items-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Cart
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-black text-sm font-bold rounded-full flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Currency Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedGame.currencies.map((currency) => (
                    <motion.div
                      key={currency.id}
                      whileHover={{ scale: 1.02 }}
                      className={`relative p-4 border transition-all duration-300 cursor-pointer group ${
                        currency.popular
                          ? 'bg-[#00FFD1]/5 border-[#00FFD1]/30 hover:border-[#00FFD1]'
                          : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                      onClick={() => addToCart(selectedGame, currency)}
                    >
                      {currency.popular && (
                        <div className="absolute -top-3 left-4 bg-[#00FFD1] text-black text-xs font-bold px-2 py-1 flex items-center gap-1">
                          <Star className="w-3 h-3" /> POPULAR
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-semibold text-lg">{currency.name}</h3>
                          <p className="text-white/50 text-sm">{selectedGame.name}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#00FFD1]">
                            ${currency.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="btn-primary text-center text-sm py-2">
                          Add to Cart
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopPage;