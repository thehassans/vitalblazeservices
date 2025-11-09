const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000'];

app.use(cors({
  origin: isProduction ? allowedOrigins : '*',
  credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Import routes
const servicesRoutes = require('./routes/services');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

// API Routes
app.use('/api/services', servicesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const buildPath = path.join(__dirname, '../client/build');
  const buildExists = fs.existsSync(buildPath);
  const indexExists = buildExists && fs.existsSync(path.join(buildPath, 'index.html'));
  
  res.json({ 
    status: 'ok', 
    message: 'VitalBlaze Services API is running',
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    buildPath: buildPath,
    buildExists: buildExists,
    indexHtmlExists: indexExists,
    timestamp: new Date().toISOString()
  });
});

// Root welcome page (in case React build doesn't exist)
app.get('/server-status', (req, res) => {
  const buildPath = path.join(__dirname, '../client/build');
  const buildExists = fs.existsSync(buildPath);
  
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>VitalBlaze Server Status</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: system-ui, -apple-system, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .container {
          background: white;
          border-radius: 24px;
          padding: 3rem;
          max-width: 600px;
          box-shadow: 0 32px 64px rgba(0,0,0,0.3);
        }
        h1 { color: #667eea; margin-bottom: 1rem; font-size: 2rem; }
        .status { padding: 1rem; background: #f0fdf4; border-left: 4px solid #22c55e; margin: 1rem 0; border-radius: 8px; }
        .info { padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; }
        .label { font-weight: 600; color: #6b7280; }
        .value { color: #111827; margin-left: 0.5rem; }
        .warning { background: #fef3c7; border-left-color: #f59e0b; }
        .error { background: #fee2e2; border-left-color: #ef4444; }
        .success { color: #22c55e; }
        .fail { color: #ef4444; }
        a { color: #667eea; text-decoration: none; font-weight: 600; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>⚡ VitalBlaze Server Status</h1>
        <div class="status">
          <div class="info">
            <span class="label">Server Status:</span>
            <span class="value success">✅ Running</span>
          </div>
          <div class="info">
            <span class="label">Environment:</span>
            <span class="value">${process.env.NODE_ENV || 'development'}</span>
          </div>
          <div class="info">
            <span class="label">Port:</span>
            <span class="value">${PORT}</span>
          </div>
          <div class="info">
            <span class="label">API Health:</span>
            <span class="value"><a href="/api/health">/api/health</a></span>
          </div>
        </div>
        
        ${!buildExists ? `
          <div class="status warning">
            <strong>⚠️ React Build Not Found</strong>
            <p style="margin-top: 0.5rem;">
              The React application needs to be built. Run:<br>
              <code style="background: #f3f4f6; padding: 0.5rem; display: block; margin-top: 0.5rem; border-radius: 4px;">
                cd client && npm run build
              </code>
            </p>
          </div>
        ` : `
          <div class="status">
            <strong class="success">✅ React Build Found</strong>
            <p style="margin-top: 0.5rem;">Application is ready to serve.</p>
          </div>
        `}
        
        <div style="margin-top: 2rem; text-align: center;">
          <p style="color: #6b7280;">VitalBlaze Premium Services Platform</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Serve React App in Production
if (isProduction) {
  const buildPath = path.join(__dirname, '../client/build');
  
  // Check if build folder exists
  if (fs.existsSync(buildPath)) {
    console.log(`✅ React build folder found at: ${buildPath}`);
    
    // Serve static files from React build folder
    app.use(express.static(buildPath, {
      maxAge: '1d',
      etag: true
    }));
    
    // Handle React routing - return index.html for all non-API routes
    app.get('*', (req, res) => {
      const indexPath = path.join(buildPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send(`
          <html>
            <body style="font-family: sans-serif; padding: 2rem; text-align: center;">
              <h1>⚠️ Application Not Ready</h1>
              <p>React build exists but index.html not found.</p>
              <p>Please rebuild: <code>cd client && npm run build</code></p>
              <p><a href="/server-status">Check Server Status</a></p>
            </body>
          </html>
        `);
      }
    });
  } else {
    console.log(`⚠️ React build folder not found at: ${buildPath}`);
    console.log(`📝 Please build the React app: cd client && npm run build`);
    
    // Fallback route when build doesn't exist
    app.get('*', (req, res) => {
      res.redirect('/server-status');
    });
  }
} else {
  // Development mode fallback
  app.get('*', (req, res) => {
    res.send(`
      <html>
        <body style="font-family: sans-serif; padding: 2rem; text-align: center;">
          <h1>🚀 VitalBlaze API Server</h1>
          <p>Server is running in development mode.</p>
          <p>Start the React development server: <code>cd client && npm start</code></p>
          <p><a href="/api/health">API Health Check</a></p>
        </body>
      </html>
    `);
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: isProduction ? 'Something went wrong' : err.message
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 VitalBlaze Services Server Started`);
  console.log(`${'='.repeat(50)}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Port: ${PORT}`);
  console.log(`🔗 Local: http://localhost:${PORT}`);
  console.log(`🌍 CORS Origins: ${allowedOrigins.join(', ')}`);
  console.log(`📊 Server Status: http://localhost:${PORT}/server-status`);
  console.log(`❤️  API Health: http://localhost:${PORT}/api/health`);
  console.log(`${'='.repeat(50)}\n`);
});
