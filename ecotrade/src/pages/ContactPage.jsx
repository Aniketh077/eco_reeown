import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin, Phone, Mail, Send, MessageCircle, Headphones, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { submitContactForm, resetContactState } from '../store/slices/newsletterContactSlice';
import { useToast } from '../contexts/ToastContext';
import  FAQModal from '../components/FAQModal/FAQModal';
import { getContactPageFAQs } from '../data/faqData';

const ContactPage = () => {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
  
  // Redux state
  const { 
    contactSubmitting, 
    contactSubmitted, 
    contactError 
  } = useSelector(state => state.newsletterContact);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showError('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showError('Please enter a valid email address');
      return;
    }

    try {
      await dispatch(submitContactForm(formData)).unwrap();
      showSuccess('Your message has been sent successfully! We\'ll get back to you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      showError(error.message || 'Failed to send message. Please try again.');
    }
  };

  // Handle success/error states
  useEffect(() => {
    if (contactSubmitted) {
      // Reset the state after showing success
      const timer = setTimeout(() => {
        dispatch(resetContactState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [contactSubmitted, dispatch]);

  useEffect(() => {
    if (contactError) {
      // Reset error state after 5 seconds
      const timer = setTimeout(() => {
        dispatch(resetContactState());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [contactError, dispatch]);

  // Handler functions for actions
  const handleGetDirections = () => {
    const address = "123 Electronics Plaza, Andheri West, Mumbai 400058, Maharashtra, India";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleCallNow = () => {
    window.open('tel:8008030203');
  };

  const handleSendEmail = () => {
    window.open('mailto:team@eco-dispose.com');
  };

  const handleLiveChat = () => {
    const whatsappNumber = '8861009443';
    const message = 'Hello! I would like to get assistance with Reeown refurbished electronics.';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: ['88610 09443', 'Customer Support', 'Mon-Sat: 9AM-6PM'],
      action: 'Call Now',
      onClick: handleCallNow
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['team@eco-dispose.com', 'We reply within 24 hours'],
      action: 'Send Email',
      onClick: handleSendEmail
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      details: ['Available 24/7', 'Instant responses', 'Expert assistance'],
      action: 'Start Chat',
      onClick: handleLiveChat
    }
  ];

  const departments = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Products' },
    { value: 'support', label: 'Technical Support' },
    { value: 'warranty', label: 'Warranty Claims' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'partnership', label: 'Business Partnership' }
  ];

  const faqs = getContactPageFAQs();

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="py-6 sm:py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-normal mb-3 text-[#0f1111]">Get in Touch</h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Have questions about our refurbished electronics? Our expert team is ready to help you find the perfect device for your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-6 sm:py-8 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white border border-gray-200 p-4 sm:p-5 rounded hover:border-green-500 transition-all duration-200 flex flex-col h-full">
                <div className="bg-green-50 w-10 h-10 rounded-full flex items-center justify-center mb-3 flex-shrink-0">
                  <info.icon className="h-5 w-5 text-green-700" />
                </div>
                <h3 className="text-sm sm:text-base font-normal mb-3 text-[#0f1111]">{info.title}</h3>
                <div className="space-y-1.5 mb-4 flex-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-xs sm:text-sm text-gray-600 leading-relaxed">{detail}</p>
                  ))}
                </div>
                <button 
                  onClick={info.onClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-normal py-2 px-4 rounded text-xs sm:text-sm transition-colors mt-auto"
                >
                  {info.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Form */}
            <div>
              <h2 className="text-lg sm:text-xl font-normal mb-3 text-[#0f1111]">Send us a Message</h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Have a question or need assistance? Fill out the form below and our team will get back to you within 24 hours.
              </p>

              {contactSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-600">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <Input
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      fullWidth
                      placeholder="Enter your full name"
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      fullWidth
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <Input
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      fullWidth
                      placeholder="Enter your phone number"
                    />
                    <div className="w-full">
                      <label className="block text-xs sm:text-sm font-normal text-gray-700 mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-xs sm:text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                      >
                        <option value="">Select a subject</option>
                        {departments.map((dept) => (
                          <option key={dept.value} value={dept.value}>
                            {dept.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-normal text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-xs sm:text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  
                  {contactError && (
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <p className="text-red-600 text-xs sm:text-sm">
                        {contactError.message || 'An error occurred. Please try again.'}
                      </p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-normal py-2.5 px-4 rounded text-xs sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {contactSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Additional Info */}
            <div>
              <h2 className="text-lg sm:text-xl font-normal mb-4 text-[#0f1111]">Need Immediate Help?</h2>

              {/* Quick Contact */}
              <div className="bg-gray-50 border border-gray-200 rounded p-4 sm:p-5">
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  Our customer support team is available 24/7 to assist you with any questions or concerns.
                </p>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={handleCallNow}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-normal py-2 px-4 rounded text-xs sm:text-sm transition-colors"
                  >
                    Call Now
                  </button>
                  <button 
                    onClick={handleLiveChat}
                    className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-normal py-2 px-4 rounded text-xs sm:text-sm transition-colors"
                  >
                    Live Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-6 sm:py-8 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-normal mb-2 text-[#0f1111]">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Quick answers to common questions about our products and services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 p-4 rounded">
                <h3 className="text-sm font-normal mb-2 text-[#0f1111]">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4 sm:mt-6">
            <button 
              onClick={() => setIsFAQModalOpen(true)}
              className="text-xs sm:text-sm text-green-700 hover:text-green-800 hover:underline"
            >
              View All FAQs →
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Modal */}
      <FAQModal 
        isOpen={isFAQModalOpen} 
        onClose={() => setIsFAQModalOpen(false)} 
      />

      {/* Support Team */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-50 border border-gray-200 rounded p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-normal mb-3 text-[#0f1111]">Ready to Go Green?</h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                Get instant support through WhatsApp or call our dedicated team.
                Experience quality certified refurbished electronics with expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={handleLiveChat}
                  className="bg-green-600 hover:bg-green-700 text-white font-normal py-2 px-4 rounded text-xs sm:text-sm transition-colors"
                >
                  Chat on WhatsApp
                </button>
                <button 
                  onClick={handleCallNow}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-normal py-2 px-4 rounded text-xs sm:text-sm transition-colors"
                >
                  Call Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;