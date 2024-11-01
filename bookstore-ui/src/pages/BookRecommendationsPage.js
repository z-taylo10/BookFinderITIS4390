import React, { useState, useEffect, useContext  } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import '../stylesheets/BookRecommendationsPage.css';
import { API_KEY } from '../config';

const BookRecommendationsPage = () => {
  const { addToCart } = useContext(CartContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch only 5 books with the maxResults parameter
    axios.get('https://www.googleapis.com/books/v1/volumes?q=Fiction&maxResults=5&key=' + API_KEY)
      .then(response => {
        const bookData = response.data.items.map(item => ({
          title: item.volumeInfo.title,
          genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Unknown',
          price: item.saleInfo.retailPrice ? `${item.saleInfo.retailPrice.amount}` : 'Free',
          publisher: item.volumeInfo.publisher || 'Unknown',
          image: item.volumeInfo.imageLinks?.thumbnail || 'No image available',
          authors:  item.volumeInfo.authors,
        }));
        setBooks(bookData);
        setLoading(false);

      })
      .catch(() => {
        setError('Failed to fetch book recommendations');
        setLoading(false);
      });
  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="book-finder">
      <main>
        <h2>Recommended for You</h2>
        <div className="book-list">
          {books.map((book, index) => (
           
            <div key={index} className="book-card">
              <div className="book-image">
                <img src={book.image} alt={book.title} />
              </div>
              <div className="book-info">
                <p><strong>{book.genre}</strong></p>
                <p><strong>Price:</strong> {book.price}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
              </div>
              <button onClick={() => addToCart(book)}>Add to Cart</button>
              <div className="book-actions">
                <button className="btn">Add to Wishlist</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BookRecommendationsPage;