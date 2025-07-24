export const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  return decodeToken(token);
};

export const getUserRole = () => {
  const user = getUserFromToken();
  return user?.role || null;
};

export const isAdmin = () => {
  return getUserRole() === 'admin';
};

export const isDeveloper = () => {
  return getUserRole() === 'developer';
};

export const isfisherman = () => {
  return getUserRole() === 'fisherman';
}

export const isAgent = () => {
  return getUserRole() === 'agent';
}

export const getUsername = () => {
  const user = getUserFromToken();
  return user?.username || null;
}; 