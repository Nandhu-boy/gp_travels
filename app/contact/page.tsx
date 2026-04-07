'use client';
import { useState } from 'react';
import { createInquiry } from '@/lib/firestore';
import { PackageCategory } from '@/types';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

// Inline SVGs for social icons not in this lucide-react version
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const CATEGORIES: PackageCategory[] = [
  'Agrotourism', 'Spiritual', 'Mystery', 'Trek',
  'Adventure', 'Workation', 'Festival', 'Corporate', 'Weekend'
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    packageInterest: '',
    travelDate: '',
    groupSize: 1,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        packageId: undefined,
        packageName: formData.packageInterest,
        travelDate: formData.travelDate,
        groupSize: formData.groupSize,
        message: formData.message,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Error submitting inquiry. Please try again.');
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--cream)] pt-20 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl shadow-sm">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="font-display text-2xl font-bold text-[var(--dark)] mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            We've received your inquiry and will get back to you within 24 hours.
          </p>
          <a
            href="https://wa.me/918825482411"
            target="_blank"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] pt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <span className="text-5xl mb-3 block">💬</span>
          <h1 className="text-4xl md:text-5xl text-[var(--wood)] font-black mb-4">Get In Touch</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ready to plan your perfect Tamil Nadu adventure? Let's create memories that last a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="font-display text-2xl font-bold text-[var(--dark)] mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Package Interest</label>
                  <select
                    value={formData.packageInterest}
                    onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Travel Date</label>
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.groupSize}
                    onChange={(e) => setFormData({ ...formData, groupSize: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Tell us about your interests, special requirements, or any questions..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-3 px-6 rounded-xl font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="font-display text-2xl font-bold text-[var(--dark)] mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Phone className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--dark)]">Phone</p>
                    <p className="text-gray-600">+91 8825482411</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Mail className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--dark)]">Email</p>
                    <p className="text-gray-600">gptravels1976@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <MapPin className="text-teal-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--dark)]">Location</p>
                    <p className="text-gray-600">Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="font-display text-2xl font-bold text-[var(--dark)] mb-6">Follow Us</h2>
              <div className="flex gap-4">
                <a href="https://instagram.com/gptravels" target="_blank" className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center hover:bg-pink-200 transition-colors text-pink-600">
                  <InstagramIcon />
                </a>
                <a href="https://youtube.com/@gptravels" target="_blank" className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center hover:bg-red-200 transition-colors text-red-600">
                  <YoutubeIcon />
                </a>
                <a href="https://wa.me/918825482411" target="_blank" className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center hover:bg-green-200 transition-colors">
                  <MessageCircle className="text-green-600" size={20} />
                </a>
                <a href="https://linkedin.com/in/rajeev-gnanavel" target="_blank" className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors text-blue-600">
                  <LinkedinIcon />
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] p-8 rounded-2xl text-white text-center">
              <h3 className="font-display text-xl font-bold mb-4">Ready to Book?</h3>
              <p className="mb-6 opacity-90">
                For immediate assistance, chat with us on WhatsApp. We're here to help 24/7!
              </p>
              <a
                href="https://wa.me/918825482411"
                target="_blank"
                className="inline-flex items-center gap-2 bg-white text-[var(--primary-dark)] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <MessageCircle size={18} />
                Start Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
