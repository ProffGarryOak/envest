import { scrapeMoneyControl, scrapeEconomicTimes } from '@/lib/newsScraper';

export async function GET() {
  try {
    const [moneyControlNews, etNews] = await Promise.all([
      scrapeMoneyControl(),
      scrapeEconomicTimes()
    ]);
    
    // Filter out any null/undefined items and flatten the array
    const allNews = [...moneyControlNews, ...etNews].filter(item => item);
    
    return Response.json({ news: allNews });
  } catch (error) {
    console.error('News API Error:', error);
    return Response.json({ news: [] }, { status: 200 }); // Always return array
  }
}