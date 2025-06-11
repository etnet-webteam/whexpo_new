import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import '../../assets/styles/2025/minisite.css';

const Home: React.FC = () => {
  return (
    <div className="whexpo-2025-bg whexpo-2025 min-h-screen">
      <Header />
      <Navigation />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Home; 