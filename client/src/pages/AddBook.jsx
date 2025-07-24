import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { Book, User, Tag, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const genres = [
  'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Thriller', 
  'Science Fiction', 'Fantasy', 'Biography', 'History', 'Self-Help', 
  'Memoir', 'Poetry', 'Drama', 'Horror', 'Adventure'
];

const AddBook = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleGenreChange = (value) => {
    setFormData(prev => ({ ...prev, genre: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.genre || !formData.publishedYear) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/books', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast({
        title: 'Book Added Successfully!',
        description: `"${formData.title}" has been added to the library.`,
      });

      setTimeout(() => {
        navigate('/books');
      }, 1500);
    } catch (err) {
      console.error(err);
      toast({
        title: 'Failed to Add Book',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-bold mb-2">Add New Book</h1>
        <p className="text-muted-foreground text-lg">Share a great book with our community</p>
      </div>

      <Card className="glass-card shadow-card border-border/30">
        <CardHeader>
          <CardTitle className="text-2xl font-playfair">Book Information</CardTitle>
          <CardDescription>Fill in the details below to add a new book</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title *</Label>
              <div className="relative">
                <Book className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter the book title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="author"
                  name="author"
                  placeholder="Enter author's name"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre *</Label>
                <Select value={formData.genre} onValueChange={handleGenreChange}>
                  <SelectTrigger className="pl-10">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Select genre" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="publishedYear">Published Year *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="publishedYear"
                    name="publishedYear"
                    type="number"
                    placeholder="e.g., 2023"
                    value={formData.publishedYear}
                    onChange={handleInputChange}
                    className="pl-10"
                    min="1000"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter a brief description of the book..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="pl-10 pt-3 min-h-[120px]"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Optional: Provide a short summary or your thoughts about the book
              </p>
            </div>
          </CardContent>

          <div className="p-6 pt-0 flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/books')}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary hover:opacity-90 shadow-primary"
            >
              Add Book
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddBook;
