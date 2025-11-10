// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? window.location.origin  // Use same domain in production
    : 'http://localhost:3000' // Use localhost:3000 in development
  );

export default API_BASE_URL;
