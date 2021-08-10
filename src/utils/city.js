const CITY = 'zfy_city';

const getCity = () => JSON.parse(localStorage.getItem(CITY)) 

const setCity = ( value ) => localStorage.setItem(CITY, value)

export { getCity,  setCity }