import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';
import '../stylesheets/BookRecommendationsPage.css';
import { API_KEY } from '../config';
import { useTranslation } from 'react-i18next';

const BookRecommendationsPage = () => {
  const { t } = useTranslation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isbns = [
      '0618129022', 
      '0810885123', 
      '1455535680', 
      '019214216X', 
      '1476787832', 
      '1250083036', 
      '9780143127741', 
      '9780385545969',
      '0451166752'
    ];

    const fetchBooks = async () => {
      const multipliers = [1.2, 1.4, 1.6, 1.8, 2.0, 1.1, 1.3, 1.5, 1.7, 1.9];

      try {
        const bookData = await Promise.all(isbns.map(async (isbn, index) => {
          const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${API_KEY}`);
          const item = response.data.items ? response.data.items[0] : null;
          if (item) {
            if (!item.saleInfo.listPrice) {
              item.saleInfo.listPrice = { amount: 9.99, currencyCode: 'USD' };
            }
            const multiplier = multipliers[index % multipliers.length];
            item.saleInfo.listPrice.amount *= multiplier;
            item.saleInfo.listPrice.amount = parseFloat(item.saleInfo.listPrice.amount.toFixed(2));
            return {
              id: item.id,
              volumeInfo: item.volumeInfo,
              saleInfo: item.saleInfo,
            };
          }
          return null;
        }));
        setBooks(bookData.filter(book => book !== null));
      } catch (error) {
        console.error('Error fetching book recommendations:', error);
        setError('Failed to fetch book recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>{t('loading')}</div>;
  if (error) return <div>{t('fetchError')}</div>;

  return (
    <div className="book-finder">
      <main>
        <h2>{t('recommendedForYou')}</h2>
        <BookList books={books} />
      </main>
    </div>
  );
};

export default BookRecommendationsPage;