import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchHistory from './pages/SearchHistory';
import { Context } from './store/Store';
import './app.scss';

const App = () => {
  const [term, setTerm] = useState('');
  const [foundUser, setFoundUser] = useState({});

  return (
    <Context.Provider
      value={{
        term,
        setTerm,
        foundUser,
        setFoundUser,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search-history" element={<SearchHistory />} />
        </Routes>
      </Router>
    </Context.Provider>
  );
};

export default App;
