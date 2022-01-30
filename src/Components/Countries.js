import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_COUNTRIES } from './../GraphQL/Queries';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import { CountryItem } from './CountryItem';
import { Search } from './Search';
import { LoadingSpinner } from './LoadingSpinner';

export const Countries = () => {
  const [countryList, setCountryList] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState({});
  const { error, loading, data, refetch } = useQuery(GET_COUNTRIES, filter);
  const [searchInput, setSearchInput] = useState('');
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (data && data.countries) {
      const { countries = [] } = data;
      if (!allCountries.length) {
        setAllCountries(countries);
      }
      setCountryList(countries);
    }
  }, [data]);

  const handleSearchInputChange = (e) => {
    const { value = '' } = e.target || {};
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        if (value) {
          setSearchInput(value);
          let searchCountry = allCountries
            .filter((item) => {
              const { name = '' } = item;
              return name.toLowerCase().includes(value.toLowerCase());
            })
            .map((item) => {
              return item.code;
            });

          setFilter({
            variables: { filter: { code: { in: searchCountry } } },
          });
          refetch();
        } else {
          setSearchInput('');
          setFilter({});
        }
      }, 10)
    );
  };

  return (
    <div
      className="main-container"
      style={{
        backgroundImage: `url(${require('./../assets/bg.jpg')})`,
      }}
    >
      <Container className="p-2">
        <Row className="mt-5">
          <Col>
            <Search value={searchInput} onChange={handleSearchInputChange} />
          </Col>
        </Row>
        <Row className="mt-5 container-country-items">
          {loading && <LoadingSpinner />}
          {!loading &&
            countryList.map((item) => {
              return (
                <Col
                  key={Math.round(Math.random() * 99999999)}
                  xs={6}
                  sm={6}
                  md={3}
                  className="p-1"
                >
                  <CountryItem item={item} />
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
};
