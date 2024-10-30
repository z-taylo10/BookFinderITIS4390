// src/pages/BookDetailPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetailPage.css';

const BookDetailPage = () => {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        setBookDetails(response.data);
      } catch (error) {
        console.error('Failed to retrieve book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (!bookDetails) return <p>Loading...</p>;

  const { title, authors, description, imageLinks, publishedDate, pageCount, categories } = bookDetails.volumeInfo;

  return (
    <div className="book-detail-page">
      <h1>{title}</h1>
      <div className="book-detail-content">
        <img src={imageLinks?.thumbnail || '/placeholder.jpg'} alt={`${title} cover`} />
        <div className="book-info">
          <p><strong>Author(s):</strong> {authors ? authors.join(', ') : 'Unknown'}</p>
          <p><strong>Published Date:</strong> {publishedDate || 'N/A'}</p>
          <p><strong>Page Count:</strong> {pageCount || 'N/A'}</p>
          <p><strong>Categories:</strong> {categories ? categories.join(', ') : 'N/A'}</p>
          <p><strong>Description:</strong> {description || 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
