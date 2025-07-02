import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: 'Coin ID is required' }, { status: 400 });
  }
  //API key 
  try {
    const apiKey = process.env.COINGECKO_API_KEY;
    if (!apiKey) {
      throw new Error('COINGECKO_API_KEY is not defined in your environment variables');
    }
    const coingeckoUrl = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false&x_cg_demo_api_key=${apiKey}`;

    const response = await axios.get(coingeckoUrl);
    const coinData = response.data;

    // Filter the response to include only the required fields for rendering
    // Required fields: current price, name, description, price changes for various periods, high_24h, low_24h
    const requiredFields = {
      id: coinData.id,
      name: coinData.name,
      description: coinData.description.en, // English description
      current_price: coinData.market_data.current_price.usd, // Current price in USD
      price_change_percentage_24h: coinData.market_data.price_change_percentage_24h,
      price_change_percentage_7d: coinData.market_data.price_change_percentage_7d,
      price_change_percentage_14d: coinData.market_data.price_change_percentage_14d,
      price_change_percentage_30d: coinData.market_data.price_change_percentage_30d, // 1 month
      price_change_percentage_60d: coinData.market_data.price_change_percentage_60d, // 2 months
      price_change_percentage_200d: coinData.market_data.price_change_percentage_200d,//200 days
      price_change_percentage_1y: coinData.market_data.price_change_percentage_1y, // 1 year
      high_24h: coinData.market_data.high_24h.usd, // Highest price on last day
      low_24h: coinData.market_data.low_24h.usd,   // Lowest price on last day
    };

    return NextResponse.json(requiredFields);
  } catch (error) {
    console.error(`Error fetching coin details for ${id} from CoinGecko:`, error.response?.data || error.message);
    // Handle specific errors like 404 (coin not found)
    if (error.response && error.response.status === 404) {
      return NextResponse.json({ message: `Coin with ID "${id}" not found.` }, { status: 404 });
    }
    return NextResponse.json({ message: 'Failed to fetch coin details' }, { status: 500 });
  }
}