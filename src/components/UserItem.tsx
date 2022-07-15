import React, { useContext } from 'react';
import { Context, ContextType } from '../store/Store';
import './userItem.scss';

const UserItem = () => {
  const { foundUser } = useContext(Context) as ContextType;

  return (
    <>
      {Object.keys(foundUser).length ? (
        <div className="user-item">
          <img src={foundUser.avatar_url} alt={foundUser.login} className="user-item__avatar" />
          <div className="user-item__general-info">
            <h1>{foundUser.name || foundUser.login}</h1>
            <p>
              {foundUser.bio} at {foundUser.company}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserItem;
