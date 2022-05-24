const saveToken = (token) => {
  localStorage.setItem('token', token.token);
};

export default saveToken;
