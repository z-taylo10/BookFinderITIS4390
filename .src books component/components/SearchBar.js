import React from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onSearch }) {
  const [query, setQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    onSearch(query);
    navigate('/search');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for books..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
