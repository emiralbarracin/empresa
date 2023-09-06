import React from 'react';

const DateConverter = ({ date }) => {
  const convertDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    // Formatear día y mes con ceros a la izquierda si son menores a 10
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  return <>{convertDate(date)}</>;
};

export default DateConverter;
