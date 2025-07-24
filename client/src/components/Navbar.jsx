import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, LogOut, Plus, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-card border-b border-border/30 px-6 py-4 mb-8 animate-fade-in relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="p-2 bg-gradient-primary rounded-lg shadow-primary group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-3xl font-playfair font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
            BookVerse
          </span>
        </Link>

        {/* Desktop Links */}
        {isLoggedIn && (
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/books"
              className={cn(
                'px-4 py-2 rounded-lg transition-all duration-200',
                isActive('/books')
                  ? 'bg-primary text-primary-foreground shadow-primary'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              Browse Books
            </Link>
            <Link
              to="/add-book"
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200',
                isActive('/add-book')
                  ? 'bg-primary text-primary-foreground shadow-primary'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              <Plus className="w-4 h-4" />
              <span>Add Book</span>
            </Link>
          </div>
        )}

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* Desktop user info */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Reader</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="hover:bg-destructive hover:text-destructive-foreground border-border/50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>

              {/* Mobile toggle */}
              <button
                className="md:hidden p-2 rounded-lg border border-border/50"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </>
          ) : (
            <Link to="/login">
              <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isLoggedIn && menuOpen && (
        <div className="md:hidden mt-4 space-y-3 bg-background border-t border-border/30 px-6 py-4 rounded-lg shadow-lg animate-fade-in-down">
          <Link
            to="/books"
            onClick={() => setMenuOpen(false)}
            className={cn(
              'block px-4 py-2 rounded-lg',
              isActive('/books')
                ? 'bg-primary text-primary-foreground shadow-primary'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            Browse Books
          </Link>
          <Link
            to="/add-book"
            onClick={() => setMenuOpen(false)}
            className={cn(
              'block px-4 py-2 rounded-lg',
              isActive('/add-book')
                ? 'bg-primary text-primary-foreground shadow-primary'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            Add Book
          </Link>
          <div className="flex items-center justify-between px-4 py-2 border-t border-border/30 mt-3">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Reader</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMenuOpen(false);
                onLogout();
              }}
              className="hover:bg-destructive hover:text-destructive-foreground border-border/50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
