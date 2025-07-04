// Mock portfolio service - in a real app, you'd integrate with broker APIs here
export async function savePortfolio(userId, stocks) {
  // In a real app, you'd save to a database
  return { success: true };
}

export async function getPortfolio(userId) {
  // Mock portfolio - in a real app, fetch from database
  return {
    stocks: [
      { symbol: 'JANE STREET', name: 'Jane Street' },
      { symbol: 'TCS', name: 'Tata Consultancy Services' },
      { symbol: 'SEBI', name: 'Securities and Exchange Board of India' }
    ]
  };
}