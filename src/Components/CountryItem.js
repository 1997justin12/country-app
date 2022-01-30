import React from 'react';

export const CountryItem = ({ item }) => {
  const { code = '', name = '', emoji = '' } = item;
  return (
    <a href={`/country/${code}`} className="country-link">
      <div className="country-container">
        <span className="country-flag">{emoji}</span>
        <p className="country-name ">{name}</p>
      </div>
    </a>
  );
};
