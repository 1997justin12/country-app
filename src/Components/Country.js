import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import { CountryDetails } from './CountryDetails';
import { CountryItem } from './CountryItem';
import { LoadingSpinner } from './LoadingSpinner';

import { useQuery, gql } from '@apollo/client';
import { GET_COUNTRIES } from '../GraphQL/Queries';

export const Country = () => {
  const { code = '' } = useParams();
  const navigate = useNavigate();
  const { error, loading, data } = useQuery(GET_COUNTRIES, {
    variables: {
      filter: {
        code: {
          in: [code],
        },
      },
    },
  });
  const [country, setCountry] = useState({});

  useEffect(() => {
    if (data && data.countries) {
      const { countries = [] } = data;
      setCountry(countries[0]);
    }
  }, [data]);

  return (
    <div className="secondary-container">
      <Container className="pt-5">
        {loading && <LoadingSpinner />}
        {!loading && country && (
          <Card className="country-card mb-2">
            <Row>
              <Col className="p-1 text-center">
                <Button
                  variant="outline-success"
                  className="btn-home-globe"
                  title={'Go back to main page'}
                  onClick={() => navigate('/')}
                >
                  <i className="fa fa-globe"></i>
                </Button>
                <span className="country-flag-big">{country?.emoji}</span>
                <h3 className="country-card-title">{country?.name}</h3>
              </Col>
              <Col>
                <div className="p-1 mt-4">
                  <h5 className="text-center country-card-title">
                    Country Details
                  </h5>
                  <CountryDetails country={country} />
                </div>
              </Col>
            </Row>
            <Row className="p-2">
              <Col className="text-left">
                <div className="ms-2">
                  <h6 className="country-card-title ">
                    Related Countries ({country?.continent?.name})
                  </h6>
                </div>
              </Col>
            </Row>
            <Row className="p-2">
              {!loading &&
                country?.continent?.countries.map((item) => {
                  const { code = '' } = item || {};
                  if (code !== country?.code) {
                    return (
                      <Col
                        key={Math.round(Math.random() * 99999999)}
                        xs={6}
                        sm={6}
                        md={3}
                        className="p-3"
                      >
                        <CountryItem item={item} />
                      </Col>
                    );
                  }
                })}
            </Row>
          </Card>
        )}
      </Container>
    </div>
  );
};
