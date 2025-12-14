import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/layout/Header';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { AnimeGridSkeleton } from './components/ui/Skeleton';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/Home/HomePage').then(m => ({ default: m.HomePage })));
const AnimeDetailPage = lazy(() => import('./pages/AnimeDetail/AnimeDetailPage').then(m => ({ default: m.AnimeDetailPage })));
const FavoritesPage = lazy(() => import('./pages/Favorites/FavoritesPage').then(m => ({ default: m.FavoritesPage })));

// Configure React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Loading fallback component
function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <AnimeGridSkeleton count={12} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/anime/:id" element={<AnimeDetailPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
