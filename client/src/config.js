// API Configuration
const config = {
  // API Base URL - automatically detects environment
  API_BASE_URL: process.env.REACT_APP_API_URL || (
    process.env.NODE_ENV === 'production' 
      ? 'https://khewracrafts.com' 
      : 'https://khewracrafts.com'
  ),
  
  // Admin credentials (kept here for reference)
  ADMIN_EMAIL: 'vitalservices@vitalblaze.com',
  
  // Other constants
  DEFAULT_LANGUAGE: 'en',
  SUPPORTED_LANGUAGES: ['en', 'ar']
};

export default config;
