import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import { stats } from '../data/mock';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide gamers worldwide with instant access to in-game currencies at the best prices, with unmatched reliability and security.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We\`re gamers ourselves. We understand what the gaming community needs and we\`re committed to serving them.'
    },
    {
      icon: Award,
      title: 'Quality Service',
      description: 'With 99.9% success rate and instant delivery, we pride ourselves on providing the best service in the industry.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving gamers in over 150 countries with localized payment options and 24/7 multilingual support.'
    }
  ];

  const timeline = [
    { year: '2020', title: 'Founded', description: 'Gamify started with a simple idea: make gaming currencies accessible to everyone.' },
    { year: '2021', title: '100K Users', description: 'Reached our first major milestone with 100,000 satisfied customers.' },
    { year: '2022', title: 'Global Expansion', description: 'Expanded to serve gamers in over 100 countries worldwide.' },
    { year: '2023', title: '1M Orders', description: 'Celebrated processing over 1 million successful orders.' },
    { year: '2024', title: '500K+ Users', description: 'Grew our community to over 500,000 active users.' },
    { year: '2025', title: 'The Future', description: 'Continuing to innovate and serve the gaming community.' }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              About <span className="text-[#00FFD1] glow-text">Gamify</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed">
              We're on a mission to make gaming more accessible by providing instant, 
              secure, and affordable in-game currencies to gamers worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-white/5 border border-white/10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#00FFD1] mb-2">{stat.value}</div>
                <div className="text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-[#00FFD1]">Values</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              What drives us every day to serve the gaming community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white/5 border border-white/10 hover:border-[#00FFD1]/30 transition-colors group"
              >
                <div className="w-14 h-14 bg-[#00FFD1]/10 flex items-center justify-center mb-6 group-hover:bg-[#00FFD1]/20 transition-colors">
                  <value.icon className="w-7 h-7 text-[#00FFD1]" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{value.title}</h3>
                <p className="text-white/60 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-[#00FFD1]">Journey</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              From a small startup to serving gamers worldwide
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="p-6 bg-white/5 border border-white/10 inline-block">
                      <span className="text-[#00FFD1] font-bold text-xl">{item.year}</span>
                      <h3 className="text-white text-xl font-semibold mt-2">{item.title}</h3>
                      <p className="text-white/60 mt-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-[#00FFD1] rounded-full relative z-10 hidden md:block">
                    <div className="absolute inset-0 bg-[#00FFD1] rounded-full animate-ping opacity-30" />
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our <span className="text-[#00FFD1]">Community</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Be part of 500,000+ gamers who trust Gamify for their gaming needs.
            </p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2 text-lg">
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;