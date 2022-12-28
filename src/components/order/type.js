import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../mocks/handlers';
import Products from './products';
import ErrorBanner from '../common/errorBanner';

const Type = ({ orderType }) => {
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      const response = await axios(`${BASE_URL}/${orderType}`);
      setItems(response.data);
    } catch (error) {
      setHasError(true);
    }
  };

  const ItemComponent = orderType === 'products' ? Products : null;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  if (hasError) {
    return <ErrorBanner />;
  }
  return <div>{optionItems}</div>;
};

export default Type;
