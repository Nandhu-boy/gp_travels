'use client';
import { useEffect, useState } from 'react';
import { getAllInquiries, updateInquiryStatus } from '@/lib/firestore';
import { BookingInquiry } from '@/types';
import { MessageSquare, Phone, Mail, Calendar, Users, ExternalLink } from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<BookingInquiry | null>(null);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    const inqs = await getAllInquiries();
    setInquiries(inqs);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: BookingInquiry['status']) => {
    await updateInquiryStatus(id, status);
    loadInquiries();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-orange-100 text-orange-700';
      case 'contacted': return 'bg-blue-100 text-blue-700';
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Inquiries</h1>
        <p className="text-gray-600">Manage customer booking requests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inquiries List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">All Inquiries ({inquiries.length})</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {inquiries.map(inquiry => (
                <div
                  key={inquiry.id}
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedInquiry?.id === inquiry.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-full flex items-center justify-center text-white font-bold">
                        {inquiry.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                        <p className="text-sm text-gray-500">{inquiry.packageName || 'General inquiry'}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Mail size={14} />
                      {inquiry.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone size={14} />
                      {inquiry.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {inquiries.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries yet</h3>
                <p className="text-gray-500">Customer inquiries will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Inquiry Details */}
        <div className="lg:col-span-1">
          {selectedInquiry ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Inquiry Details</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{selectedInquiry.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{selectedInquiry.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-900">{selectedInquiry.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Package</label>
                  <p className="text-gray-900">{selectedInquiry.packageName || 'General inquiry'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                  <p className="text-gray-900">{selectedInquiry.travelDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
                  <p className="text-gray-900">{selectedInquiry.groupSize} people</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <p className="text-gray-900">{selectedInquiry.message}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Submitted</label>
                  <p className="text-gray-900">{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => updateStatus(selectedInquiry.id, e.target.value as BookingInquiry['status'])}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="space-y-3">
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  <Mail size={16} />
                  Send Email
                </a>
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/\D/g, '')}?text=Hi ${selectedInquiry.name}, regarding your inquiry for ${selectedInquiry.packageName || 'our services'}`}
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  <MessageSquare size={16} />
                  WhatsApp
                </a>
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="w-full flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  <Phone size={16} />
                  Call
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an inquiry</h3>
              <p className="text-gray-500">Click on an inquiry from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}