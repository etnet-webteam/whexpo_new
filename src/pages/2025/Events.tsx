import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import '../../assets/styles/2025/minisite.css';

const Events2025: React.FC = () => {
  const upcomingEvents = [
    {
      title: 'Health Partnership Summit 2025',
      subtitle: '健康夥伴高峰會 2025',
      date: '2025年9月15日',
      time: '09:00 - 18:00',
      location: 'Hong Kong Convention and Exhibition Centre',
      type: 'Summit',
      description: 'Join industry leaders, healthcare professionals, and innovators for a day of insights on the future of health partnerships.',
      highlights: ['Keynote speakers', 'Panel discussions', 'Networking sessions', 'Innovation showcase'],
      status: 'registration-open'
    },
    {
      title: 'Digital Health Innovation Workshop',
      subtitle: '數碼健康創新工作坊',
      date: '2025年8月20日',
      time: '14:00 - 17:00',
      location: 'Cyberport, Hong Kong',
      type: 'Workshop',
      description: 'Hands-on workshop exploring the latest digital health technologies and their practical applications.',
      highlights: ['Tech demonstrations', 'Hands-on sessions', 'Expert guidance', 'Networking'],
      status: 'registration-open'
    },
    {
      title: 'Community Health Fair',
      subtitle: '社區健康博覽',
      date: '2025年8月5日',
      time: '10:00 - 16:00',
      location: 'Various Community Centers',
      type: 'Fair',
      description: 'Free health screenings, wellness activities, and educational sessions for the community.',
      highlights: ['Free health checks', 'Wellness activities', 'Health education', 'Family friendly'],
      status: 'registration-open'
    }
  ];

  const pastEvents = [
    {
      title: 'Awards Ceremony 2025',
      subtitle: '2025年頒獎典禮',
      date: '2025年7月10日',
      location: 'Four Seasons Hotel Hong Kong',
      type: 'Ceremony',
      description: 'Celebration of outstanding achievements in health and wellness partnerships.',
      attendees: '300+',
      highlights: ['Award presentations', 'Winner speeches', 'Gala dinner', 'Live entertainment']
    },
    {
      title: 'Mental Health Awareness Week',
      subtitle: '心理健康意識週',
      date: '2025年5月10-16日',
      location: 'Multiple Locations',
      type: 'Campaign',
      description: 'Week-long series of events promoting mental health awareness and support.',
      attendees: '5000+',
      highlights: ['Expert talks', 'Support groups', 'Wellness activities', 'Resource distribution']
    },
    {
      title: 'Nutrition and Wellness Expo',
      subtitle: '營養與健康博覽會',
      date: '2025年4月15日',
      location: 'AsiaWorld-Expo',
      type: 'Expo',
      description: 'Comprehensive exhibition showcasing nutrition products, wellness services, and health innovations.',
      attendees: '10000+',
      highlights: ['Product exhibitions', 'Expert consultations', 'Cooking demonstrations', 'Health talks']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Related Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover upcoming and past events that promote health and wellness in our community. 
            Join us in building stronger partnerships for a healthier future.
          </p>
        </div>

        {/* Upcoming Events */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Upcoming Events
            </h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {upcomingEvents.length} Events
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-medium">
                      {event.type}
                    </span>
                    <span className="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                      OPEN
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                  <h4 className="text-blue-100 text-lg mb-4">{event.subtitle}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-blue-100 text-sm">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <span className="mr-4">📅 {event.date}</span>
                      <span>⏰ {event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <span>📍 {event.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-900 mb-3">Event Highlights:</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {event.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-gray-600 text-sm">
                          <span className="text-blue-600 mr-2">✓</span>
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Events */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Past Events
            </h2>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {pastEvents.length} Events
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      {event.type}
                    </span>
                    <span className="text-blue-600 text-sm font-semibold">
                      {event.attendees} attended
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <h4 className="text-gray-600 mb-3">{event.subtitle}</h4>
                  
                  <div className="text-gray-500 text-sm mb-4">
                    <div className="flex items-center mb-1">
                      <span className="mr-2">📅</span>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="mb-4">
                    <h5 className="text-xs font-semibold text-gray-900 mb-2">Highlights:</h5>
                    <div className="flex flex-wrap gap-1">
                      {event.highlights.map((highlight, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200">
                    View Summary →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Event Calendar CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Stay Connected
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Don't miss out on future health and wellness events. Subscribe to our calendar 
            and be the first to know about upcoming opportunities to engage with our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
              Subscribe to Calendar
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 border border-white border-opacity-30">
              Contact Event Team
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events2025; 