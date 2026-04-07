'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Clock, Users, Star, Download, MessageCircle, Check, X, Send, User } from 'lucide-react';
import { TravelPackage, PackageReview } from '@/types';

const categoryColors: Record<string, string> = {
  Agrotourism: 'bg-green-100 text-green-700',
  Spiritual:   'bg-amber-100 text-amber-700',
  Mystery:     'bg-emerald-100 text-emerald-700',
  Trek:        'bg-teal-100 text-teal-700',
  Adventure:   'bg-lime-100 text-lime-700',
  Workation:   'bg-cyan-100 text-cyan-700',
  Festival:    'bg-green-100 text-green-700',
  Corporate:   'bg-slate-100 text-slate-700',
  Weekend:     'bg-emerald-100 text-emerald-700',
};

function getReviews(packageId: string): PackageReview[] {
  if (typeof window === 'undefined') return [];
  try {
    const all = JSON.parse(localStorage.getItem('packageReviews') || '{}');
    return (all[packageId] || []).sort((a: PackageReview, b: PackageReview) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch { return []; }
}

function saveReview(packageId: string, review: PackageReview) {
  const all = JSON.parse(localStorage.getItem('packageReviews') || '{}');
  if (!all[packageId]) all[packageId] = [];
  all[packageId].push(review);
  localStorage.setItem('packageReviews', JSON.stringify(all));
}

function getAverageRating(reviews: PackageReview[]): number {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

export default function PackageDetail({ package: pkg }: { package: TravelPackage }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [reviews, setReviews] = useState<PackageReview[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', rating: 5, comment: '' });
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setReviews(getReviews(pkg.id));
  }, [pkg.id]);

  const avgRating = getAverageRating(reviews);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const review: PackageReview = {
      id: Date.now().toString(),
      packageId: pkg.id,
      name: formData.name,
      location: formData.location,
      rating: formData.rating,
      comment: formData.comment,
      createdAt: new Date().toISOString(),
    };
    saveReview(pkg.id, review);
    setReviews(getReviews(pkg.id));
    setFormData({ name: '', location: '', rating: 5, comment: '' });
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const discount = pkg.originalPrice
    ? Math.round((1 - pkg.price / pkg.originalPrice) * 100)
    : null;

  const whatsappMessage = `Hi! I'm interested in booking ${pkg.title} for [DATE]. Can you provide more details?`;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'inclusions', label: 'Inclusions' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: `Reviews (${reviews.length})` },
  ];

  return (
    <div className="min-h-screen bg-[var(--cream)] pt-20">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        {pkg.thumbnailImage ? (
          <Image src={pkg.thumbnailImage} alt={pkg.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center text-8xl">
            🌿
          </div>
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-8 left-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${categoryColors[pkg.category] || 'bg-gray-100 text-gray-600'}`}>
              {pkg.category}
            </span>
            {pkg.isFeatured && (
              <span className="flex items-center gap-1 bg-[var(--lime)] text-green-900 text-sm font-bold px-3 py-1 rounded-full">
                <Star size={14} fill="currentColor" /> Featured
              </span>
            )}
            {reviews.length > 0 && (
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full">
                <Star size={14} fill="#facc15" className="text-yellow-400" />
                {avgRating.toFixed(1)} ({reviews.length})
              </span>
            )}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">{pkg.title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1"><MapPin size={16} /> {pkg.location}</span>
            <span className="flex items-center gap-1"><Clock size={16} /> {pkg.duration}</span>
            <span className="flex items-center gap-1"><Users size={16} /> Max {pkg.maxGroupSize}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm mb-8">
              <div className="border-b border-gray-100">
                <nav className="flex overflow-x-auto">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-[var(--primary)] text-[var(--primary)]'
                          : 'border-transparent text-gray-500 hover:text-[var(--dark)]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <div className="prose max-w-none mb-6">
                      <p className="text-gray-600 text-lg leading-relaxed">{pkg.longDescription}</p>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-[var(--dark)] mb-4">Highlights</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {pkg.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[var(--dark)] mb-6">Day-wise Itinerary</h3>
                    <div className="space-y-6">
                      {pkg.itinerary.map(day => (
                        <div key={day.day} className="border border-gray-200 rounded-xl p-6">
                          <h4 className="font-display text-xl font-semibold text-[var(--dark)] mb-3">
                            Day {day.day}: {day.title}
                          </h4>
                          <p className="text-gray-600 mb-4">{day.description}</p>
                          {day.activities.length > 0 && (
                            <div className="mb-4">
                              <h5 className="font-semibold text-[var(--dark)] mb-2">Activities:</h5>
                              <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {day.activities.map((activity, i) => <li key={i}>{activity}</li>)}
                              </ul>
                            </div>
                          )}
                          {day.meals && day.meals.length > 0 && (
                            <div className="mb-4">
                              <h5 className="font-semibold text-[var(--dark)] mb-2">Meals:</h5>
                              <p className="text-gray-600">{day.meals.join(', ')}</p>
                            </div>
                          )}
                          {day.accommodation && (
                            <div>
                              <h5 className="font-semibold text-[var(--dark)] mb-2">Accommodation:</h5>
                              <p className="text-gray-600">{day.accommodation}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'inclusions' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-[var(--dark)] mb-4">What's Included</h3>
                      <ul className="space-y-3">
                        {pkg.inclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-[var(--dark)] mb-4">What's Not Included</h3>
                      <ul className="space-y-3">
                        {pkg.exclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <X size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[var(--dark)] mb-6">Photo Gallery</h3>
                    {pkg.images.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pkg.images.map((image, i) => (
                          <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                            <Image src={image} alt={`${pkg.title} ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-12">No images available yet.</p>
                    )}
                  </div>
                )}

                {/* ═══ REVIEWS TAB ═══ */}
                {activeTab === 'reviews' && (
                  <div>
                    {/* Header with avg rating */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-[var(--dark)] mb-1">Traveler Reviews</h3>
                        {reviews.length > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {[1,2,3,4,5].map(s => (
                                <Star key={s} size={18} fill={s <= Math.round(avgRating) ? '#facc15' : 'none'} className={s <= Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-300'} />
                              ))}
                            </div>
                            <span className="font-bold text-[var(--dark)]">{avgRating.toFixed(1)}</span>
                            <span className="text-gray-400 text-sm">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
                          </div>
                        ) : (
                          <p className="text-gray-400 text-sm">No reviews yet. Be the first!</p>
                        )}
                      </div>
                      <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
                      >
                        <Send size={15} /> Write a Review
                      </button>
                    </div>

                    {/* Success message */}
                    {submitted && (
                      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                        Thank you for your review! Your feedback helps other travelers.
                      </div>
                    )}

                    {/* Review form */}
                    {showForm && (
                      <form onSubmit={handleSubmitReview} className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                        <h4 className="font-semibold text-[var(--dark)] text-lg mb-4">Share Your Experience</h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={e => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your City</label>
                            <input
                              type="text"
                              value={formData.location}
                              onChange={e => setFormData({ ...formData, location: e.target.value })}
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                              placeholder="Chennai, Tamil Nadu"
                            />
                          </div>
                        </div>

                        {/* Star rating picker */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating *</label>
                          <div className="flex gap-1">
                            {[1,2,3,4,5].map(s => (
                              <button
                                key={s}
                                type="button"
                                onMouseEnter={() => setHoverRating(s)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setFormData({ ...formData, rating: s })}
                                className="transition-transform hover:scale-110"
                              >
                                <Star
                                  size={28}
                                  fill={(hoverRating || formData.rating) >= s ? '#facc15' : 'none'}
                                  className={(hoverRating || formData.rating) >= s ? 'text-yellow-400' : 'text-gray-300'}
                                />
                              </button>
                            ))}
                            <span className="ml-2 text-sm text-gray-500 self-center">
                              {formData.rating === 1 && 'Poor'}
                              {formData.rating === 2 && 'Fair'}
                              {formData.rating === 3 && 'Good'}
                              {formData.rating === 4 && 'Very Good'}
                              {formData.rating === 5 && 'Excellent'}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label>
                          <textarea
                            required
                            rows={4}
                            value={formData.comment}
                            onChange={e => setFormData({ ...formData, comment: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                            placeholder="Tell us about your experience — what did you love? Would you recommend this trip?"
                          />
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="submit"
                            className="flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
                          >
                            <Send size={15} /> Submit Review
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Review list */}
                    <div className="space-y-5">
                      {reviews.map(review => (
                        <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center text-white font-bold text-sm">
                                {review.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-semibold text-[var(--dark)] text-sm">{review.name}</p>
                                {review.location && (
                                  <p className="text-xs text-gray-400">{review.location}</p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex gap-0.5">
                                {[1,2,3,4,5].map(s => (
                                  <Star key={s} size={14} fill={s <= review.rating ? '#facc15' : 'none'} className={s <= review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                                ))}
                              </div>
                              <p className="text-[10px] text-gray-400 mt-1">
                                {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>

                    {reviews.length === 0 && !showForm && (
                      <div className="text-center py-12">
                        <User size={48} className="text-gray-200 mx-auto mb-3" />
                        <p className="text-gray-400 text-sm mb-4">No reviews yet for this package.</p>
                        <button
                          onClick={() => setShowForm(true)}
                          className="text-[var(--primary)] font-semibold text-sm hover:underline"
                        >
                          Be the first to review!
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                  ₹{pkg.price.toLocaleString()}
                  <span className="text-sm text-gray-500 font-normal">/person</span>
                </div>
                {discount && (
                  <div className="text-sm text-gray-500">
                    <span className="line-through">₹{pkg.originalPrice?.toLocaleString()}</span>
                    <span className="text-green-600 font-semibold ml-2">{discount}% off</span>
                  </div>
                )}
                {reviews.length > 0 && (
                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    <Star size={16} fill="#facc15" className="text-yellow-400" />
                    <span className="font-semibold text-sm text-[var(--dark)]">{avgRating.toFixed(1)}</span>
                    <span className="text-xs text-gray-400">({reviews.length} reviews)</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <a
                  href={`https://wa.me/918825482411?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle size={18} />
                  Book via WhatsApp
                </a>
                {pkg.pdfUrl && (
                  <a
                    href={pkg.pdfUrl}
                    target="_blank"
                    className="w-full border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download size={18} />
                    Download Itinerary
                  </a>
                )}
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-semibold text-[var(--dark)] mb-3">Package Details</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{pkg.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Group Size:</span>
                    <span className="font-medium">{pkg.maxGroupSize} people</span>
                  </div>
                  {pkg.minAge && (
                    <div className="flex justify-between">
                      <span>Min Age:</span>
                      <span className="font-medium">{pkg.minAge} years</span>
                    </div>
                  )}
                  {pkg.difficulty && (
                    <div className="flex justify-between">
                      <span>Difficulty:</span>
                      <span className="font-medium">{pkg.difficulty}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
