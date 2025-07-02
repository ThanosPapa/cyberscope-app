'use client'; // This directive is essential for client-side components in App Router

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styled from 'styled-components'; // Import styled-components

// --- Styled Components for Coin List Page ---
const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  
  /* CSS Variables for theming */
  --bg-primary: #ffffff;
  --bg-secondary: #ffffff;
  --text-primary: #333333;
  --text-secondary: #666666;
  --border-color: #dddddd;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --shadow-hover: rgba(0, 0, 0, 0.15);
  --accent-color: #0070f3;
  
  /* Dark mode variables */
  @media (prefers-color-scheme: dark) {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
    --border-color: #404040;
    --shadow-color: rgba(0, 0, 0, 0.3);
    --shadow-hover: rgba(0, 0, 0, 0.5);
    --accent-color: #4da6ff;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 30px;
`;

const CoinListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const CoinCard = styled(Link)`
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 5px var(--shadow-color);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px var(--shadow-hover);
  }
`;

const CoinHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const CoinIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  border-radius: 50%;
`;

const CoinHeaderText = styled.div`
  flex: 1;
`;

const CoinName = styled.h2`
  font-size: 1.5em;
  margin: 0;
  margin-bottom: 5px;
  color: var(--accent-color);
`;

const CoinSymbol = styled.p`
  font-size: 0.9em;
  color: var(--text-secondary);
  margin: 0;
  text-transform: uppercase;
`;

const CoinPrice = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 10px;
`;

const PriceChange = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  font-weight: 600;
  color: ${props => (props.$positive ? '#10B981' : '#EF4444')};
  background-color: ${props => (props.$positive ? 
    'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)')};
  padding: 6px 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  
  /* Dark mode adjustments for better contrast */
  @media (prefers-color-scheme: dark) {
    background-color: ${props => (props.$positive ? 
      'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)')};
  }
`;

const PriceChangeIcon = styled.span`
  margin-right: 4px;
  font-size: 0.8em;
`;

const PriceRange = styled.p`
  font-size: 0.85em;
  color: var(--text-secondary);
  margin-top: 5px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: var(--accent-color);
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:disabled {
    background-color: var(--text-secondary);
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #005bb5;
    
    @media (prefers-color-scheme: dark) {
      background-color: #66b3ff;
    }
  }
`;
// --- End Styled Components ---


export default function HomePage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const coinsPerPage = 12; // Request 12 coins per page

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        // Call your Next.js API route
        const response = await axios.get(`/api/coins/markets?page=${page}&per_page=${coinsPerPage}`);
        setCoins(response.data);
      } catch (err) {
        console.error('Error fetching coin list:', err);
        setError('Failed to load cryptocurrency data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [page]); // Re-fetch coins whenever the page changes

  if (loading) return <PageContainer><Title>Loading cryptocurrencies...</Title></PageContainer>;
  if (error) return <PageContainer><Title style={{ color: 'red' }}>Error: {error}</Title></PageContainer>;

  return (
    <PageContainer>
      <Title>Top Cryptocurrencies</Title>
      <CoinListContainer>
        {coins.map(coin => (
          <CoinCard key={coin.id} href={`/coins/${coin.id}`}>
            <div>
              <CoinHeader>
                <CoinIcon 
                  src={coin.image} 
                  alt={`${coin.name} icon`}
                  onError={(e) => {
                    e.target.src = '/api/placeholder/32/32'; // Fallback image
                  }}
                />
                <CoinHeaderText>
                  <CoinName>{coin.name}</CoinName>
                  <CoinSymbol>{coin.symbol}</CoinSymbol>
                </CoinHeaderText>
              </CoinHeader>
              <CoinPrice>${coin.current_price?.toFixed(2)}</CoinPrice>
              <PriceChange $positive={coin.price_change_percentage_24h >= 0}>
                <PriceChangeIcon>
                  {coin.price_change_percentage_24h >= 0 ? '↗️' : '↘️'}
                </PriceChangeIcon>
                {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
              </PriceChange>
              <PriceRange>
                High (24h): ${coin.high_24h?.toFixed(2)}
              </PriceRange>
              <PriceRange>
                Low (24h): ${coin.low_24h?.toFixed(2)}
              </PriceRange>
            </div>
          </CoinCard>
        ))}
      </CoinListContainer>

      <PaginationContainer>
        <PaginationButton onClick={() => setPage(prev => Math.max(1, prev - 1))} disabled={page === 1}>
          Previous
        </PaginationButton>
        <PaginationButton onClick={() => setPage(prev => prev + 1)}>
          Next
        </PaginationButton>
      </PaginationContainer>
    </PageContainer>
  );
}