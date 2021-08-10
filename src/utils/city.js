const TOKEN_MAME = 'zfy_token';

const getCity = () => JSON.parse(localStorage.getItem(TOKEN_MAME)) 

const setCity = ( value ) => localStorage.setItem(TOKEN_MAME, value)

export { getCity,  setCity }