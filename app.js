/**
 * VitalBlaze Services - Application Entry Point
 * This file is the main entry point for Plesk hosting
 */

// Load environment variables from .env file
require('dotenv').config();

// Start the Express server
require('./server/index.js');

console.log('VitalBlaze Services application starting...');
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`Port: ${process.env.PORT || 5000}`);
