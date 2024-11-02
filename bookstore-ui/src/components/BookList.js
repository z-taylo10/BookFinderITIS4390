import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../stylesheets/BookList.css';

function BookList({ books }) {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateAveragePrice = () => {
    const prices = books
      .map(book => book.saleInfo.listPrice?.amount)
      .filter(price => price !== undefined);

    if (prices.length === 0) return 9.99;

    const total = prices.reduce((acc, price) => acc + price, 0);
    return (total / prices.length).toFixed(2);
  };

  const averagePrice = calculateAveragePrice();

  return (
    <div className="book-list-container">
      {books.map((book, index) => {
        const info = book.volumeInfo;
        const saleInfo = book.saleInfo;
        const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : '/no-thumbnail.png';
        const price = saleInfo.listPrice ? `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}` : `${averagePrice} USD`;

        const isInCart = cart.some(item => item.id === book.id);

        return (
          <div key={index} className="book-card-custom">
            <img src={thumbnail} alt={`${info.title} cover`} />
            <h2>{info.title || 'N/A'}</h2>
            <p><strong>Authors:</strong> {info.authors ? info.authors.join(', ') : 'N/A'}</p>
            <p><strong>Price:</strong> {price}</p>
            <div className="button-container">
              <button 
                className="button-custom details-button-custom"
                onClick={() => navigate(`/books/${book.id}`)}
              >
                View Details
              </button>
              <button 
                className="button-custom cart-button-custom" 
                onClick={() => {
                  if (isInCart) {
                    const itemIndex = cart.findIndex(item => item.id === book.id);
                    removeFromCart(itemIndex);
                  } else {
                    addToCart({ id: book.id, title: info.title, authors: info.authors ? info.authors.join(', ') : 'N/A', price: saleInfo.listPrice?.amount || averagePrice, thumbnail });
                  }
                }}
              >
                {isInCart ? 'Remove from Cart' : '🛒 Add to Cart'}
              </button>
              <button className="button-custom wishlist-button-custom">
                ❤️ Add to Wishlist
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookList;
