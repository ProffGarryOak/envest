'use client';

import { useState, useEffect } from 'react';
import { Newspaper, RefreshCw, ExternalLink, Clock, Globe } from 'lucide-react';

export default function NewsSection({ onNewsLoaded = () => {} }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError('');
    
    try {
      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setNews(data.news || []);
      onNewsLoaded(data.news || []);
    } catch (error) {
      setError(error.message || 'Unknown error');
      setNews([]);
      onNewsLoaded([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleRefresh = () => {
    fetchNews(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Newspaper className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Market News</h2>
            <p className="text-gray-600">Latest updates from the stock market</p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Loading latest news...</span>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-white border border-red-200 rounded-xl p-6">
          <div className="text-center py-8">
            <div className="text-red-600 mb-4">
              <Globe className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="font-medium">Unable to fetch news</p>
              <p className="text-sm text-red-500">{error}</p>
            </div>
            <button
              onClick={() => fetchNews()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : news.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-center py-8">
            <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No news available at the moment</p>
            <p className="text-sm text-gray-400">Please check back later</p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {news.length} articles found
              </span>
              <span className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {news.map((item, index) => (
              <article
                key={index}
                className="p-6 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Newspaper className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}