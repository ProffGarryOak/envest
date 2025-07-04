import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(request) {
  try {
    const { newsItems } = await request.json();

    if (!newsItems || newsItems.length === 0) {
      return new Response(JSON.stringify({ error: "No news items provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const prompt = `
Analyze these stock market news headlines and determine their potential impact:

News Items:
${newsItems.slice(0, 5).map((item, i) => `${i + 1}. ${item.title}`).join("\n")}

Provide JSON:
{
  "analysis": [
    {
      "newsTitle": "...",
      "sentiment": "...",
      "confidence": "...",
      "reasoning": "...",
      "affectedStocks": ["..."]
    }
  ],
  "overallSentiment": "..."
}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract the first JSON object from the text using regex
    const match = text.match(/{[\s\S]*}/);
    if (!match) {
      throw new Error("No JSON object found in Gemini response");
    }
    const parsed = JSON.parse(match[0]);

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to analyze news",
        details: error.message || "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(request) {
  return new Response(
    JSON.stringify({ message: "Analysis API is up. Use POST with newsItems for analysis." }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
