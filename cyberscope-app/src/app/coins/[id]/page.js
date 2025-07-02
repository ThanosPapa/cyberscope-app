'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// --- Styled Components for Coin Details Page ---
const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  
  /* CSS Variables for theming */
  --bg-primary: #ffffff;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f9f9f9;
  --text-primary: #333333;
  --text-secondary: #666666;
  --border-color: #dddddd;
  --shadow-color: rgba(0, 0, 0, 0.05);
  --accent-color: #0070f3;
  
  /* Dark mode variables */
  @media (prefers-color-scheme: dark) {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --bg-tertiary: #3a3a3a;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
    --border-color: #404040;
    --shadow-color: rgba(0, 0, 0, 0.2);
    --accent-color: #4da6ff;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 10px;
  color: var(--text-primary);
  font-size: 2.5em;
`;

const Description = styled.div`
  background-color: var(--bg-tertiary);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  line-height: 1.6;
  border: 1px solid var(--border-color);
  color: var(--text-primary);

  a {
    color: var(--accent-color);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const DataCard = styled.div`
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px var(--shadow-color);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-color);
  }
`;

const DataLabel = styled.p`
  font-weight: bold;
  margin: 0 0 8px;
  color: var(--text-secondary);
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DataValue = styled.p`
  margin: 0;
  font-size: 1.3em;
  font-weight: 600;
  color: ${props => props.color || 'var(--text-primary)'};
`;

const PriceChange = styled(DataValue)`
  color: ${props => (props.$positive ? '#10B981' : '#EF4444')};
  display: flex;
  align-items: center;
  
  &::before {
    content: '${props => (props.$positive ? '↗️' : '↘️')}';
    margin-right: 6px;
    font-size: 0.8em;
  }
`;

const BackButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: #005bb5;
    
    @media (prefers-color-scheme: dark) {
      background-color: #66b3ff;
    }
  }
`;
// --- End Styled Components ---

export default function CoinPage({ params }) {
  const [id, setId] = useState(null); //state to store the coin id
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;  //await the promise
      setId(resolvedParams.id); //set the id to the state
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchCoinDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/coins/${id}`);
        setCoin(response.data);
      } catch (err) {
        console.error(`Error fetching details for coin ${id}:`, err);
        setError('Failed to load coin details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [id]);

  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) return <PageContainer><Title>Loading coin details...</Title></PageContainer>;
  if (error) return <PageContainer><Title style={{ color: '#EF4444' }}>Error: {error}</Title></PageContainer>;
  if (!coin) return <PageContainer><Title>No coin data found.</Title></PageContainer>;

  return (
    <PageContainer>
      <BackButton onClick={handleGoBack}>← Back to List</BackButton>
      <Title>{coin.name}</Title>
      <Description dangerouslySetInnerHTML={{ __html: coin.description }} />
      
      <DataGrid>
        <DataCard>
          <DataLabel>Current Price</DataLabel>
          <DataValue>${coin.current_price?.toFixed(2)}</DataValue>
        </DataCard>
        <DataCard>
          <DataLabel>24h High</DataLabel>
          <DataValue>${coin.high_24h?.toFixed(2)}</DataValue>
        </DataCard>
        <DataCard>
          <DataLabel>24h Low</DataLabel>
          <DataValue>${coin.low_24h?.toFixed(2)}</DataValue>
        </DataCard>
        
        <DataCard>
          <DataLabel>24h Change</DataLabel>
          <PriceChange $positive={coin.price_change_percentage_24h >= 0}>
            {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
          </PriceChange>
        </DataCard>
        <DataCard>
          <DataLabel>7d Change</DataLabel>
          <PriceChange $positive={coin.price_change_percentage_7d >= 0}>
            {coin.price_change_percentage_7d >= 0 ? '+' : ''}{coin.price_change_percentage_7d?.toFixed(2)}%
          </PriceChange>
        </DataCard>
        <DataCard>
          <DataLabel>14d Change</DataLabel>
          <PriceChange $positive={coin.price_change_percentage_14d >= 0}>
            {coin.price_change_percentage_14d >= 0 ? '+' : ''}{coin.price_change_percentage_14d?.toFixed(2)}%
          </PriceChange>
        </DataCard>
        <DataCard>
          <DataLabel>1m Change</DataLabel>
          <PriceChange $positive={coin.price_change_percentage_30d >= 0}>
            {coin.price_change_percentage_30d >= 0 ? '+' : ''}{coin.price_change_percentage_30d?.toFixed(2)}%
          </PriceChange>
        </DataCard>
        <DataCard>
          <DataLabel>2m Change</DataLabel>
          <PriceChange $positive={coin.price_change_percentage_60d >= 0}>
            {coin.price_change_percentage_60d >= 0 ? '+' : ''}{coin.price_change_percentage_60d?.toFixed(2)}%
          </PriceChange>
        </DataCard>
        <DataCard>
          <DataLabel>200d Change</DataLabel>
          <PriceChange $positive={coin.price_change_percentage_200d >= 0}>
            {coin.price_change_percentage_200d >= 0 ? '+' : ''}{coin.price_change_percentage_200d?.toFixed(2)}%
          </PriceChange>
        </DataCard>
        <DataCard>
          <DataLabel>1y Change</DataLabel>
          <PriceChange $positive={coin.price_change_percentage_1y >= 0}>
            {coin.price_change_percentage_1y >= 0 ? '+' : ''}{coin.price_change_percentage_1y?.toFixed(2)}%
          </PriceChange>
        </DataCard>
      </DataGrid>
    </PageContainer>
  );
} 