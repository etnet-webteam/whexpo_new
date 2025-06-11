import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import '../../assets/styles/2025/minisite.css';

const Highlights2025: React.FC = () => {
  const highlights = [
    {
      title: 'Record-Breaking Participation',
      date: '2025年1月',
      description: 'Over 200 organizations participated in the Health Partnership Awards 2025, marking the highest participation rate in the awards\' six-year history.',
      category: 'Participation',
      stats: '200+ participants'
    },
    {
      title: 'Innovation in Digital Health',
      date: '2025年2月',
      description: 'Revolutionary digital health solutions were showcased, demonstrating the growing intersection of technology and healthcare in Hong Kong.',
      category: 'Innovation',
      stats: '50+ tech solutions'
    },
    {
      title: 'Community Health Impact',
      date: '2025年3月',
      description: 'Winners collectively impacted over 1 million Hong Kong residents through their health and wellness initiatives.',
      category: 'Impact',
      stats: '1M+ lives touched'
    },
    {
      title: 'Sustainable Health Practices',
      date: '2025年4月',
      description: 'Emphasis on sustainable corporate social responsibility initiatives that promote long-term community health benefits.',
      category: 'Sustainability',
      stats: '30+ CSR programs'
    },
    {
      title: 'Mental Health Awareness',
      date: '2025年5月',
      description: 'Significant focus on mental health and psychological wellness, reflecting growing awareness of holistic health approaches.',
      category: 'Mental Health',
      stats: '15+ programs'
    },
    {
      title: 'Cross-Sector Partnerships',
      date: '2025年6月',
      description: 'Unprecedented collaboration between healthcare providers, technology companies, and community organizations.',
      category: 'Partnership',
      stats: '100+ partnerships'
    }
  ];

  const keyMetrics = [
    { metric: '200+', label: 'Participating Organizations', icon: '🏢' },
    { metric: '12', label: 'Award Categories', icon: '🏆' },
    { metric: '1M+', label: 'Lives Impacted', icon: '❤️' },
    { metric: '6th', label: 'Consecutive Year', icon: '📅' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Highlights 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating outstanding achievements and key moments from the Health Partnership Awards 2025. 
            Discover how our participants are transforming health and wellness across Hong Kong.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {keyMetrics.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{item.metric}</div>
              <div className="text-gray-600 text-sm">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Highlights Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Key Achievements Timeline
          </h2>
          <div className="space-y-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="md:w-1/4 bg-gradient-to-br from-blue-600 to-purple-700 p-6 flex flex-col justify-center">
                  <div className="text-white text-center">
                    <div className="text-sm opacity-80 mb-2">{highlight.date}</div>
                    <div className="text-2xl font-bold mb-2">{highlight.stats}</div>
                    <div className="text-sm opacity-80">{highlight.category}</div>
                  </div>
                </div>
                <div className="md:w-3/4 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards Impact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Awards Impact
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              The Health Partnership Awards 2025 continues to drive positive change in Hong Kong's health and wellness landscape, 
              fostering innovation and collaboration across all sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🌟</div>
              <h3 className="text-xl font-semibold mb-2">Excellence Recognition</h3>
              <p className="text-blue-100 text-sm">
                Highlighting organizations that set new standards in health and wellness innovation
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Community Building</h3>
              <p className="text-blue-100 text-sm">
                Strengthening partnerships between healthcare providers, businesses, and communities
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Future Innovation</h3>
              <p className="text-blue-100 text-sm">
                Inspiring continued innovation and investment in health technology and services
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Highlights2025; 