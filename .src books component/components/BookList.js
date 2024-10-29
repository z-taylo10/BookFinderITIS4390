import React, { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function BookList({ books }) {
  const { addToCart } = useContext(CartContext);
  const [visibleDescription, setVisibleDescription] = useState(null);

  const toggleDescription = (index) => {
    setVisibleDescription(visibleDescription === index ? null : index);
  };

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
    <div className="results">
      {books.map((book, index) => {
        const info = book.volumeInfo;
        const saleInfo = book.saleInfo;
        const isbn = info.industryIdentifiers ? info.industryIdentifiers.find(id => id.type === 'ISBN_13' || id.type === 'ISBN_10') : null;
        const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : '/no-thumbnail.png';
        const price = saleInfo.listPrice ? `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}` : `${averagePrice} USD`;

        return (
          <div key={index} className="book">
            <img src={thumbnail} alt={`${info.title} cover`} />
            <h2>{info.title || 'N/A'}</h2>
            <p><strong>Authors:</strong> {info.authors ? info.authors.join(', ') : 'N/A'}</p>
            <p><strong>Publisher:</strong> {info.publisher || 'N/A'}</p>
            <p><strong>ISBN:</strong> {isbn ? isbn.identifier : 'N/A'}</p>
            <p><strong>Price:</strong> {price}</p>
            <button onClick={() => toggleDescription(index)}>
              {visibleDescription === index ? 'Hide Description' : 'Show Description'}
            </button>
            {visibleDescription === index && (
              <p><strong>Description:</strong> {info.description || 'No description available.'}</p>
            )}
            <button onClick={() => addToCart({ title: info.title, price: saleInfo.listPrice?.amount || averagePrice })}>
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default BookList;
