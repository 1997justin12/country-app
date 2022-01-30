import React from 'react';
import { Form } from 'react-bootstrap';

export const Search = ({ value, onChange }) => {
  return (
    <Form.Group>
      <Form.Control
        type="input"
        placeholder="Enter keyword to search"
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};
