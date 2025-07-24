import React, { useEffect, useState, useContext } from 'react';
import { Search, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import BookCard from '@/components/BookCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const genres = ['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Thriller', 'Self-Help', 'Memoir'];

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [viewMode, setViewMode] = useState('grid');
  const { token } = useContext(AuthContext);

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/api/books', {
      params: {
        genre: genre === 'All' ? '' : genre,
        author: '',
        sortBy,
        page: 1,
      },
    });
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, [genre, sortBy]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-bold mb-2">Discover Books</h1>
        <p className="text-muted-foreground text-lg">
          Explore our curated collection of {filteredBooks.length} books
        </p>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-6 rounded-xl mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input/50 border-border/50 focus:border-primary"
            />
          </div>

          {/* Genre Filter */}
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="w-full lg:w-48 bg-input/50 border-border/50">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border/50">
              {genres.map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48 bg-input/50 border-border/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border/50">
              <SelectItem value="createdAt">Newest First</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Mode and Active Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {genre !== 'All' && (
              <Badge
                variant="secondary"
                className="bg-primary-muted text-primary border-primary/20"
              >
                {genre}
                <button
                  onClick={() => setGenre('All')}
                  className="ml-2 hover:text-primary-foreground"
                >
                  ×
                </button>
              </Badge>
            )}
            <span className="text-sm text-muted-foreground">
              {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-primary shadow-primary' : ''}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-primary shadow-primary' : ''}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Book Cards */}
      <div
        className={`grid gap-6 ${
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
        }`}
      >
        {filteredBooks.map((book, index) => (
          <div
            key={book._id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <BookCard book={book} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-playfair font-semibold mb-2">No books found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}

      {/* Add Book */}
      <div className="flex justify-end mt-10">
        <Link to="/add-book">
          <Button className="bg-gradient-primary text-white shadow-primary">+ Add Book</Button>
        </Link>
      </div>
    </div>
  );
};

export default BookList;
