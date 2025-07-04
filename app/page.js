'use client';

import { useState, useEffect } from 'react';
import PortfolioForm from './components/PortfolioForm';
import NewsSection from './components/NewsSection';
import PortfolioNews from './components/PortfolioNews';
import SentimentAnalysis from './components/SentimentAnalysis';
import { TrendingUp, Activity, Bell, Settings, Newspaper, Briefcase } from 'lucide-react';

export default function Home() {
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [newsView, setNewsView] = useState('portfolio'); // 'portfolio', 'all', or 'sentiment'

  // Fetch initial portfolio
  useEffect(() => {
    async function fetchInitialPortfolio() {
      try {
        const response = await fetch('/api/portfolio?userId=default');
        const data = await response.json();
        if (data.stocks) {
          setPortfolioStocks(data.stocks.map(stock => stock.symbol));
        }
      } catch (error) {
        // silent fail
      }
    }
    fetchInitialPortfolio();
  }, []);

  const handlePortfolioUpdate = (stocks) => {
    setPortfolioStocks(stocks);
  };

  const handleNewsLoaded = (items) => {
    setNewsItems(items);
    setLoadingNews(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'portfolio', label: 'Portfolio', icon: Activity },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                <span className="text-blue-600">Envest</span> Analytics
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Main Content */}
            <div className="flex-1 space-y-6">
              {/* Portfolio Form Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                    Your Investment Portfolio
                  </h2>
                  <PortfolioForm 
                    onPortfolioUpdate={handlePortfolioUpdate}
                    portfolioStocks={portfolioStocks}
                  />
                </div>
              </div>

              {/* Sentiment Analysis Card */}
              {portfolioStocks.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Sentiment Analysis</h2>
                    <SentimentAnalysis 
                      portfolioStocks={portfolioStocks}
                      newsItems={newsItems}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - News Section */}
            <div className="w-full lg:w-96 flex flex-col">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
                {/* News Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px">
                    <button
                      onClick={() => setNewsView('portfolio')}
                      className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2 ${
                        newsView === 'portfolio'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Activity className="w-4 h-4" />
                      Portfolio News
                    </button>
                    <button
                      onClick={() => setNewsView('all')}
                      className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2 ${
                        newsView === 'all'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Newspaper className="w-4 h-4" />
                      All News
                    </button>
                  </nav>
                </div>

                {/* News Content */}
                <div className="flex-1 overflow-y-auto">
                  {newsView === 'portfolio' ? (
                    <PortfolioNews portfolioStocks={portfolioStocks} />
                  ) : (
                    <NewsSection onNewsLoaded={handleNewsLoaded} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Portfolio Form */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Manage Your Portfolio</h2>
                <PortfolioForm 
                  onPortfolioUpdate={handlePortfolioUpdate}
                  portfolioStocks={portfolioStocks}
                />
              </div>
            </div>

            {/* Portfolio News */}
            {portfolioStocks.length > 0 && (
              <div className="w-full lg:w-96">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Portfolio News</h2>
                    <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                      <PortfolioNews portfolioStocks={portfolioStocks} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Custom Alerts Coming Soon</h3>
              <p className="text-gray-600">
  We&apos;re working on a powerful alert system to notify you about important market movements and news related to your portfolio.
</p>

            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">User Settings</h3>
              <p className="text-gray-600">
                Customize your dashboard, notification preferences, and account settings here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}