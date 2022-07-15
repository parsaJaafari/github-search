import React, { useContext, useEffect, useState } from 'react';
import { Context, ContextType } from '../store/Store';

import { searchUser } from '../api/github';
import './searchBar.scss';
import { Link, useSearchParams } from 'react-router-dom';

export interface TermItem {
  timeStamp: number;
  term: string;
}

const SearchBar = () => {
  const { term, setTerm, setFoundUser } = useContext(Context) as ContextType;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorText, setErrorText] = useState('');
  const [searchparams] = useSearchParams();
  const searchTermParam = searchparams.get('term');

  const getUser = async (searchTerm: string) => {
    try {
      const foundUser = await searchUser(searchTerm);
      setFoundUser(foundUser);
    } catch (error: any) {
      setErrorText(error.message);
    }
  };

  useEffect(() => {
    if (searchTermParam) {
      getUser(searchTermParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, searchTerm: string = term) => {
    e.preventDefault();
    // set search term to the list of local storage
    const termsArray = JSON.parse(localStorage.getItem('terms') || '[]');

    const termItem: TermItem = {
      timeStamp: new Date().getTime(),
      term: searchTerm,
    };

    const index = termsArray.findIndex((item: TermItem) => item.term === searchTerm);

    if (index !== -1) {
      termsArray.splice(index, 1, termItem);
    } else {
      termsArray.splice(index, 0, termItem);
    }

    localStorage.setItem('terms', JSON.stringify(termsArray));

    // make the api call to the github
    getUser(searchTerm);
  };

  return (
    <div className="search-box__wrapper">
      <div className="search-box">
        <form onSubmit={handleSubmit} className="search-form">
          <label htmlFor="search">Search for Photos</label>
          <input
            id="search"
            value={term}
            onChange={(event) => {
              setTerm(event.target.value);
            }}
            className="search-input"
            type="text"
          />
        </form>
      </div>
      <Link to="/search-history">Visit the search history</Link>
    </div>
  );
};

export default SearchBar;
