import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

export const CountryDetails = ({ country }) => {
  const {
    code = '',
    name = '',
    capital = '',
    continent = {},
    native = '',
    phone = '',
    currency = '',
  } = country;
  return (
    <Table responsive>
      <tbody>
        <tr>
          <td className="table-item-label">Code</td>
          <td className="table-item-value">{code}</td>
        </tr>
        <tr>
          <td className="table-item-label">Country Name</td>
          <td className="table-item-value">{name}</td>
        </tr>
        <tr>
          <td className="table-item-label">Capital</td>
          <td className="table-item-value">{capital}</td>
        </tr>
        <tr>
          <td className="table-item-label">Continent</td>
          <td className="table-item-value">{continent?.name}</td>
        </tr>
        <tr>
          <td className="table-item-label">Native</td>
          <td className="table-item-value">{native}</td>
        </tr>
        <tr>
          <td className="table-item-label">Phone</td>
          <td className="table-item-value">(+{phone})</td>
        </tr>
        <tr>
          <td className="table-item-label">Currency</td>
          <td className="table-item-value">{currency}</td>
        </tr>
      </tbody>
    </Table>
  );
};
