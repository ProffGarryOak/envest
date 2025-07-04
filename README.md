# Stock Market News Analyzer with AI Insights

![Uploading image.png…]()


## Overview

A Next.js application that automates stock market news curation in India, links user portfolios, and provides AI-based insights on how the news might impact holdings. The app features:

- Automated news scraping from Indian financial sources
- Portfolio linking and management
- AI-powered sentiment analysis of news articles
- Personalized news filtering based on user portfolios

## Features

- **News Scraping Module**: Automatically collects stock market news from Moneycontrol and Economic Times
- **Portfolio Management**: Users can link their stock portfolios (mock or via broker APIs)
- **AI Analysis**: gemini integration provides sentiment analysis of news impact
- **Personalized Feed**: Filters news relevant to the user's portfolio holdings
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Scraping**: Cheerio, Axios
- **AI**: gemini API (GPT-2.5-pro)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- gemini API key (for AI features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/stock-news-analyzer.git
   cd stock-news-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   gemini_API_KEY=your_gemini_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `gemini_API_KEY` | Your gemini API key | Yes (for AI features) |
| `NEXT_PUBLIC_gemini_MODEL` | gemini model to use (default: gpt-3.5-turbo) | No |

### Mock Mode

If you don't have an gemini API key, the app can run in mock mode:

1. Modify `app/api/analysis/route.js` to use mock data:
   ```javascript
   // Comment out the gemini code and use this instead:
   const mockAnalysis = {
     analysis: [
       {
         newsTitle: "Sample news 1",
         sentiment: "Positive",
         confidence: "High",
         reasoning: "Mock analysis for development",
         affectedStocks: ["RELIANCE"]
       }
     ],
     overallSentiment: "Positive"
   };
   return Response.json(mockAnalysis);
   ```

## Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new):

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Add your environment variables in Vercel's project settings
4. Deploy!

## Project Structure

```
stock-news-analyzer/
├── app/
│   ├── api/                  # API routes
│   ├── components/           # React components
│   └── page.js               # Main page
├── lib/                      # Utility functions
├── public/                   # Static files
├── .env.local                # Environment variables
└── package.json
```

## Roadmap

- [ ] Add more Indian news sources
- [ ] Implement real broker API integration (Zerodha, Groww)
- [ ] Add email/push notifications
- [ ] Implement user authentication
- [ ] Add historical performance tracking

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- gemini for their powerful language models
- Moneycontrol and Economic Times for financial news
- Next.js and Vercel for the excellent framework and hosting
