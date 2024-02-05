const DateTimeConverter = ({ date }) => {
    const convertDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();

        // Formatear día, mes, horas y minutos con ceros a la izquierda si son menores a 10
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes} hs`;
    };

    return <>{convertDate(date)}</>;
};

export default DateTimeConverter;