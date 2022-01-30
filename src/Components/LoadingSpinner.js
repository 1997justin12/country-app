import React from 'react';
import { Spinner } from 'react-bootstrap';

export const LoadingSpinner = () => {
  return (
    <div className="text-center">
      <Spinner animation="grow" variant="warning" size={'lg'} />
      <p className="loading-text">Just wait for a moment...</p>
    </div>
  );
};
