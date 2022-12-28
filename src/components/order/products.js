import React from 'react';
import { BASE_URL } from '../../mocks/handlers';

const Products = ({ name, imagePath }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`${BASE_URL}/${imagePath}`}
        alt={`${name} product`}
      />
      <form style={{ marginTop: '10px' }}>
        <label style={{ textAlign: 'center' }}>{name}</label>
        <input
          type='number'
          style={{ marginLeft: 7 }}
          name='quantity'
          min='0'
          defaultValue={0}
        />
      </form>
    </div>
  );
};

export default Products;
