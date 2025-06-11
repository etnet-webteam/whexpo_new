import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import '../../assets/styles/2025/minisite.css';

const Column2025: React.FC = () => {
  const featuredArticles = [
    {
      title: 'Health as the New Wealth: Investment Trends in 2025',
      subtitle: '健康就是財富：2025年投資趨勢',
      author: 'Dr. Emily Chen',
      role: 'Chief Medical Officer, Hong Kong Health Foundation',
      date: '2025年6月15日',
      readTime: '8 min read',
      category: 'Investment',
      excerpt: 'Exploring how health-focused investments are reshaping the financial landscape and creating sustainable wealth for individuals and communities.',
      featured: true
    },
    {
      title: 'Digital Health Revolution in Hong Kong',
      subtitle: '香港數碼健康革命',
      author: 'Mr. David Wong',
      role: 'Healthcare Innovation Director',
      date: '2025年6月10日',
      readTime: '6 min read',
      category: 'Technology',
      excerpt: 'How digital health solutions are transforming healthcare delivery and patient outcomes across Hong Kong.'
    },
    {
      title: 'Mental Wellness in the Workplace',
      subtitle: '職場心理健康',
      author: 'Dr. Robert Kim',
      role: 'Mental Health Specialist',
      date: '2025年6月5日',
      readTime: '7 min read',
      category: 'Mental Health',
      excerpt: 'Strategies for creating mentally healthy work environments that boost productivity and employee satisfaction.'
    },
    {
      title: 'Sustainable Health Practices for Communities',
      subtitle: '社區可持續健康實踐',
      author: 'Ms. Jennifer Lee',
      role: 'Community Health Advocate',
      date: '2025年5月30日',
      readTime: '5 min read',
      category: 'Community Health',
      excerpt: 'Building sustainable health programs that create lasting positive impact in local communities.'
    },
    {
      title: 'Nutrition Science: Latest Research and Applications',
      subtitle: '營養科學：最新研究與應用',
      author: 'Prof. Sarah Liu',
      role: 'Professor of Nutrition Science, HKU',
      date: '2025年5月25日',
      readTime: '9 min read',
      category: 'Nutrition',
      excerpt: 'Recent breakthroughs in nutrition science and their practical applications for healthier living.'
    },
    {
      title: 'Corporate Wellness Programs: ROI and Impact',
      subtitle: '企業健康計劃：投資回報與影響',
      author: 'Dr. Michael Tang',
      role: 'Wellness Program Director',
      date: '2025年5月20日',
      readTime: '6 min read',
      category: 'Corporate Health',
      excerpt: 'Measuring the return on investment and long-term impact of comprehensive corporate wellness initiatives.'
    }
  ];

  const categories = [
    'All', 'Investment', 'Technology', 'Mental Health', 
    'Community Health', 'Nutrition', 'Corporate Health'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Expert Column
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights and perspectives from leading experts in health and wellness. 
            Stay informed with the latest trends, research, and best practices shaping the future of healthcare.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                index === 0 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 text-white">
              <div className="flex items-center mb-4">
                <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold mr-3">
                  FEATURED
                </span>
                <span className="text-blue-100 text-sm">{featuredArticles[0].category}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                {featuredArticles[0].title}
              </h2>
              <h3 className="text-xl text-blue-100 mb-6">
                {featuredArticles[0].subtitle}
              </h3>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                {featuredArticles[0].excerpt}
              </p>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">
                      {featuredArticles[0].author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{featuredArticles[0].author}</div>
                    <div className="text-blue-100 text-sm">{featuredArticles[0].role}</div>
                  </div>
                </div>
                <div className="flex items-center text-blue-100 text-sm">
                  <span className="mr-4">{featuredArticles[0].date}</span>
                  <span>{featuredArticles[0].readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.slice(1).map((article, index) => (
            <article key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-xs">{article.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {article.title}
                </h3>
                <h4 className="text-gray-600 text-sm mb-4">
                  {article.subtitle}
                </h4>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {article.excerpt}
                </p>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{article.author}</div>
                      <div className="text-gray-500 text-xs">{article.role}</div>
                    </div>
                    <div className="text-gray-500 text-xs">{article.date}</div>
                  </div>
                </div>
                
                <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Subscribe Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated with Expert Insights
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to receive the latest articles and insights from health and wellness experts, 
            delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Column2025; 