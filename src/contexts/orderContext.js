import { createContext, useEffect, useMemo, useState } from 'react';

export const OrderContext = createContext();

const pricePerItem = {
  products: 1000,
  options: 500,
};

function calculateSubtotal(orderType, orderCounts) {
  let optionCount = 0;
  for (const count of orderCounts[orderType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[orderType];
}

export function OrderContextProvider(props) {
  const defaultOrderData = {
    products: new Map(),
    options: new Map(),
  };
  const [orderCounts, setOrderCounts] = useState(defaultOrderData);

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  useEffect(() => {
    const productsTotal = calculateSubtotal('products', orderCounts);
    const optionsTotal = calculateSubtotal('options', orderCounts);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]);

  const resetOrderData = () => setOrderCounts(defaultOrderData);

  const value = useMemo(() => {
    function updateItemCount({ itemName, newItemCount, orderType }) {
      const newOrderCounts = { ...orderCounts };
      console.log('newOrderCounts before :', newOrderCounts);
      const orderCountMap = orderCounts[orderType];
      orderCountMap.set(itemName, +newItemCount);
      console.log('newOrderCounts after :', newOrderCounts);
      setOrderCounts(newOrderCounts);
    }

    return [{ ...orderCounts, totals }, updateItemCount, resetOrderData];
  }, [orderCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
}
