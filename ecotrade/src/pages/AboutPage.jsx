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
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 tracking-tight">About Reeown</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-8 sm:mb-10 leading-relaxed font-normal">
              Leading the way in sustainable technology with premium refurbished electronics for everyone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-green-700 font-semibold">
                  Shop Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-green-700 font-semibold">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 sm:p-6 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-700 mb-2 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-gray-900 tracking-tight">Our Story</h2>
                <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                  <p>
                    Reeown was founded with a simple mission: make premium technology accessible while protecting our planet. We believe everyone deserves quality electronics without the premium price tag or environmental cost.
                  </p>
                  <p>
                    Each device undergoes comprehensive 40-point testing and certification, ensuring it meets strict quality standards. When you choose Reeown, you're making a smart financial decision and an environmentally conscious choice that helps combat e-waste.
                  </p>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1920"
                  alt="About US"
                  className="h-80 sm:h-96 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
            <div className="bg-white p-8 sm:p-10 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-green-50 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                To make premium certified refurbished electronics accessible to everyone while reducing e-waste and promoting sustainable technology consumption for a better tomorrow.
              </p>
            </div>
            <div className="bg-white p-8 sm:p-10 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-green-50 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                To be India's leading platform for certified refurbished electronics, creating a circular economy that benefits people and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">Our Values</h2>
            <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              The principles that guide our commitment to quality and sustainability
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-sm text-center hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-green-300">
                <div className="bg-green-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                  <value.icon className="h-7 w-7 sm:h-8 sm:w-8 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{value.description}</p>
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
      <section className="py-16 sm:py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Why Choose Reeown?</h2>
            <p className="text-gray-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Your trusted partner for quality refurbished electronics and sustainable technology solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
            <div className="text-center p-6 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
              <div className="bg-white/20 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Free Shipping</h3>
              <p className="text-gray-100 text-sm sm:text-base">Free shipping on all refurbished devices across India</p>
            </div>
            
            <div className="text-center p-6 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
              <div className="bg-white/20 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Quality Assured</h3>
              <p className="text-gray-100 text-sm sm:text-base">Every device is thoroughly tested and certified before sale</p>
            </div>
            
            <div className="text-center p-6 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
              <div className="bg-white/20 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-gray-100 text-sm sm:text-base">Dedicated customer support team available 24/7</p>
            </div>
            
            <div className="text-center p-6 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
              <div className="bg-white/20 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Eco-Friendly</h3>
              <p className="text-gray-100 text-sm sm:text-base">Reducing e-waste through sustainable refurbishment</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 tracking-tight">Ready to Make a Difference?</h2>
            <p className="text-gray-700 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
              Join thousands of satisfied customers who trust Reeown for quality refurbished electronics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="primary" size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold">Start Shopping</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-2 border-gray-900 hover:border-green-600 hover:text-green-600 font-semibold">Get in Touch</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;