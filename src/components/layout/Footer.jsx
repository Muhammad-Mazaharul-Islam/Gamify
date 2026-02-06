import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Mail, MessageCircle, Twitter, Instagram, Youtube } from 'lucide-react';
import logo from '../../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    games: [
      { label: 'Valorant', path: '/shop?game=valorant' },
      { label: 'Mobile Legends', path: '/shop?game=mobile-legends' },
      { label: 'Genshin Impact', path: '/shop?game=genshin-impact' },
      { label: 'Fortnite', path: '/shop?game=fortnite' },
      { label: 'League of Legends', path: '/shop?game=league-of-legends' }
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Support', path: '/support' },
      { label: 'FAQ', path: '/support' },
      { label: 'Contact', path: '/support' }
    ],
    legal: [
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: MessageCircle, href: '#', label: 'Discord' }
  ];

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src={logo} alt="Gamify Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-white">GAMI</span>
                <span className="text-[#00FFD1]">FY</span>
              </span>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm leading-relaxed">
              Your trusted source for in-game currencies. Fast delivery, secure payments, 
              and 24/7 support for all your gaming needs.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/5 flex items-center justify-center transition-all duration-300 hover:bg-[#00FFD1] hover:text-black text-white/60"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Games */}
          <div>
            <h4 className="text-white font-semibold mb-4">Games</h4>
            <ul className="space-y-3">
              {footerLinks.games.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} Gamify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;