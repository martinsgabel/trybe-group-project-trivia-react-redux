const getToken = async () => {
  const token = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = token.json();
  return data;
};

export default getToken;
