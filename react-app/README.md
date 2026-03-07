# Basketball Stats Tracker - React App

A modern React application for tracking middle school basketball stats and league management.

## Features

- 📊 **Dashboard** - Season overview and quick stats
- 🎮 **Games** - Track all games with scores and status
- 👥 **Players** - Player profiles and individual statistics
- 🏆 **League** - League standings and team statistics
- 📈 **Stats Tracking** - Comprehensive basketball statistics
- 📱 **Responsive Design** - Works on desktop and mobile

## Tech Stack

- **React 18** - UI framework
- **React Router** - Client-side routing
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## API Endpoints

The app expects the following API endpoints:

- `GET /api/stats/overview` - Season statistics
- `GET /api/games` - List all games
- `GET /api/players` - List all players
- `GET /api/players/:id` - Get player details
- `GET /api/league/standings` - League standings

## Project Structure

```
src/
├── components/      # Reusable React components
├── pages/          # Page components for routes
├── App.tsx         # Main app component
├── index.css       # Global styles with Tailwind
└── main.tsx        # Entry point
```

## Development

- Run `npm run dev` for local development with hot reload
- Run `npm run lint` to check code quality
- Modify components in `src/components/` and pages in `src/pages/`

## License

MIT
