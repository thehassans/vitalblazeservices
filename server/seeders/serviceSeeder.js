require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Service = require('../models/Service');

const servicesData = [
  // HOSTING & SERVERS
  {
    id: 3,
    category: 'Hosting & Servers',
    name: 'VPS Hosting',
    description: 'Powerful, flexible, and scalable for growing businesses.',
    features: ['Dedicated Resources', 'Full Root Access', 'SSD Storage', 'Scalable RAM & CPU'],
    priceSAR: '99',
    priceGBP: '20',
    priceType: 'mo',
    icon: 'hard-drive',
    popular: false
  },
  {
    id: 4,
    category: 'Hosting & Servers',
    name: 'Dedicated Servers',
    description: 'Maximum performance and control for high-traffic sites.',
    features: ['Complete Control', 'Premium Hardware', 'DDoS Protection', 'Managed Support'],
    priceSAR: 'Contact Us',
    priceGBP: 'Contact Us',
    priceType: null,
    icon: 'database',
    popular: false
  },
  
  // DOMAINS & SECURITY
  {
    id: 5,
    category: 'Domains & SSL',
    name: 'Domain Registration',
    description: 'Secure your .com, .net, .org, and more.',
    features: ['Free WHOIS Privacy', 'Easy DNS Management', 'Auto-Renewal Option', '100+ TLDs Available'],
    priceSAR: '45',
    priceGBP: '9',
    priceType: 'yr',
    icon: 'globe',
    popular: false
  },
  {
    id: 8,
    category: 'Domains & SSL',
    name: 'Website Backup',
    description: 'Automatic, secure backups to protect your data.',
    features: ['Daily Backups', 'One-Click Restore', 'Cloud Storage', 'Version Control'],
    priceSAR: '39',
    priceGBP: '8',
    priceType: 'mo',
    icon: 'cloud-upload',
    popular: false
  },
  
  // MARKETING & MEDIA
  {
    id: 9,
    category: 'Business Solutions',
    name: 'Advertisement Management',
    description: 'Comprehensive ad management platform with advanced video marketing capabilities for maximum ROI.',
    features: ['Multi-Platform Ad Manager', 'Video Campaign Creation', 'Analytics & Reporting', 'Audience Targeting'],
    priceSAR: '599',
    priceGBP: '120',
    priceType: 'mo',
    icon: 'video',
    popular: true
  },
  
  // WEB DEVELOPMENT
  {
    id: 10,
    category: 'Business Solutions',
    name: 'Web Development',
    description: 'Custom coding, features, and design from our experts.',
    features: ['Custom Design', 'Responsive Development', 'API Integration', 'Quality Assurance'],
    priceSAR: 'By Quote',
    priceGBP: 'By Quote',
    priceType: null,
    icon: 'code',
    popular: true
  },
  {
    id: 11,
    category: 'Business Solutions',
    name: 'Bug Fixer Service',
    description: 'We find and fix technical issues and errors fast.',
    features: ['Quick Response', 'Expert Debugging', 'All Technologies', 'Guaranteed Fix'],
    priceSAR: 'By Quote',
    priceGBP: 'By Quote',
    priceType: null,
    icon: 'wrench',
    popular: false
  },
  
  // CRM & POS
  {
    id: 12,
    category: 'Business Solutions',
    name: 'CRM & POS Complete Solution',
    description: 'All-in-one Customer Relationship Management and Point of Sale system with AI-powered features, automation, and seamless integration for complete business operations.',
    features: ['CRM + POS Integration', 'AI Analytics & Insights', 'WhatsApp Integration', 'Auto Invoice & Receipts'],
    priceSAR: '299',
    priceGBP: '60',
    priceType: 'mo',
    icon: 'layers',
    popular: true
  },
  
  // BUSINESS FORMATION
  {
    id: 16,
    category: 'Business Solutions',
    name: 'LLC & LTD Formation',
    description: 'Premium company formation services with complete legal compliance, registration, and comprehensive business structuring for international markets.',
    features: ['Complete Legal Documentation', 'International Registration', 'Tax Optimization Advice', 'Ongoing Compliance Support'],
    priceSAR: '1,499',
    priceGBP: '300',
    priceType: null,
    icon: 'briefcase',
    popular: true
  },
  
  // E-COMMERCE
  {
    id: 17,
    category: 'E-Commerce',
    name: 'Multi-Platform Store Setup',
    description: 'Expert setup and optimization for Amazon, eBay, Etsy, and TikTok Shop with product listing, SEO optimization, and multi-channel management.',
    features: ['Amazon Seller Central Setup', 'eBay & Etsy Integration', 'TikTok Shop Configuration', 'Product Optimization & SEO'],
    priceSAR: '899',
    priceGBP: '180',
    priceType: null,
    icon: 'shopping-bag',
    popular: true
  },
  {
    id: 18,
    category: 'E-Commerce',
    name: 'Shopify Customization',
    description: 'Premium Shopify store design and development with custom themes, app integration, payment gateways, and conversion-optimized checkout flows.',
    features: ['Custom Theme Development', 'App Integration & Setup', 'Payment Gateway Configuration', 'Performance Optimization'],
    priceSAR: '1,299',
    priceGBP: '260',
    priceType: null,
    icon: 'store',
    popular: false
  },
  
  // INFRASTRUCTURE
  {
    id: 19,
    category: 'Hosting & Servers',
    name: 'RDP & Dedicated IP',
    description: 'Enterprise-grade Remote Desktop Protocol servers with dedicated IP addresses, enhanced security, and high-performance computing resources for business operations.',
    features: ['Dedicated IP Address', 'Full Administrator Access', 'SSD Storage & High RAM', '24/7 Technical Support'],
    priceSAR: '399',
    priceGBP: '80',
    priceType: 'mo',
    icon: 'server',
    popular: false
  },
  
  // AI & AUTOMATION
  {
    id: 20,
    category: 'Business Solutions',
    name: 'AI Automation Solutions',
    description: 'Cutting-edge AI-powered workflow automation, intelligent process optimization, and machine learning integration to streamline business operations and boost productivity.',
    features: ['Workflow Automation', 'AI Process Optimization', 'Machine Learning Integration', 'Custom AI Models'],
    priceSAR: '1,999',
    priceGBP: '400',
    priceType: 'mo',
    icon: 'brain',
    popular: true
  },
  {
    id: 21,
    category: 'Business Solutions',
    name: 'Chatbot & Trading Bot',
    description: 'Advanced AI chatbot development for customer service and sophisticated trading bots with algorithmic strategies for automated market analysis and execution.',
    features: ['AI-Powered Chatbot', 'Trading Algorithm Development', 'Real-time Market Analysis', 'Risk Management System'],
    priceSAR: '2,499',
    priceGBP: '500',
    priceType: null,
    icon: 'bot',
    popular: true
  },
  
  // MOBILE DEVELOPMENT
  {
    id: 22,
    category: 'Business Solutions',
    name: 'Android & iOS App Development',
    description: 'Professional native mobile application development for Android and iOS platforms with stunning UI/UX, robust backend integration, and App Store deployment.',
    features: ['Native Android & iOS Apps', 'Cross-Platform Compatibility', 'Backend API Integration', 'App Store Deployment'],
    priceSAR: '4,999',
    priceGBP: '1,000',
    priceType: null,
    icon: 'smartphone',
    popular: true
  }
];

const seedServices = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing services
    await Service.deleteMany({});
    console.log('🗑️  Cleared existing services');
    
    // Insert new services
    const result = await Service.insertMany(servicesData);
    console.log(`✅ Successfully seeded ${result.length} services`);
    
    console.log('\n📊 Seeded Services:');
    result.forEach(service => {
      console.log(`   - ${service.name} (ID: ${service.id})`);
    });
    
    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedServices();
}

module.exports = seedServices;
