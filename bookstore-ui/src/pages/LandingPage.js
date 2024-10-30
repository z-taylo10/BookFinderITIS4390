// src/pages/LandingPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import BookCard from '../components/BookCard';
import '../stylesheets/LandingPage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LandingPage = () => {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [moreTitles, setMoreTitles] = useState([]);

  // Function to fetch books from Google Books API
  const fetchBooks = async () => {
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
    const params = {
      q: 'subject:Fiction', // Default genre for trending
      maxResults: 40, // Fetch more to allow random selection
    };

    try {
      const response = await axios.get(baseUrl, { params });
      const books = response.data.items || [];
      
      // Randomly select 5 books for each section
      const shuffledBooks = books.sort(() => 0.5 - Math.random());
      setTrendingBooks(shuffledBooks.slice(0, 5));
      setMoreTitles(shuffledBooks.slice(5, 9)); // Different 5 books for "More Titles"
    } catch (error) {
      console.error('Failed to retrieve data:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Carousel settings for React Slick
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="landing-page">
      <main className="main-content">
        <section className="hero">
          <h1>Trending Reads!</h1>
          <p>Popular Books you might personally enjoy!</p>
          <Slider {...carouselSettings} className="trending-books-carousel">
            {trendingBooks.map((book, index) => (
              <BookCard
                key={index}
                id={book.id}
                title={book.volumeInfo.title}
                author={book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}
                cover={book.volumeInfo.imageLinks?.thumbnail || '/placeholder.jpg'}
              />
            ))}
          </Slider>
        </section>

        <section className="additional-books">
          <h2>More Titles</h2>
          <div className="book-grid">
            {moreTitles.map((book, index) => (
              <BookCard
                key={index}
                id={book.id}
                title={book.volumeInfo.title}
                author={book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}
                cover={book.volumeInfo.imageLinks?.thumbnail || '/placeholder.jpg'}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
