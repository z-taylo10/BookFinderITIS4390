import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

const BookSearch = () => {
    const [books, setBooks] = useState([]);
    const [visibleDescription, setVisibleDescription] = useState(null);

    const searchBooks = async (title) => {
        const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
        const params = {
            q: `intitle:${title}`,
            maxResults: 12 // Change this to 12
        };

        try {
            const response = await axios.get(baseUrl, { params });
            setBooks(response.data.items || []);
        } catch (error) {
            console.error('Failed to retrieve data:', error);
        }
    };

    const toggleDescription = (index) => {
        setVisibleDescription(visibleDescription === index ? null : index);
    };

    return (
        <div>
            <SearchBar onSearch={searchBooks} />
            <div className="results">
                {books.map((book, index) => {
                    const info = book.volumeInfo;
                    const saleInfo = book.saleInfo;
                    const isbn = info.industryIdentifiers ? info.industryIdentifiers.find(id => id.type === 'ISBN_13' || id.type === 'ISBN_10') : null;
                    return (
                        <div key={index} className="book">
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BookSearch;
