import React from 'react';
import { Award, Users, Globe, Heart, Target, Zap, Shield, Truck } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make is centered around providing the best experience for our customers.'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: '40-point quality checks ensure every device meets our strict certification standards.'
    },
    {
      icon: Zap,
      title: 'Sustainability',
      description: 'Reducing e-waste and promoting circular economy through refurbished electronics.'
    },
    {
      icon: Shield,
      title: 'Trust & Reliability',
      description: 'Certified refurbished devices backed by comprehensive warranty and support.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Devices Refurbished' },
    // { number: '500+', label: 'Products' },
    { number: '100+', label: 'Cities Served' },
    { number: '20 Tons', label: 'E-Waste Prevented' }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      description: 'Visionary leader with 15+ years in the appliance industry.'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
      description: 'Expert in supply chain management and customer service.'
    },
    {
      name: 'Amit Patel',
      role: 'Technology Director',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg',
      description: 'Leading our digital transformation and innovation initiatives.'
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-16">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-normal mb-3 text-[#0f1111]">About Reeown</h1>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Leading the way in sustainable technology with premium refurbished electronics for everyone
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/products">
                <Button variant="primary" size="sm" className="text-xs">Shop Now</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="sm" className="text-xs">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-normal text-green-700 mb-1">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h2 className="text-lg sm:text-xl font-normal mb-4 text-[#0f1111]">Our Story</h2>
                <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                  <p>
                    Reeown was founded with a simple mission: make premium technology accessible while protecting our planet. We believe everyone deserves quality electronics without the premium price tag or environmental cost.
                  </p>
                  <p>
                    Each device undergoes comprehensive 40-point testing and certification, ensuring it meets strict quality standards. When you choose Reeown, you're making a smart financial decision and an environmentally conscious choice that helps combat e-waste.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3637728/pexels-photo-3637728.jpeg"
                  alt="About Us"
                  className="rounded w-full h-64 sm:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-base sm:text-lg font-normal mb-3 text-[#0f1111]">Our Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To make premium certified refurbished electronics accessible to everyone while reducing e-waste and promoting sustainable technology consumption for a better tomorrow.
              </p>
            </div>
            <div>
              <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-base sm:text-lg font-normal mb-3 text-[#0f1111]">Our Vision</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To be India's leading platform for certified refurbished electronics, creating a circular economy that benefits people and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-normal mb-2 text-[#0f1111]">Our Values</h2>
            <p className="text-sm text-gray-600 max-w-2xl">
              The principles that guide our commitment to quality and sustainability
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white border border-gray-200 p-4 sm:p-6 rounded text-center hover:border-green-500 transition-colors">
                <div className="bg-green-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-5 w-5 text-green-700" />
                </div>
                <h3 className="text-sm sm:text-base font-normal mb-2 text-[#0f1111]">{value.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The passionate people behind Reeown's success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-green-600/20 rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Why Choose Us */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Reeown?</h2>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
              Your trusted partner for quality refurbished electronics and sustainable technology solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-200">Free shipping on all refurbished devices across India</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-200">Every device is thoroughly tested and certified before sale</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-200">Dedicated customer support team available 24/7</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-gray-200">Reducing e-waste through sustainable refurbishment</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-gray-600 text-lg mb-8">
              Join thousands of satisfied customers who trust Reeown for quality refurbished electronics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="primary" size="lg">Start Shopping</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">Get in Touch</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;