import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import '../../assets/styles/2025/minisite.css';

const Judges2025: React.FC = () => {
  const judges = [
    {
      name: 'Dr. Michael Wong',
      title: 'Director of Public Health',
      organization: 'Hong Kong Medical Association',
      expertise: ['Public Health Policy', 'Preventive Medicine', 'Health Economics'],
      description: 'Leading expert in public health with over 20 years of experience in healthcare policy development and implementation.'
    },
    {
      name: 'Sarah Chen',
      title: 'Senior Health Advisor',
      organization: 'Cyberport Health Innovation Hub',
      expertise: ['Digital Health', 'HealthTech Innovation', 'Startup Mentoring'],
      description: 'Pioneer in digital health innovation with extensive experience in health technology commercialization.'
    },
    {
      name: 'Professor James Liu',
      title: 'Chair of Nutrition Science',
      organization: 'The University of Hong Kong',
      expertise: ['Nutrition Research', 'Food Safety', 'Dietary Guidelines'],
      description: 'Renowned nutrition scientist specializing in Asian dietary patterns and nutritional health outcomes.'
    },
    {
      name: 'Amanda Cheung',
      title: 'Executive Director',
      organization: 'Hong Kong Health Foundation',
      expertise: ['Community Health', 'Health Promotion', 'Wellness Programs'],
      description: 'Dedicated advocate for community health with a focus on preventive care and wellness education.'
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
            Expert Judges Panel
          </h1>
          <p className="whexpo-p text-xl max-w-3xl mx-auto">
            Our distinguished panel of judges brings together leading experts from healthcare, 
            innovation, and community wellness to evaluate and recognize excellence in health partnerships.
          </p>
        </div>

        {/* Judges Grid */}
        <div className="whexpo-grid whexpo-mb-section whexpo-px-section">
          {judges.map((judge, index) => (
            <div key={index} className="whexpo-grid-item whexpo-grid-item-half whexpo-card whexpo-fade-in">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {judge.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="whexpo-h3 whexpo-text-dark font-normal text-lg">
                    {judge.name}
                  </h3>
                  <p className="whexpo-h6 whexpo-primary font-medium">
                    {judge.title}
                  </p>
                  <p className="whexpo-h6 whexpo-secondary">
                    {judge.organization}
                  </p>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {judge.expertise.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 text-xs rounded-full bg-blue-100 whexpo-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="whexpo-p whexpo-text-dark text-center leading-relaxed">
                  {judge.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Judging Criteria Section */}
        <div className="whexpo-hero whexpo-py-section whexpo-px-section">
          <div className="whexpo-hero-content whexpo-section-narrow mx-auto">
            <h2 className="whexpo-h1 text-3xl font-normal mb-6 text-center">
              Judging Criteria
            </h2>
            <div className="whexpo-grid">
              <div className="whexpo-grid-item whexpo-grid-item-third whexpo-card bg-white p-6">
                <h3 className="whexpo-h3 whexpo-text-dark font-normal mb-3">Innovation & Impact</h3>
                <p className="whexpo-p whexpo-text-dark text-sm">
                  Evaluation of innovative approaches and measurable positive impact on health outcomes.
                </p>
              </div>
              <div className="whexpo-grid-item whexpo-grid-item-third whexpo-card bg-white p-6">
                <h3 className="whexpo-h3 whexpo-text-dark font-normal mb-3">Community Benefit</h3>
                <p className="whexpo-p whexpo-text-dark text-sm">
                  Assessment of contributions to community health and wellness promotion.
                </p>
              </div>
              <div className="whexpo-grid-item whexpo-grid-item-third whexpo-card bg-white p-6">
                <h3 className="whexpo-h3 whexpo-text-dark font-normal mb-3">Sustainability</h3>
                <p className="whexpo-p whexpo-text-dark text-sm">
                  Consideration of long-term viability and environmental responsibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Judges2025; 