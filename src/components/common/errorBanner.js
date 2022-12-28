import React from 'react';

const ErrorBanner = ({ message = '에러가 발생했습니다.' }) => {
  return (
    <div
      data-testId='error-banner'
      style={{ backgroundColor: 'red', color: 'white' }}
    >
      {message}
    </div>
  );
};

export default ErrorBanner;
