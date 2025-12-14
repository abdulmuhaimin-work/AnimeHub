# AnimeHub 🌟

A modern, responsive anime discovery web application built with React, TypeScript, and the Jikan API.

![AnimeHub Preview](https://via.placeholder.com/800x400?text=AnimeHub+Preview)

## ✨ Features

- **Anime Listings** - Browse thousands of anime titles with infinite scroll pagination
- **Search** - Search anime by title with debounced search
- **Genre Filtering** - Filter anime by one or more genres
- **Anime Details** - Detailed anime pages with synopsis, stats, and trailer links
- **Favorites** - Save your favorite anime to localStorage
- **Deep Linking** - Share anime pages and filtered search results via URL
- **Responsive Design** - Works beautifully on mobile, tablet, and desktop
- **Loading States** - Skeleton loaders for a polished UX
- **Error Handling** - Graceful error boundaries and API error handling

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 19](https://react.dev/) | UI Framework |
| [TypeScript](https://www.typescriptlang.org/) | Type Safety |
| [Vite](https://vitejs.dev/) | Build Tool |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [TanStack Query](https://tanstack.com/query) | Server State Management |
| [Zustand](https://zustand-demo.pmnd.rs/) | Client State (Favorites) |
| [React Router](https://reactrouter.com/) | Routing & Deep Linking |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lucide React](https://lucide.dev/) | Icons |
| [Vitest](https://vitest.dev/) | Testing |
| [Jikan API](https://jikan.moe/) | Anime Data |

## 📁 Project Structure

```
src/
├── api/                    # API layer
│   ├── client.ts          # Axios client with rate limiting
│   ├── config.ts          # API configuration
│   ├── animeApi.ts        # API functions
│   └── hooks/             # React Query hooks
├── components/
│   ├── anime/             # Anime-specific components
│   │   ├── AnimeCard.tsx
│   │   ├── AnimeGrid.tsx
│   │   ├── FavoriteButton.tsx
│   │   ├── GenreFilter.tsx
│   │   ├── SearchBar.tsx
│   │   └── ShareButton.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── PageContainer.tsx
│   │   └── ErrorBoundary.tsx
│   └── ui/                # Reusable UI primitives
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       ├── Select.tsx
│       └── Skeleton.tsx
├── pages/                  # Page components
│   ├── Home/
│   ├── AnimeDetail/
│   └── Favorites/
├── store/                  # Zustand store
│   └── favoritesStore.ts  # Favorites with localStorage
├── types/                  # TypeScript interfaces
│   └── anime.ts
├── test/                   # Test utilities
│   ├── setup.ts
│   └── test-utils.tsx
└── App.tsx                 # App entry with routing
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/animehub.git
cd animehub

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage |

## 🎨 Design Decisions

### State Management
- **Server State (React Query)**: Handles API data with caching, refetching, and pagination
- **Client State (Zustand)**: Manages favorites with localStorage persistence

### Code Splitting
- Pages are lazy-loaded using `React.lazy()` for better initial load performance

### API Rate Limiting
- Jikan API has a 3 req/sec rate limit
- Built-in request throttling to prevent 429 errors
- Automatic retry with exponential backoff

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Grid adjusts from 2 columns (mobile) to 6 columns (desktop)

## 🧪 Testing

Tests are written using Vitest and React Testing Library:

```bash
# Run all tests
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test
```

### Test Coverage
- Unit tests for Zustand store
- Component tests for UI primitives
- API function tests with mocked axios

## 📱 Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with anime listings |
| `/?q=naruto` | Search results for "naruto" |
| `/?genres=1,2` | Filter by genre IDs |
| `/anime/:id` | Anime detail page |
| `/favorites` | User's saved favorites |

## 🔗 API Reference

This app uses the [Jikan API](https://docs.api.jikan.moe/) - an unofficial MyAnimeList API.

### Endpoints Used
- `GET /anime` - List anime with pagination and filters
- `GET /anime/{id}` - Get anime details
- `GET /genres/anime` - Get anime genres

## 📄 License

MIT License - feel free to use this project for learning or as a template!

---

Built with ❤️ using React and the Jikan API
