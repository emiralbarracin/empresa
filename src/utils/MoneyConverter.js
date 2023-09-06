import React from 'react';

const MoneyConverter = ({ money, value, sintetico }) => {
  const formatCurrency = (inputValue) => {
    let currencyCode = 'ARS';
    if (money === 2 || sintetico === 'u$s') {
      currencyCode = 'USD';
    }

    const formatter = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(inputValue);
  };

  return <>{formatCurrency(value)}</>;
};

export default MoneyConverter;