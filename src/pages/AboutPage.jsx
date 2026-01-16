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
      description: 'Gamify is a revolutionary community designed to unite gamers and creators in a space where passion fuels innovation. Our mission is to cultivate an inclusive environment that encourages creativity, allowing individuals to discover and hone their unique talents. Gamify delivers exceptional value by building a supportive ecosystem that inspires growth, promotes collaboration, and enables members to unlock their full potential in the ever-evolving world of gaming and creativity.'
    },
    {
      icon: Users,
      title: 'Our Vision',
      description: 'Gamify envisions being the ultimate hub where gamers and creators shape the future of gaming. By empowering individuals and sparking collaboration, we aspire to redefine what\'s possible and inspire limitless growth and creative achievement.'
    },
    {
      icon: Award,
      title: 'Quality Service',
      description: 'We are committed to delivering premium gaming experiences with secure transactions, reliable delivery, and dedicated customer support. Your satisfaction and trust are our top priorities.'
    },
    {
      icon: Globe,
      title: 'Goals',
      description: 'Gamify aims to transform the gaming landscape by launching tailored mentorship programs and monthly tournaments that showcase member talent. Each quarter, we facilitate collaborative projects and enhanced skill-sharing platforms to foster innovation and continuous learning. By forging strategic brand partnerships and targeting 20% annual membership growth, we provide our community with the resources, exposure, and vibrant environment needed for creativity to flourish.'
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
             Gamify is a dynamic hub that empowers gamers and creators through mentorship, engagingtournaments, and innovative skill-sharing. It fosters collaboration and inclusivity, transformingthegaming experience into a platform for personal and collective growth.
            </p>
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
                className="p-8 bg-white/5 border border-white/10 hover:border-[#00FFD1]/30 transition-all duration-500 group overflow-hidden"
              >
                <div className="w-14 h-14 bg-[#00FFD1]/10 flex items-center justify-center mb-6 group-hover:bg-[#00FFD1]/20 transition-colors">
                  <value.icon className="w-7 h-7 text-[#00FFD1]" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{value.title}</h3>
                <p className="text-white/60 leading-relaxed max-h-24 group-hover:max-h-96 overflow-hidden transition-all duration-500 ease-in-out">
                  {value.description}
                </p>
              </motion.div>
            ))}
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
              Experience fast, secure, and affordable gaming currency with unbeatable prices.
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