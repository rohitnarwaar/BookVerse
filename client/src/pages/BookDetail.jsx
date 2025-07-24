import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft, Calendar, Tag, User,
  MessageSquare, Plus
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StarRating from '@/components/StarRating';
import { useToast } from '@/hooks/use-toast';

const BookDetail = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { toast } = useToast();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, text: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const fetchDetails = async () => {
    try {
      const b = await axios.get(`http://localhost:5000/api/books/${id}`);
      const r = await axios.get(`http://localhost:5000/api/reviews/${id}`);
      setBook(b.data);
      setReviews(r.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitReview = async () => {
    if (newReview.rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting.",
        variant: "destructive"
      });
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/reviews/${id}`,
        {
          rating: newReview.rating,
          review_text: newReview.text,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast({
        title: "Review Submitted!",
        description: "Thank you for sharing your thoughts about this book.",
      });

      setNewReview({ rating: 0, text: '' });
      setShowReviewForm(false);
      fetchDetails();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-6 text-center py-12">
        <h1 className="text-2xl font-playfair font-bold mb-4">Book not found</h1>
        <Link to="/books">
          <Button variant="outline">Back to Books</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 animate-fade-in">
      <Link
        to="/books"
        className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Books</span>
      </Link>

      {/* Book Header */}
      <div className="glass-card p-8 rounded-xl mb-8 shadow-card">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-playfair font-bold mb-3">{book.title}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{book.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{book.publishedYear}</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary-muted text-primary border-primary/20">
                <Tag className="w-3 h-3 mr-1" />
                {book.genre}
              </Badge>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {book.description}
            </p>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-3">
                <StarRating rating={parseFloat(book.averageRating) || 0} readonly size="lg" />
                <div>
                  <div className="text-2xl font-bold">
                    {!isNaN(book.averageRating) ? book.averageRating.toFixed(1) : 'N/A'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {book.reviewCount} reviews
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-gradient-primary hover:opacity-90 shadow-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Write a Review
            </Button>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <Card className="glass-card shadow-card border-border/30 mb-8 animate-slide-up">
          <CardHeader>
            <CardTitle className="font-playfair">Write Your Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Rating</label>
              <StarRating
                rating={newReview.rating}
                onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
                size="lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Your Thoughts</label>
              <Textarea
                placeholder="Share your thoughts about this book..."
                value={newReview.text}
                onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
                className="min-h-[120px] bg-input/50 border-border/50 focus:border-primary"
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleSubmitReview}
                className="bg-gradient-primary hover:opacity-90 shadow-primary"
              >
                Submit Review
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowReviewForm(false)}
                className="border-border/50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-playfair font-bold">Reviews</h2>
        </div>

        {reviews.length === 0 && <p className="text-muted-foreground">No reviews yet.</p>}

        {reviews.map((review, index) => (
          <Card
            key={review._id}
            className="glass-card shadow-card border-border/30 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {review.reviewer?.username?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="font-medium">{review.reviewer?.username || 'Anonymous'}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <StarRating rating={review.rating} readonly size="sm" />
              </div>
              <p className="text-muted-foreground leading-relaxed">{review.review_text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookDetail;
