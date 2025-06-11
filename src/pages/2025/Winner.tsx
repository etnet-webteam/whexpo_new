import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import '../../assets/styles/2025/minisite.css';

const Winner2025: React.FC = () => {
  const winners = [
    {
      category: 'Beauty & Fitness',
      winner: 'Outstanding Beauty & Fitness Company 2025',
      description: 'Recognized for excellence in promoting health and beauty through innovative fitness programs and wellness solutions.'
    },
    {
      category: 'Health & Personal Care Product',
      winner: 'Leading Health Care Product 2025',
      description: 'Awarded for developing cutting-edge personal care products that enhance daily health routines.'
    },
    {
      category: 'Health Food & Supplement',
      winner: 'Premium Health Supplement Brand 2025',
      description: 'Honored for providing high-quality nutritional supplements that support overall wellness.'
    },
    {
      category: 'Health Innovation',
      winner: 'Revolutionary Health Tech Company 2025',
      description: 'Celebrated for groundbreaking innovations in health technology and digital wellness solutions.'
    },
    {
      category: 'Health Protection & Planning',
      winner: 'Trusted Health Insurance Provider 2025',
      description: 'Recognized for comprehensive health protection plans and excellent customer service.'
    },
    {
      category: 'Healthy Community Partnership',
      winner: 'Community Health Initiative 2025',
      description: 'Awarded for outstanding community outreach and health education programs.'
    }
  ];

  return (
    <div className="whexpo-2025-bg whexpo-2025 min-h-screen">
      <Header />
      <Navigation />
      
      <main className="whexpo-section whexpo-mt-section">
        {/* Hero Section */}
        <div className="text-center whexpo-mb-section whexpo-px-section">
          <h1 className="whexpo-h1 whexpo-text-dark text-5xl font-normal mb-6">
            Winners 2025
          </h1>
          <p className="whexpo-p text-xl max-w-3xl mx-auto">
            Celebrating excellence in health and wellness partnerships. 
            Congratulations to all our distinguished winners who have made outstanding contributions 
            to promoting healthy living and community well-being.
          </p>
        </div>

        {/* Winners Grid */}
        <div className="whexpo-grid whexpo-mb-section whexpo-px-section">
          {winners.map((winner, index) => (
            <div key={index} className="whexpo-grid-item whexpo-grid-item-half whexpo-card whexpo-fade-in overflow-hidden">
              <div className="whexpo-hero p-6">
                <h2 className="whexpo-h2 text-xl font-normal">{winner.category}</h2>
              </div>
              <div className="p-6">
                <h3 className="whexpo-h3 whexpo-text-dark font-normal mb-3">
                  {winner.winner}
                </h3>
                <p className="whexpo-p whexpo-text-dark leading-relaxed">
                  {winner.description}
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whexpo-accent bg-yellow-100">
                    🏆 Winner 2025
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Results CTA */}
        <div className="whexpo-hero whexpo-py-section whexpo-px-section text-center">
          <div className="whexpo-hero-content">
            <h2 className="whexpo-h1 text-3xl font-normal mb-4">
              View Complete Results
            </h2>
            <p className="whexpo-p text-xl mb-6 opacity-90">
              Discover all winners across every category and learn about their remarkable achievements.
            </p>
            <button className="whexpo-btn whexpo-accent">
              View Full Results
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Winner2025; 