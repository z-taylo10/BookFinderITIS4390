// src/components/BookCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/BookCard.css';

const BookCard = ({ id, title, author, cover }) => {
  return (
    <div className="book-card">
      <Link to={`/books/${id}`}>
        <img src={cover} alt={`${title} cover`} className="book-cover" />
        <h3 className="book-title">{title}</h3>
        <p className="book-author">by {author}</p>
      </Link>
    </div>
  );
};

export default BookCard;
