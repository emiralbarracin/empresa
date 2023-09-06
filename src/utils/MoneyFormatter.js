const MoneyFormatter = (value) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', //cambiar la moneda aquí según necesidades
      minimumFractionDigits: 2,
    });
    return formatter.format(value);
  };
  
  export default MoneyFormatter;