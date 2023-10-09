const MoneyFormatterComprobante = (value) => {
    const formatter = new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formatter.format(value);
};

export default MoneyFormatterComprobante;