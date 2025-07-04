'use client';

import { useState } from 'react';
import { X, Plus, TrendingUp, Building2 } from 'lucide-react';

export default function PortfolioManager({ onPortfolioUpdate, portfolioStocks = [] }) {
  const [newStock, setNewStock] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAddStock = async (e) => {
    e.preventDefault();
    if (!newStock.trim()) return;

    setIsSubmitting(true);
    setError('');
    
    try {
      const stockSymbol = newStock.trim().toUpperCase();
      
      // Check if stock already exists
      if (portfolioStocks.includes(stockSymbol)) {
        setError('Stock already exists in your portfolio');
        setIsSubmitting(false);
        return;
      }

      const updatedStocks = [...portfolioStocks, stockSymbol];
      
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stocks: updatedStocks.map(symbol => ({ symbol })) }),
      });
      
      if (response.ok) {
        onPortfolioUpdate(updatedStocks);
        setNewStock('');
      } else {
        throw new Error('Failed to add stock');
      }
    } catch (error) {
      setError(error.message || 'Failed to add stock');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveStock = async (stockToRemove) => {
    try {
      const updatedStocks = portfolioStocks.filter(stock => stock !== stockToRemove);
      
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stocks: updatedStocks.map(symbol => ({ symbol })) }),
      });
      
      if (response.ok) {
        onPortfolioUpdate(updatedStocks);
      }
    } catch (error) {
      console.error('Failed to remove stock:', error);
    }
  };

  const popularStocks = ['SEBI', 'JANE', 'TCS', 'RELIANCE', 'ICICIBANK', 'SBIN', 'BHARTIARTL', 'ITC'];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Building2 className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Manager</h2>
          <p className="text-gray-600">Track your favorite stocks and get personalized news</p>
        </div>
      </div>

      {/* Add Stock Form */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Stock</h3>
        <form onSubmit={handleAddStock} className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-gray-700"
                placeholder="Enter stock symbol (e.g., RELIANCE)"
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !newStock.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-sm transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Stock
                </>
              )}
            </button>
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}
        </form>

        {/* Popular Stocks */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Stocks</h4>
          <div className="flex flex-wrap gap-2">
            {popularStocks.map((stock) => (
              <button
                key={stock}
                onClick={() => setNewStock(stock)}
                className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-blue-300 transition-colors"
                disabled={portfolioStocks.includes(stock)}
              >
                {stock}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Portfolio */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Portfolio</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {portfolioStocks.length} stocks
          </span>
        </div>
        
        {portfolioStocks.length === 0 ? (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No stocks in your portfolio yet</p>
            <p className="text-sm text-gray-400">Add some stocks to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {portfolioStocks.map((stock) => (
              <div
                key={stock}
                className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {stock.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">{stock}</span>
                </div>
                <button
                  onClick={() => handleRemoveStock(stock)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Remove stock"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}