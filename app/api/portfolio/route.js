import { getPortfolio, savePortfolio } from '@/lib/portfolioService';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  try {
    const portfolio = await getPortfolio(userId || 'default');
    return Response.json(portfolio);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function POST(request) {
  const { userId, stocks } = await request.json();
  
  try {
    await savePortfolio(userId || 'default', stocks);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to save portfolio' }, { status: 500 });
  }
}