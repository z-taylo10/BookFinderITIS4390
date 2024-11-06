// src/pages/BookDetailPage.js

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import '../stylesheets/BookDetailPage.css';

const BookDetailPage = () => {
  const location = useLocation();
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const priceFromState = location.state?.price;

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

  const { title, authors, description, imageLinks, publishedDate, pageCount, categories, industryIdentifiers } = bookDetails.volumeInfo;
  const saleInfo = bookDetails.saleInfo;
  const price = saleInfo.listPrice ? `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}` : '14.99';
  const thumbnail = imageLinks?.thumbnail || '/no-thumbnail.png';

  const isInCart = cart.some(item => item.id === bookId);
  const isInWishlist = wishlist.some(item => item.id === bookId);

  const cleanDescription = description ? description.replace(/<[^>]*>/g, '').replace(/(\r\n|\n|\r)/gm, ' ') : 'No description available.';

  const isbn = industryIdentifiers ? industryIdentifiers.find(identifier => identifier.type.includes('ISBN'))?.identifier : 'N/A';

  return (
    <div className="book-detail-page">
      <h1>{title}</h1>
      <div className="book-detail-content">
        <div className="book-image-container">
          <img src={thumbnail} alt={`${title} cover`} />
          <div className="button-container">
            <button 
              className="button-custom cart-button-custom" 
              onClick={() => {
                if (isInCart) {
                  const itemIndex = cart.findIndex(item => item.id === bookId);
                  removeFromCart(itemIndex);
                } else {
                  addToCart({
                    id: bookId,
                    title,
                    authors: authors ? authors.join(', ') : 'N/A',
                    price: priceFromState || saleInfo.listPrice?.amount || '14.99',
                    thumbnail
                  });
                }
              }}
            >
              {isInCart ? 'Remove from Cart' : `🛒 Add to Cart: $${priceFromState || price}`}
            </button>
            <button 
              className="button-custom wishlist-button-custom"
              onClick={() => {
                if (isInWishlist) {
                  const itemIndex = wishlist.findIndex(item => item.id === bookId);
                  removeFromWishlist(itemIndex);
                } else {
                  addToWishlist({
                    id: bookId,
                    title,
                    authors: authors ? authors.join(', ') : 'N/A',
                    price: priceFromState || saleInfo.listPrice?.amount || '14.99',
                    thumbnail
                  });
                }
              }}
            >
              {isInWishlist ? 'Remove from Wishlist' : '❤️ Add to Wishlist'}
            </button>
          </div>
        </div>
        <div className="book-info">
          <p><strong>Author(s):</strong> {authors ? authors.join(', ') : 'Unknown'}</p>
          <p><strong>ISBN:</strong> {isbn}</p>
          <p><strong>Published Date:</strong> {publishedDate || 'N/A'}</p>
          <p><strong>Page Count:</strong> {pageCount || 'N/A'}</p>
          <p><strong>Categories:</strong> {categories ? categories.join(', ') : 'N/A'}</p>
          <p><strong>Description:</strong> {cleanDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
