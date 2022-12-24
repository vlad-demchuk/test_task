const BASE_URL = 'https://api.coingecko.com/api/v3'

export const getCoins = async() => {
  const request = await fetch(`${BASE_URL}/coins/list`);

  return request.json();
}