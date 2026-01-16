import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Clock, ChevronDown, Search, Send, ExternalLink } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import { toast } from 'sonner';

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      id: 1,
      question: 'How fast is the delivery?',
      answer: 'Most orders are delivered within 2-5 minutes after payment confirmation. In rare cases, it may take up to 30 minutes during peak hours.'
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, PayPal, cryptocurrency, and various local payment methods depending on your region.'
    },
    {
      id: 3,
      question: 'Is it safe to buy from Gamify?',
      answer: 'Yes! We use industry-standard encryption to protect your data. We\'ve processed over 2 million orders with a 99.9% success rate.'
    },
    {
      id: 4,
      question: 'What if I don\'t receive my order?',
      answer: 'If you don\'t receive your order within 30 minutes, please contact our support team. We offer full refunds or redelivery for any failed orders.'
    },
    {
      id: 5,
      question: 'Can I get a refund?',
      answer: 'Refunds are available for orders that couldn\'t be fulfilled. Once currency is delivered to your account, refunds are not possible.'
    },
    {
      id: 6,
      question: 'Do you offer bulk discounts?',
      answer: 'Yes! Contact our support team for bulk order inquiries. We offer special rates for large purchases.'
    },
    {
      id: 7,
      question: 'Which games do you support?',
      answer: 'We support all major games including Valorant, Mobile Legends, Genshin Impact, Fortnite, League of Legends, PUBG Mobile, and more.'
    },
    {
      id: 8,
      question: 'How do I contact support?',
      answer: 'You can reach us through our contact form, live chat, or email at support@gamifyofficial.com. Our team responds within 2 hours on average.'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const supportChannels = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our team',
      action: 'Start Chat',
      available: true
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@gamifyofficial.com',
      action: 'Send Email',
      available: true
    },
    {
      icon: Clock,
      title: 'Response Time',
      description: '< 2 hours average',
      action: null,
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <AnimatedBackground />

      {/* Header */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              How Can We <span className="text-[#00FFD1] glow-text">Help</span>?
            </h1>
            <p className="text-white/60 text-lg md:text-xl mb-8">
              Find answers to common questions or get in touch with our support team
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 text-center hover:border-[#00FFD1]/30 transition-colors"
              >
                <div className="w-14 h-14 bg-[#00FFD1]/10 flex items-center justify-center mx-auto mb-4">
                  <channel.icon className="w-7 h-7 text-[#00FFD1]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{channel.title}</h3>
                <p className="text-white/60 mb-4">{channel.description}</p>
                {channel.action && (
                  <button
                    onClick={() => toast.info('Support channel feature coming soon!')}
                    className="text-[#00FFD1] font-medium flex items-center gap-2 mx-auto hover:underline"
                  >
                    {channel.action}
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked <span className="text-[#00FFD1]">Questions</span>
            </h2>
            <p className="text-white/60">Quick answers to common questions</p>
          </motion.div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#00FFD1] flex-shrink-0 transition-transform duration-300 ${
                      openFaq === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === faq.id ? 'auto' : 0,
                    opacity: openFaq === faq.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-white/60 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/60">No results found. Try a different search term.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Still Need <span className="text-[#00FFD1]">Help</span>?
            </h2>
            <p className="text-white/60">Send us a message and we'll get back to you</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 p-8"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-white mb-2">Subject</label>
              <input
                type="text"
                required
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors"
                placeholder="How can we help?"
              />
            </div>
            <div className="mb-6">
              <label className="block text-white mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FFD1] transition-colors resize-none"
                placeholder="Describe your issue or question..."
              />
            </div>
            <button type="submit" className="btn-primary w-full md:w-auto flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;