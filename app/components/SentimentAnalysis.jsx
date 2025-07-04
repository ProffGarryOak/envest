'use client';

import { useState, useEffect } from 'react';
import { Brain, TrendingUp, TrendingDown, Minus, RefreshCw, AlertCircle, BarChart3 } from 'lucide-react';

export default function SentimentAnalysis({ portfolioStocks = [], newsItems = [] }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAnalysis = async () => {
    if (!newsItems || newsItems.length === 0) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newsItems: newsItems.slice(0, 10) }) // Limit to 10 items
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to fetch analysis');
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, [newsItems]);

  const getSentimentIcon = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'negative':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <Minus className="w-5 h-5 text-gray-600" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getOverallSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return 'from-green-50 to-emerald-50 border-green-200';
      case 'negative':
        return 'from-red-50 to-rose-50 border-red-200';
      default:
        return 'from-gray-50 to-slate-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Brain className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Sentiment Analysis</h2>
            <p className="text-gray-600">AI-powered analysis of market sentiment</p>
          </div>
        </div>
        {data && (
          <button
            onClick={fetchAnalysis}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Analyzing...' : 'Refresh'}
          </button>
        )}
      </div>

      {loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Analyzing market sentiment...</span>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-white border border-red-200 rounded-xl p-6">
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <p className="text-red-600 font-medium">Analysis failed</p>
            <p className="text-sm text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchAnalysis}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : !data ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-center py-8">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No data available for analysis</p>
            <p className="text-sm text-gray-400">News data is required for sentiment analysis</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overall Sentiment */}
          <div className={`bg-gradient-to-r ${getOverallSentimentColor(data.overallSentiment)} border rounded-xl p-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  {getSentimentIcon(data.overallSentiment)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Overall Market Sentiment</h3>
                  <p className="text-2xl font-bold text-gray-900 capitalize">{data.overallSentiment}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Based on {data.analysis?.length || 0} articles</p>
                <p className="text-xs text-gray-500">Updated just now</p>
              </div>
            </div>
          </div>

          {/* Individual Analysis */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Detailed Analysis</h3>
              <p className="text-sm text-gray-600">Individual sentiment scores for each news article</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {data.analysis && data.analysis.map((item, idx) => (
                <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {getSentimentIcon(item.sentiment)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {item.newsTitle}
                      </h4>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSentimentColor(item.sentiment)}`}>
                          {item.sentiment}
                        </span>
                        <span className="text-sm text-gray-500">
                          Confidence: {item.confidence}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {item.reasoning}
                      </p>
                      
                      {item.affectedStocks && item.affectedStocks.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Affected Stocks:</span>
                          <div className="flex flex-wrap gap-1">
                            {item.affectedStocks.map((stock, stockIdx) => (
                              <span
                                key={stockIdx}
                                className={`px-2 py-1 text-xs rounded-full font-medium ${
                                  portfolioStocks.includes(stock)
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {stock}
                                {portfolioStocks.includes(stock) && (
                                  <span className="ml-1 text-blue-500">★</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}