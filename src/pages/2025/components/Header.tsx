import React from 'react';
import '../../../assets/styles/2025/minisite.css';

const Header: React.FC = () => {
  return (
    <div className="whexpo-2025">
      <header className="whexpo-header">
        <div className="whexpo-header-container">
          <div className="whexpo-hero whexpo-hero-content">
            <h1 className="whexpo-h1 whexpo-text-dark text-4xl md:text-6xl font-normal mb-4">
              2025健康同行夥伴大獎
            </h1>
            <h2 className="whexpo-h2 text-2xl md:text-4xl font-light mb-6 opacity-90">
              Health Partnership Awards 2025
            </h2>
            <div className="flex justify-center space-x-4 mb-8">
              <button className="whexpo-lang-btn">
                繁
              </button>
              <button className="whexpo-lang-btn">
                EN
              </button>
            </div>
            <div className="text-center">
              <h3 className="whexpo-h3 text-xl md:text-2xl font-normal mb-2">
                健康資產 <span className="whexpo-accent">Healthy Assets</span>
              </h3>
              <h3 className="whexpo-h3 text-xl md:text-2xl font-normal">
                財富非凡 <span className="whexpo-accent">Extraordinary Wealth</span>
              </h3>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header; 