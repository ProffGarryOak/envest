'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, ExternalLink, Clock, Globe, Target, AlertCircle } from 'lucide-react';

export default function PortfolioNews({ portfolioStocks = [] }) {
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAndFilterNews() {
      if (!portfolioStocks || portfolioStocks.length === 0) {
        setFilteredNews([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        
        const filtered = data.news.filter(item => 
          portfolioStocks.some(stock => 
            item.title.toLowerCase().includes(stock.toLowerCase()) ||
            item.title.toLowerCase().includes(stock.toLowerCase().replace(/\d+/g, ''))
          )
        );
        
        setFilteredNews(filtered);
      } catch (error) {
        setError(error.message || 'Failed to fetch portfolio news');
        setFilteredNews([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAndFilterNews();
  }, [portfolioStocks]);

  const getMatchingStocks = (newsTitle) => {
    return portfolioStocks.filter(stock => 
      newsTitle.toLowerCase().includes(stock.toLowerCase()) ||
      newsTitle.toLowerCase().includes(stock.toLowerCase().replace(/\d+/g, ''))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Target className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portfolio News</h2>
          <p className="text-gray-600">
            News specifically related to your {portfolioStocks.length} tracked stocks
          </p>
        </div>
      </div>

      {portfolioStocks.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No stocks in your portfolio</p>
            <p className="text-sm text-gray-400">Add stocks to your portfolio to see relevant news</p>
          </div>
        </div>
      ) : loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Finding news for your portfolio...</span>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-white border border-red-200 rounded-xl p-6">
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <p className="text-red-600 font-medium">Unable to fetch portfolio news</p>
            <p className="text-sm text-red-500">{error}</p>
          </div>
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No relevant news found</p>
            <p className="text-sm text-gray-400">
              No recent news found for: {portfolioStocks.join(', ')}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {filteredNews.length} relevant articles found
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Tracking:</span>
                <div className="flex gap-1">
                  {portfolioStocks.slice(0, 3).map((stock) => (
                    <span
                      key={stock}
                      className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium"
                    >
                      {stock}
                    </span>
                  ))}
                  {portfolioStocks.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{portfolioStocks.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredNews.map((item, index) => {
              const matchingStocks = getMatchingStocks(item.title);
              return (
                <article
                  key={index}
                  className="p-6 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        {matchingStocks.map((stock) => (
                          <span
                            key={stock}
                            className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium"
                          >
                            {stock}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2"
                        >
                          <span className="flex-1">{item.title}</span>
                          <ExternalLink className="w-4 h-4 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          <span>{item.source}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}