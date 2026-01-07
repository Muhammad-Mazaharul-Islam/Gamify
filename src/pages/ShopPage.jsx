import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ChevronDown, Star, Check, ShoppingCart, X } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import { games } from '../data/mock';
import { toast } from 'sonner';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGame = searchParams.get('game') || 'all';
  
  const [selectedGame, setSelectedGame] = useState(initialGame);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredGames = useMemo(() => {
    let result = games;
    
    if (selectedGame !== 'all') {
      result = result.filter(game => game.slug === selectedGame);
    }
    
    if (searchQuery) {
      result = result.filter(game => 
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return result;
  }, [selectedGame, searchQuery]);

  const handleGameFilter = (gameSlug) => {
    setSelectedGame(gameSlug);
    if (gameSlug === 'all') {
      searchParams.delete('game');
    } else {
      searchParams.set('game', gameSlug);
    }
    setSearchParams(searchParams);
  };

  const addToCart = (game, currency) => {
    const existingItem = cart.find(
      item => item.gameId === game.id && item.currencyId === currency.id
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.gameId === game.id && item.currencyId === currency.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        gameId: game.id,
        gameName: game.name,
        currencyId: currency.id,
        currencyName: currency.name,
        price: currency.price,
        quantity: 1
      }]);
    }
    
    toast.success(`Added ${currency.name} to cart!`);
  };

  const removeFromCart = (gameId, currencyId) => {
    setCart(cart.filter(
      item => !(item.gameId === gameId && item.currencyId === currencyId)
    ));
  };

  const updateQuantity = (gameId, currencyId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(gameId, currencyId);
      return;
    }
    setCart(cart.map(item =>
      item.gameId === gameId && item.currencyId === currencyId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
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

          {/* Game Filter */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 text-white w-full md:w-48 justify-between hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-white/60" />
                <span>{selectedGame === 'all' ? 'All Games' : games.find(g => g.slug === selectedGame)?.name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-black border border-white/10 z-20"
                >
                  <button
                    onClick={() => { handleGameFilter('all'); setIsFilterOpen(false); }}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors ${
                      selectedGame === 'all' ? 'text-[#00FFD1]' : 'text-white'
                    }`}
                  >
                    All Games
                    {selectedGame === 'all' && <Check className="w-4 h-4" />}
                  </button>
                  {games.map((game) => (
                    <button
                      key={game.id}
                      onClick={() => { handleGameFilter(game.slug); setIsFilterOpen(false); }}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors ${
                        selectedGame === game.slug ? 'text-[#00FFD1]' : 'text-white'
                      }`}
                    >
                      {game.name}
                      {selectedGame === game.slug && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
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

        {/* Games Grid */}
        <div className="space-y-12">
          {filteredGames.map((game, gameIndex) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gameIndex * 0.1 }}
              className="bg-white/5 border border-white/10 overflow-hidden"
            >
              {/* Game Header */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h2 className="text-2xl font-bold text-white mb-1">{game.name}</h2>
                  <p className="text-white/60">{game.description}</p>
                </div>
              </div>

              {/* Currency Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {game.currencies.map((currency) => (
                    <motion.div
                      key={currency.id}
                      whileHover={{ scale: 1.02 }}
                      className={`relative p-4 border transition-all duration-300 cursor-pointer group ${
                        currency.popular
                          ? 'bg-[#00FFD1]/5 border-[#00FFD1]/30 hover:border-[#00FFD1]'
                          : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                      onClick={() => addToCart(game, currency)}
                    >
                      {currency.popular && (
                        <div className="absolute -top-3 left-4 bg-[#00FFD1] text-black text-xs font-bold px-2 py-1 flex items-center gap-1">
                          <Star className="w-3 h-3" /> POPULAR
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-semibold text-lg">{currency.name}</h3>
                          <p className="text-white/50 text-sm">{game.name}</p>
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
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-black border-l border-white/10 z-50 flex flex-col"
            >
              {/* Cart Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={`${item.gameId}-${item.currencyId}`}
                        className="bg-white/5 border border-white/10 p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-white font-semibold">{item.currencyName}</h3>
                            <p className="text-white/50 text-sm">{item.gameName}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.gameId, item.currencyId)}
                            className="text-white/40 hover:text-red-400 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.gameId, item.currencyId, item.quantity - 1)}
                              className="w-8 h-8 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                              -
                            </button>
                            <span className="text-white w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.gameId, item.currencyId, item.quantity + 1)}
                              className="w-8 h-8 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[#00FFD1] font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/60">Total</span>
                    <span className="text-2xl font-bold text-[#00FFD1]">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      toast.success('Checkout functionality coming soon!');
                    }}
                    className="btn-primary w-full text-center text-lg"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;