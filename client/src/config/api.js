// API Configuration for both development and production

const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : `${window.location.protocol}//${window.location.host}`);

export const API_ENDPOINTS = {
  // Services
  SERVICES: `${API_BASE_URL}/api/services`,
  SERVICE_BY_ID: (id) => `${API_BASE_URL}/api/services/${id}`,
  SERVICE_BY_CATEGORY: (category) => `${API_BASE_URL}/api/services/category/${category}`,
  
  // Admin
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  ADMIN_LOGOUT: `${API_BASE_URL}/api/admin/logout`,
  ADMIN_SERVICES: `${API_BASE_URL}/api/admin/services`,
  ADMIN_SERVICE_PRICE: (id) => `${API_BASE_URL}/api/admin/services/${id}/price`,
  ADMIN_CONVERT_PRICES: `${API_BASE_URL}/api/admin/services/convert`,
  
  // Contact
  CONTACT: `${API_BASE_URL}/api/contact`,
  
  // Health Check
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
