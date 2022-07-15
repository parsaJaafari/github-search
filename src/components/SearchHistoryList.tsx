import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context, ContextType } from '../store/Store';
import { TermItem } from './SearchBar';
import './searchHistoryList.scss';

const SearchHistoryList = () => {
  const navigate = useNavigate();
  const { setTerm } = useContext(Context) as ContextType;
  const searchHistories = JSON.parse(localStorage.getItem('terms') || '[]').sort(
    (a: TermItem, b: TermItem) => b.timeStamp - a.timeStamp
  );

  const goToHome = (term: string) => {
    setTerm(term);
    navigate(`/?term=${term}`);
  };

  return (
    <div className="search-history__list container">
      <h1 className="search-history__title">List Of Searched Terms</h1>
      {searchHistories.length
        ? searchHistories.map((item: TermItem) => {
            return (
              <span onClick={() => goToHome(item.term)} className="search-history__item" key={item.timeStamp}>
                {item.term}
              </span>
            );
          })
        : null}
    </div>
  );
};

export default SearchHistoryList;
