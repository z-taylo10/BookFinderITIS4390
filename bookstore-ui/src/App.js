import React from 'react';
import './App.css';
import './styles.css';
import Header from './Header';
import BookSearch from './BookSearch';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <BookSearch />
      </main>
    </div>
  );
}

export default App;
