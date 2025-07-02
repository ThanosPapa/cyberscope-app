# Cryptocurrency Price Tracker

A lightweight full-stack application that provides real-time information about cryptocurrency prices using the CoinGecko API. Built with React (Next.js) and styled-components for a modern, responsive user experience.

## 🚀 Features

- **Coin List Page**: Browse top cryptocurrencies with essential market data
- **Detailed Coin Pages**: In-depth information about individual cryptocurrencies
- **Real-time Data**: Live prices and market information via CoinGecko API
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Automatic theme switching based on system preferences
- **Pagination**: Efficient browsing through thousands of cryptocurrencies
- **Modern UI**: Clean, professional interface with smooth animations

## 🛠 Tech Stack

- **Frontend**: React with Next.js 15
- **Backend**: Next.js API Routes (Node.js)
- **Styling**: Styled Components
- **HTTP Client**: Axios
- **Data Source**: CoinGecko API

## 📋 Prerequisites

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun
- CoinGecko API key (free tier available)

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd cyberscope-app
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables
1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Get your CoinGecko API key:
   - Visit [CoinGecko API](https://www.coingecko.com/en/api)
   - Click "Get Free API Key" and create an account
   - Go to your dashboard and copy your API key
   - Paste it in your `.env.local` file

3. Update `.env.local` with your API key:
```bash
COINGECKO_API_KEY=your_api_key_here
```

### 4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
cyberscope-app/
├── src/
│   └── app/
│       ├── api/
│       │   └── coins/
│       │       ├── markets/
│       │       │   └── route.js      # Coin list API endpoint
│       │       └── [id]/
│       │           └── route.js      # Individual coin API endpoint
│       ├── coins/
│       │   └── [id]/
│       │       └── page.js           # Coin details page
│       ├── lib/
│       │   └── registry.js           # Styled components registry
│       ├── page.js                   # Home page (coin list)
│       ├── layout.js                 # Root layout
│       └── globals.css               # Global styles
├── .env.local                        # Environment variables
├── .env.example                      # Environment variables template
└── package.json                      # Dependencies and scripts
```

## 🌐 API Endpoints

### Backend API Routes
- `GET /api/coins/markets` - Fetch paginated list of cryptocurrencies
- `GET /api/coins/[id]` - Fetch detailed information about a specific coin

### Query Parameters
- **Markets endpoint**: `?page=1&per_page=12`
- **Coin details**: No additional parameters required

## 📱 Pages

### Home Page (`/`)
Displays a paginated list of top cryptocurrencies including:
- Coin name and symbol
- Current price in USD
- 24-hour price change percentage
- 24-hour high and low prices
- Coin icon/logo

### Coin Details Page (`/coins/[id]`)
Shows comprehensive information about a specific cryptocurrency:
- Current price
- Coin description
- Price changes for multiple time periods (24h, 7d, 14d, 1m, 2m, 200d, 1y)
- 24-hour high and low prices

## 🎨 Styling & Theming

The application uses styled-components with CSS variables for theming:
- Automatic dark/light mode based on system preferences
- Responsive grid layouts
- Smooth hover animations and transitions
- Professional color scheme with good contrast ratios

## 🔄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📊 Data Source

This application uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch cryptocurrency data. The backend acts as a proxy to:
- Reduce API calls from the frontend
- Filter responses to only include necessary data
- Handle API errors gracefully
- Maintain consistent data structure

### Other Platforms

Ensure you set the `COINGECKO_API_KEY` environment variable in your deployment platform.

## 🆘 Support

If you encounter any issues:
1. Check that your CoinGecko API key is correctly set
2. Ensure you're using Node.js 18.0 or higher
3. Verify all dependencies are installed
4. Check the console for any error messages

For additional help, please open an issue in the repository.
