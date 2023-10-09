const MoneyFormatter = (value) => {
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS', //cambiar la moneda aquí según necesidades
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
};

export default MoneyFormatter;