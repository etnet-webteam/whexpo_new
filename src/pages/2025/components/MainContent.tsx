import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/2025/minisite.css';

const MainContent: React.FC = () => {
  const awardCategories = [
    'Beauty & Fitness',
    'Health & Personal Care Product',
    'Health Food & Supplement',
    'Health Innovation',
    'Health Protection & Planning',
    'Healthy Community Partnership',
    'Healthy Entrepreneurship',
    'Hospital Service',
    'Marketing Campaign',
    'Medical & Professional Service',
    'Sustainable Corporate Social Responsibility',
    'Wellness & Therapeutic'
  ];

  return (
    <main className="whexpo-2025-bg whexpo-2025">
      {/* Theme Section */}
      <section className="whexpo-section whexpo-py-section">
        <div className="whexpo-px-section">
          <div className="text-center whexpo-mb-section">
            <h2 className="whexpo-h1 whexpo-text-dark text-4xl font-normal mb-6">
              健康資產 財富非凡
            </h2>
            <h3 className="whexpo-h2 whexpo-primary text-3xl font-light mb-8">
              Healthy Assets Extraordinary Wealth
            </h3>
          </div>
          
          <div className="whexpo-section-narrow mx-auto whexpo-text-dark leading-relaxed">
            <p className="whexpo-p mb-6">
              In this rapidly changing era, health has become not just the cornerstone of life but also a valuable asset. 
              As we often say, health is the greatest wealth.
            </p>
            <p className="whexpo-p mb-6">
              The theme this time is "Healthy Assets Extraordinary Wealth" which not only reminds us to prioritize our 
              physical and mental well-being but also emphasizes the close connection between health and wealth. Good health 
              enhances our quality of life, boosts our productivity, and ultimately impacts our financial situation. 
              Investing in health is paving the way for future wealth.
            </p>
            <p className="whexpo-p mb-6">
              etnet is hosting the Health Partnership Awards for the sixth consecutive year, aiming to raise public awareness 
              about the importance of healthy living and quality wealth management. The awards recognize individuals and 
              organizations that have made outstanding contributions to healthcare, financial products, and social contributions, 
              especially in promoting healthy lifestyles and enhancing community welfare. They are our health partners.
            </p>
            <p className="whexpo-p">
              Let us work together to embed the concept of health into every corner of society, making everyone aware that 
              health is an asset worth cherishing and investing in. We hope that everyone will find inspiration in the 
              upcoming activities, share experiences, and strive together for a healthier future.
            </p>
          </div>
        </div>
      </section>

      {/* Award Categories Section */}
      <section className="whexpo-section whexpo-py-section">
        <div className="whexpo-px-section">
          <div className="text-center whexpo-mb-section">
            <h2 className="whexpo-h1 whexpo-text-dark text-4xl font-normal mb-4">
              獎項類別
            </h2>
            <h3 className="whexpo-h2 whexpo-primary text-3xl font-light">
              Award Categories
            </h3>
          </div>
          
          <div className="whexpo-grid">
            {awardCategories.map((category, index) => (
              <div 
                key={index}
                className="whexpo-grid-item whexpo-grid-item-third whexpo-card whexpo-fade-in p-6 text-center"
              >
                <h3 className="whexpo-h3 whexpo-text-dark font-normal">
                  {category}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="whexpo-section-full whexpo-hero whexpo-py-section">
        <div className="whexpo-hero-content text-center">
          <h2 className="whexpo-h1 text-3xl font-normal mb-4">
            Health Partnership Awards 2025
          </h2>
          <p className="whexpo-p text-xl mb-8 opacity-90">
            Join us in celebrating health and wellness excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/2025/winner"
              className="whexpo-btn whexpo-accent"
            >
              View Results
            </Link>
            <Link 
              to="/2025/form"
              className="whexpo-btn-outline"
            >
              Submit Application
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent; 