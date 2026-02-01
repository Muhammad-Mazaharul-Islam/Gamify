import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Shield, Headphones, Tag, Star, ChevronRight } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import { games, features, testimonials, stats } from '../data/mock';

const iconMap = {
  Zap: Zap,
  Shield: Shield,
  Headphones: Headphones,
  Tag: Tag
};

const LandingPage = () => {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  // Auto-slide effect - changes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGameIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentGame = games[currentGameIndex];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold leading-tight mb-6"
              >
                <span className="text-white">Level Up Your</span>
                <br />
                <span className="text-[#00FFD1] glow-text">Gaming Experience</span>
              </motion.h1>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGameIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <p className="text-white/60 text-lg md:text-xl max-w-lg leading-relaxed mb-4">
                    Get <span className="text-[#00FFD1] font-semibold">{currentGame.name}</span> currency instantly. 
                    Fast delivery, secure payments, and unbeatable prices.
                  </p>
                  <p className="text-white/80 text-base">
                    Starting from <span className="text-[#00FFD1] font-bold text-xl">${currentGame.currencies[0].price.toFixed(2)}</span>
                  </p>
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/shop" className="btn-primary flex items-center gap-2 text-lg">
                  Browse Shop
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to={`/shop?game=${currentGame.slug}`}
                  className="btn-secondary flex items-center gap-2 text-lg"
                >
                  View {currentGame.name}
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Auto-fading Game Images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative hidden lg:block w-full aspect-[16/10]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGameIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 rounded-lg overflow-hidden"
                >
                  <div className="relative w-full h-full">
                    <img
                      src={currentGame.image}
                      alt={currentGame.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl font-bold text-white mb-2 drop-shadow-2xl"
                      >
                        {currentGame.name}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/80 text-lg"
                      >
                        {currentGame.description}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slide Indicators */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {games.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentGameIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentGameIndex 
                        ? 'w-8 bg-[#00FFD1]' 
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Popular <span className="text-[#00FFD1]">Games</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Choose from our wide selection of popular games and get your currency instantly
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.slice(0, 6).map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/shop?game=${game.slug}`}
                  className="group block relative overflow-hidden bg-white/5 border border-white/10 transition-all duration-500 hover:border-[#00FFD1]/50 hover:bg-white/10"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#00FFD1] transition-colors">
                      {game.name}
                    </h3>
                    <p className="text-white/50 text-sm mb-4">{game.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#00FFD1] text-sm">
                        From ${game.currencies[0].price.toFixed(2)}
                      </span>
                      <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-[#00FFD1] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              View All Games
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="text-[#00FFD1]">Gamify</span>?
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              We provide the best service for gamers worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-6 bg-white/5 border border-white/10 transition-all duration-500 hover:border-[#00FFD1]/50 hover:bg-white/10"
                >
                  <div className="w-14 h-14 bg-[#00FFD1]/10 flex items-center justify-center mb-4 group-hover:bg-[#00FFD1]/20 transition-colors">
                    <IconComponent className="w-7 h-7 text-[#00FFD1]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/50 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Gamers <span className="text-[#00FFD1]">Say</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied customers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 border border-white/10"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#00FFD1] text-[#00FFD1]" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 leading-relaxed">"{testimonial.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#00FFD1]/20 flex items-center justify-center text-[#00FFD1] font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-medium">{testimonial.name}</div>
                    <div className="text-white/50 text-sm">{testimonial.game} Player</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to <span className="text-[#00FFD1] glow-text">Level Up</span>?
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Get access to premium in-game currencies with fast delivery and secure payments.
            </p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2 text-lg">
              Start Shopping Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;