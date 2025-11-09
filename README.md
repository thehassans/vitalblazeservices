# VitalServices - Premium Multi-Services Platform

A professional, full-stack web application showcasing web hosting, domain registration, security services, and digital solutions. Built with Node.js, Express, React, and an in-memory database.

## Features

- **Modern UI/UX Design**: Premium, professional interface with smooth animations
- **Responsive Design**: Fully responsive across all devices
- **Service Categories**:
  - Hosting & Servers (Shared, WordPress, VPS, Dedicated)
  - Domains & Security (Registration, SSL, SiteLock, Backups)
  - Website & E-commerce (Builder, Development, Bug Fixing)
  - Marketing & Email (Professional Email, SEO Tools, VPN)
- **Currency Toggle**: Switch between SAR and GBP pricing
- **Category Filtering**: Filter services by category
- **Contact Form**: Functional contact form with backend integration
- **Professional Icons**: Using Lucide React for modern iconography

## Tech Stack

### Backend
- Node.js
- Express.js
- In-Memory Database (no external DB required)
- RESTful API architecture

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Lucide React for icons
- Custom CSS with modern design patterns

## Project Structure

```
VitalServices/
├── server/
│   ├── index.js              # Express server entry point
│   ├── data/
│   │   └── memoryDb.js       # In-memory database
│   └── routes/
│       ├── services.js       # Services API routes
│       └── contact.js        # Contact form API routes
├── client/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   └── src/
│       ├── components/
│       │   ├── Navbar.js/css
│       │   ├── Hero.js/css
│       │   ├── Services.js/css
│       │   ├── Features.js/css
│       │   ├── Contact.js/css
│       │   └── Footer.js/css
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
├── package.json
├── .env
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```
   This will install dependencies for both server and client.

2. **Environment Setup**
   The `.env` file is already configured with:
   ```
   PORT=5000
   NODE_ENV=development
   ```

3. **Run the Application**

   **Option 1: Run both server and client concurrently**
   ```bash
   npm run dev
   ```

   **Option 2: Run separately**
   
   Terminal 1 - Start the backend server:
   ```bash
   npm run server
   ```
   
   Terminal 2 - Start the React development server:
   ```bash
   npm run client
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `GET /api/services/category/:category` - Get services by category

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)

### Health Check
- `GET /api/health` - Server health status

## Available Scripts

- `npm run server` - Start backend server only
- `npm run client` - Start React development server only
- `npm run dev` - Run both server and client concurrently
- `npm run install-all` - Install all dependencies
- `npm run build` - Build React app for production

## Features Breakdown

### Services Section
- 14 comprehensive services across 4 categories
- Dynamic pricing with currency toggle (SAR/GBP)
- Category filtering system
- Popular service badges
- Detailed feature lists for each service
- Professional card-based layout with hover effects

### Hero Section
- Eye-catching gradient background
- Call-to-action buttons
- Key statistics display
- Smooth scroll navigation

### Features Section
- 6 key selling points
- Icon-based feature cards
- Hover animations and effects

### Contact Section
- Functional contact form
- Form validation
- Success/Error messaging
- Contact information display
- Responsive two-column layout

### Navigation
- Fixed header with scroll effects
- Mobile-responsive menu
- Smooth scroll to sections
- Professional branding

## Design Principles

- **Professional**: Clean, modern design suitable for enterprise clients
- **Performance**: Optimized animations and efficient rendering
- **Accessibility**: Semantic HTML and ARIA labels
- **Responsiveness**: Mobile-first approach with breakpoints
- **Consistency**: Unified color scheme and typography
- **User Experience**: Intuitive navigation and clear CTAs

## Color Palette

- Primary: `#2563eb` (Blue)
- Primary Dark: `#1d4ed8`
- Secondary: `#0f172a` (Dark Navy)
- Accent: `#06b6d4` (Cyan)
- Success: `#10b981` (Green)

## Future Enhancements

- MongoDB integration (replace in-memory DB)
- User authentication & dashboard
- Payment gateway integration
- Admin panel for service management
- Blog section
- Live chat support
- Multi-language support
- Advanced analytics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Contact

For inquiries: info@vitalservices.com

---

Built with ❤️ by VitalBlaze Team
