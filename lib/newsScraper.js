import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeMoneyControl() {
  try {
    const { data } = await axios.get('https://www.moneycontrol.com/news/business/markets/');
    const $ = cheerio.load(data);
    const newsItems = [];
    
    $('li.clearfix').each((i, el) => {
      const title = $(el).find('h2 a').text().trim();
      const link = $(el).find('h2 a').attr('href');
      const time = $(el).find('span span').text().trim();
      
      if (title && link) {
        newsItems.push({ title, link, time, source: 'Moneycontrol' });
      }
    });
    
    return newsItems.slice(0, 10);
  } catch (error) {
    console.error('Error scraping Moneycontrol:', error);
    return [];
  }
}

export async function scrapeEconomicTimes() {
  try {
    const { data } = await axios.get('https://economictimes.indiatimes.com/markets/stocks/news');
    const $ = cheerio.load(data);
    const newsItems = [];
    
    $('.eachStory').each((i, el) => {
      const title = $(el).find('h3 a').text().trim();
      const link = 'https://economictimes.indiatimes.com' + $(el).find('h3 a').attr('href');
      const time = $(el).find('.time').text().trim();
      
      if (title && link) {
        newsItems.push({ title, link, time, source: 'Economic Times' });
      }
    });
    
    return newsItems.slice(0, 10);
  } catch (error) {
    console.error('Error scraping Economic Times:', error);
    return [];
  }
}