import React, { useState, useEffect } from 'react';
import { Toaster as Toast } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetail';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toast />
        <Sonner />

        <div className="min-h-screen bg-background">
          {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />}

          <div className={isLoggedIn ? 'pb-8' : ''}>
            <Routes>
              {/* Public Route */}
              <Route
                path="/login"
                element={
                  isLoggedIn ? (
                    <Navigate to="/books" replace />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )
                }
              />

              {/* Default Route */}
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <Navigate to="/books" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              {/* Protected Routes */}
              <Route
                path="/books"
                element={isLoggedIn ? <BookList /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/books/:id"
                element={isLoggedIn ? <BookDetail /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/add-book"
                element={isLoggedIn ? <AddBook /> : <Navigate to="/login" replace />}
              />

              {/* Catch-all */}
              <Route
                path="*"
                element={
                  isLoggedIn ? <NotFound /> : <Navigate to="/login" replace />
                }
              />
            </Routes>
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
