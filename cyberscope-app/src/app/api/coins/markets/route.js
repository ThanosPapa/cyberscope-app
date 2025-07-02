import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const per_page = searchParams.get('per_page') || '10'; 

    //API key 
    const apiKey = process.env.COINGECKO_API_KEY;
    if (!apiKey) {
      throw new Error('COINGECKO_API_KEY is not defined in your environment variables');
    }
    const coingeckoUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false&x_cg_demo_api_key=${apiKey}`;

    // Make the request to CoinGecko
    const response = await axios.get(coingeckoUrl);
    const coins = response.data;

    // Filter the response to include only the required fields for rendering
    // Required fields: name, symbol, current_price, high_24h, low_24h, price_change_percentage_24h, image
    const requiredFields = coins.map(coin => ({
      id: coin.id, // Include ID for linking to details page
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      image: coin.image, 
    }));

    // Return the filtered data as a JSON response
    return NextResponse.json(requiredFields);
  } catch (error) {
    console.error('Error fetching coin markets from CoinGecko:', error.message);
    // Return an error response if something goes wrong
    return NextResponse.json({ message: 'Failed to fetch coin markets' }, { status: 500 });
  }
}