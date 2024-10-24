import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import { CartContext } from './CartContext';

const BookSearch = ({ initialQuery }) => {
    const [books, setBooks] = useState([]);
    const [visibleDescription, setVisibleDescription] = useState(null);
    const [showThumbnails, setShowThumbnails] = useState(true);
    const [currentGenre, setCurrentGenre] = useState(null);
    const { addToCart } = useContext(CartContext);
    //const [query] = useState(''); // Corrected here

    const searchBooks = useCallback(async (query) => {
        const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
        const params = {
            q: query,
            maxResults: 12
        };

        try {
            const response = await axios.get(baseUrl, { params });
            const fetchedBooks = response.data.items || [];

            // Sort books based on priority: Title -> Author -> Publisher
            const sortedBooks = fetchedBooks.sort((a, b) => {
                const aInfo = a.volumeInfo;
                const bInfo = b.volumeInfo;

                const aTitleMatch = aInfo.title.toLowerCase().includes(query.toLowerCase());
                const bTitleMatch = bInfo.title.toLowerCase().includes(query.toLowerCase());

                if (aTitleMatch && !bTitleMatch) return -1;
                if (!aTitleMatch && bTitleMatch) return 1;

                const aAuthorMatch = aInfo.authors && aInfo.authors.some(author => author.toLowerCase().includes(query.toLowerCase()));
                const bAuthorMatch = bInfo.authors && bInfo.authors.some(author => author.toLowerCase().includes(query.toLowerCase()));

                if (aAuthorMatch && !bAuthorMatch) return -1;
                if (!aAuthorMatch && bAuthorMatch) return 1;

                const aGenreMatch = aInfo.categories && aInfo.categories.some(category => category.toLowerCase().includes(query.toLowerCase()));
                const bGenreMatch = bInfo.categories && bInfo.categories.some(category => category.toLowerCase().includes(query.toLowerCase()));

                if (aGenreMatch && !bGenreMatch) return -1;
                if (!aGenreMatch && bGenreMatch) return 1;

                const aPublisherMatch = aInfo.publisher && aInfo.publisher.toLowerCase().includes(query.toLowerCase());
                const bPublisherMatch = bInfo.publisher && bInfo.publisher.toLowerCase().includes(query.toLowerCase());

                if (aPublisherMatch && !bPublisherMatch) return -1;
                if (!aPublisherMatch && bPublisherMatch) return 1;

                return 0;
            });

            // Calculate average price
            const prices = sortedBooks
                .map(book => book.saleInfo.listPrice?.amount)
                .filter(price => price !== undefined);
            const averagePrice = prices.length > 0 ? (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2) : 9.99;

            // Assign average price or default price to books without a price
            const updatedBooks = sortedBooks.map(book => {
                if (!book.saleInfo.listPrice) {
                    book.saleInfo.listPrice = { amount: parseFloat(averagePrice), currencyCode: 'USD' };
                }
                return book;
            });

            setBooks(updatedBooks);
        } catch (error) {
            console.error('Failed to retrieve data:', error);
        }
    }, []);

    useEffect(() => {
        if (initialQuery) {
            setCurrentGenre(initialQuery);
            searchBooks(`subject:${initialQuery}`);
        } else {
            setCurrentGenre(null);
            setBooks([]); // Clear books when query is null
        }
    }, [initialQuery, searchBooks]);

    const toggleDescription = (index) => {
        setVisibleDescription(visibleDescription === index ? null : index);
    };

    const toggleThumbnails = () => {
        setShowThumbnails(!showThumbnails);
    };

    return (
        <div>
            <SearchBar onSearch={searchBooks} clearQuery={!initialQuery} />
            <button onClick={toggleThumbnails}>
                {showThumbnails ? 'Hide Thumbnails' : 'Show Thumbnails'}
            </button>
            {currentGenre && <h2>Genre: {currentGenre}</h2>}
            <div className="results">
                {books.map((book, index) => {
                    const info = book.volumeInfo;
                    const saleInfo = book.saleInfo;
                    const isbn = info.industryIdentifiers ? info.industryIdentifiers.find(id => id.type === 'ISBN_13' || id.type === 'ISBN_10') : null;
                    const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : '/no-thumbnail.png';

                    return (
                        <div key={index} className="book">
                            {showThumbnails && <img src={thumbnail} alt={`${info.title} cover`} />}
                            <h2>{info.title || 'N/A'}</h2>
                            <p><strong>Authors:</strong> {info.authors ? info.authors.join(', ') : 'N/A'}</p>
                            <p><strong>Publisher:</strong> {info.publisher || 'N/A'}</p>
                            <p><strong>Published Date:</strong> {info.publishedDate || 'N/A'}</p>
                            <p><strong>Genres:</strong> {info.categories ? info.categories.join(', ') : 'N/A'}</p>
                            <p><strong>Price:</strong> {saleInfo.listPrice ? `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}` : 'N/A'}</p>
                            <p><strong>ISBN:</strong> {isbn ? isbn.identifier : 'N/A'}</p>
                            <button onClick={() => toggleDescription(index)}>
                                {visibleDescription === index ? 'Hide Description' : 'Show Description'}
                            </button>
                            {visibleDescription === index && (
                                <p><strong>Description:</strong> {info.description || 'No description available.'}</p>
                            )}
                            <button onClick={() => addToCart({ title: info.title, price: saleInfo.listPrice.amount })}>
                                Add to Cart
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BookSearch;
