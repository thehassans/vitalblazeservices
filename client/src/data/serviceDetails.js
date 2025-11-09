// Ultra-Premium Service-Specific Details

export const serviceDetails = {
  // VPS Hosting
  3: {
    intro: "Enterprise-grade Virtual Private Server hosting with dedicated resources, complete root access, and scalable infrastructure designed for demanding applications and growing businesses.",
    estimatedTime: "1-2 business days",
    timeline: [
      { step: "Server Provisioning", duration: "2-4 hours", description: "High-performance SSD server setup with your chosen OS and control panel" },
      { step: "Security Hardening", duration: "4-6 hours", description: "Firewall configuration, SSH key setup, and security audit implementation" },
      { step: "Resource Optimization", duration: "6-8 hours", description: "Performance tuning, caching setup, and resource allocation" },
      { step: "Migration & Testing", duration: "1-2 days", description: "Data migration, application deployment, and comprehensive testing" }
    ],
    deliverables: ["Fully configured VPS", "Root SSH access", "Control panel setup", "Security certificates", "Backup configuration", "Monitoring dashboard"],
    technologies: ["Linux/Windows Server", "cPanel/Plesk", "CloudLinux", "LiteSpeed", "Nginx", "Redis Cache"]
  },

  // Dedicated Servers
  4: {
    intro: "Ultimate performance with bare-metal dedicated servers featuring premium hardware, complete control, DDoS protection, and managed support for mission-critical applications.",
    estimatedTime: "3-5 business days",
    timeline: [
      { step: "Hardware Selection", duration: "1 day", description: "Consultation on CPU, RAM, storage, and bandwidth requirements" },
      { step: "Server Deployment", duration: "1-2 days", description: "Physical server setup with chosen configuration and OS installation" },
      { step: "Network Configuration", duration: "1 day", description: "DDoS protection, firewall rules, and network optimization" },
      { step: "Security & Monitoring", duration: "1 day", description: "Advanced security setup, monitoring tools, and backup systems" }
    ],
    deliverables: ["Dedicated hardware", "Full root access", "DDoS protection", "Custom network setup", "Managed support", "Backup infrastructure"],
    technologies: ["Intel Xeon/AMD EPYC", "NVMe SSD Arrays", "100Gbps Network", "Enterprise Firewall", "Zabbix Monitoring", "Veeam Backup"]
  },

  // Domain Registration
  5: {
    intro: "Secure your perfect domain name with free WHOIS privacy, easy DNS management, and access to 100+ TLDs including .com, .net, .org, and country-specific extensions.",
    estimatedTime: "15 minutes - 24 hours",
    timeline: [
      { step: "Domain Search", duration: "5-10 min", description: "Check availability across multiple TLDs and get suggestions" },
      { step: "Registration Process", duration: "10-15 min", description: "Complete registration with your information and payment" },
      { step: "DNS Propagation", duration: "1-24 hours", description: "Domain activation and global DNS propagation" },
      { step: "Setup & Configuration", duration: "30 min", description: "DNS records, email forwarding, and WHOIS privacy setup" }
    ],
    deliverables: ["Registered domain", "WHOIS privacy", "DNS management panel", "Email forwarding", "Auto-renewal setup"],
    technologies: ["DNS Management", "WHOIS Privacy", "DNSSEC", "Domain Locking", "EPP Transfer Codes"]
  },

  // Website Backup
  8: {
    intro: "Automated cloud backup solution with daily snapshots, one-click restore, version control, and geo-redundant storage to protect your valuable data.",
    estimatedTime: "4-6 hours",
    timeline: [
      { step: "Backup Assessment", duration: "1 hour", description: "Analyze website size, database structure, and backup requirements" },
      { step: "Backup Configuration", duration: "2-3 hours", description: "Setup automated backup schedules and cloud storage integration" },
      { step: "Initial Backup", duration: "1-2 hours", description: "First complete backup of files, databases, and configurations" },
      { step: "Testing & Verification", duration: "1 hour", description: "Test restore process and verify backup integrity" }
    ],
    deliverables: ["Automated daily backups", "Cloud storage access", "Restore dashboard", "Version history", "Email notifications"],
    technologies: ["AWS S3/Azure Backup", "Incremental Backups", "AES-256 Encryption", "Automated Scheduling", "Restoration Tools"]
  },

  // Advertisement Management
  9: {
    intro: "Comprehensive multi-platform advertising solution with AI-powered video campaign creation, advanced analytics, audience targeting, and ROI optimization across all major ad networks.",
    estimatedTime: "1-2 weeks",
    timeline: [
      { step: "Strategy Development", duration: "2-3 days", description: "Market research, competitor analysis, and campaign strategy planning" },
      { step: "Creative Production", duration: "3-5 days", description: "Video content creation, ad copy writing, and creative design" },
      { step: "Platform Setup", duration: "2-3 days", description: "Configure Google Ads, Facebook, YouTube, and TikTok campaigns" },
      { step: "Launch & Optimization", duration: "3-5 days", description: "Campaign launch, A/B testing, and performance optimization" }
    ],
    deliverables: ["Multi-platform campaigns", "Video ad creatives", "Audience segments", "Analytics dashboard", "Monthly reports", "ROI tracking"],
    technologies: ["Google Ads", "Facebook Business", "YouTube Ads", "TikTok Ads", "Analytics 360", "Tag Manager"]
  },

  // Web Development
  10: {
    intro: "Custom web development with cutting-edge technologies, responsive design, API integration, and rigorous quality assurance for unique business requirements.",
    estimatedTime: "4-8 weeks",
    timeline: [
      { step: "Discovery & Planning", duration: "1 week", description: "Requirements gathering, wireframing, and technical architecture" },
      { step: "Design Phase", duration: "1-2 weeks", description: "UI/UX design, mockups, prototypes, and design system creation" },
      { step: "Development", duration: "2-4 weeks", description: "Front-end and back-end coding, API integration, database design" },
      { step: "QA & Deployment", duration: "1 week", description: "Testing, bug fixes, performance optimization, and live deployment" }
    ],
    deliverables: ["Custom website", "Admin panel", "API documentation", "Source code", "Deployment guide", "Training materials"],
    technologies: ["React/Next.js", "Node.js/Python", "PostgreSQL/MongoDB", "AWS/Azure", "Docker", "CI/CD Pipeline"]
  },

  // Bug Fixer Service
  11: {
    intro: "Expert debugging and issue resolution service with rapid response time, comprehensive root cause analysis, and guaranteed fixes for all technology stacks.",
    estimatedTime: "24 hours - 1 week",
    timeline: [
      { step: "Issue Analysis", duration: "2-4 hours", description: "Reproduce bug, analyze logs, and identify root cause" },
      { step: "Solution Design", duration: "2-4 hours", description: "Plan fix strategy and impact assessment" },
      { step: "Implementation", duration: "4-24 hours", description: "Code fixes, database patches, and configuration updates" },
      { step: "Testing & Verification", duration: "2-4 hours", description: "Unit testing, integration testing, and deployment" }
    ],
    deliverables: ["Bug fix implementation", "Root cause report", "Test documentation", "Prevention recommendations", "Code review"],
    technologies: ["All Programming Languages", "Debugging Tools", "Log Analysis", "Performance Profiling", "Version Control"]
  },

  // CRM
  12: {
    intro: "Complete Customer Relationship Management solution with contact management, sales pipeline automation, analytics dashboard, and seamless email integration for growing businesses.",
    estimatedTime: "2-3 weeks",
    timeline: [
      { step: "Requirements Analysis", duration: "3-5 days", description: "Business process mapping, workflow design, and customization planning" },
      { step: "System Configuration", duration: "5-7 days", description: "CRM setup, custom fields, pipelines, and automation rules" },
      { step: "Data Migration", duration: "2-3 days", description: "Import existing contacts, deals, and historical data" },
      { step: "Training & Launch", duration: "3-5 days", description: "Team training, documentation, and go-live support" }
    ],
    deliverables: ["CRM platform access", "Custom workflows", "Migrated data", "Training materials", "Mobile app access", "Integration setup"],
    technologies: ["Salesforce/HubSpot", "API Integration", "Email Sync", "Mobile Apps", "Analytics Engine", "Automation Tools"]
  },

  // Advanced CRM Suite
  13: {
    intro: "Enterprise-grade CRM with AI-powered insights, marketing automation, multi-channel support, custom workflows, and advanced analytics for large-scale operations.",
    estimatedTime: "4-6 weeks",
    timeline: [
      { step: "Enterprise Planning", duration: "1 week", description: "Stakeholder interviews, process mapping, and AI configuration" },
      { step: "Platform Deployment", duration: "2 weeks", description: "Multi-department setup, advanced automation, and AI training" },
      { step: "Integration Phase", duration: "1-2 weeks", description: "Connect with ERP, marketing tools, and communication platforms" },
      { step: "Training & Optimization", duration: "1 week", description: "Advanced training, AI optimization, and performance tuning" }
    ],
    deliverables: ["Enterprise CRM", "AI analytics", "Marketing automation", "Custom dashboards", "API integrations", "White-glove support"],
    technologies: ["Salesforce Enterprise", "Einstein AI", "Marketing Cloud", "Service Cloud", "Tableau", "Slack Integration"]
  },

  // POS System
  14: {
    intro: "Modern cloud-based Point of Sale system with real-time inventory management, payment processing, multi-location support, and comprehensive reporting for retail and restaurants.",
    estimatedTime: "1-2 weeks",
    timeline: [
      { step: "Business Setup", duration: "2-3 days", description: "Menu/product setup, pricing, taxes, and payment gateway integration" },
      { step: "Hardware Installation", duration: "1-2 days", description: "POS terminals, receipt printers, and card readers setup" },
      { step: "Staff Training", duration: "2-3 days", description: "Hands-on training for cashiers, managers, and admin staff" },
      { step: "Go-Live Support", duration: "2-3 days", description: "On-site support during first week of operations" }
    ],
    deliverables: ["POS software", "Hardware setup", "Payment integration", "Inventory system", "Reporting dashboard", "Staff training"],
    technologies: ["Square/Toast/Lightspeed", "Payment Gateway", "Inventory Management", "Cloud Sync", "Receipt Printing", "Mobile POS"]
  },

  // Integrated CRM + POS
  15: {
    intro: "All-in-one business management solution combining CRM and POS with unified dashboard, customer insights, sales analytics, and loyalty programs for seamless operations.",
    estimatedTime: "3-4 weeks",
    timeline: [
      { step: "Unified Planning", duration: "1 week", description: "Integration strategy, data mapping, and workflow design" },
      { step: "System Integration", duration: "1-2 weeks", description: "Connect CRM and POS, sync customer data, and configure automation" },
      { step: "Loyalty & Analytics", duration: "3-5 days", description: "Setup loyalty programs, customer insights, and unified reporting" },
      { step: "Complete Training", duration: "3-5 days", description: "Train teams on integrated system and best practices" }
    ],
    deliverables: ["Integrated platform", "Unified dashboard", "Customer profiles", "Loyalty system", "Sales analytics", "Complete training"],
    technologies: ["CRM+POS Integration", "Customer CDP", "Loyalty Engine", "Unified Analytics", "Marketing Automation", "Mobile Apps"]
  },

  // LLC & LTD Formation
  16: {
    intro: "Premium company formation services with complete legal compliance, international registration, tax optimization, and ongoing support for LLC and LTD structures in multiple jurisdictions.",
    estimatedTime: "2-4 weeks",
    timeline: [
      { step: "Consultation", duration: "2-3 days", description: "Business structure consultation, jurisdiction selection, and strategy" },
      { step: "Documentation", duration: "1 week", description: "Prepare articles of incorporation, operating agreements, and legal docs" },
      { step: "Registration", duration: "1-2 weeks", description: "File with government, obtain EIN/tax ID, and register business" },
      { step: "Post-Formation", duration: "3-5 days", description: "Setup bank account, tax registration, and compliance framework" }
    ],
    deliverables: ["Company registration", "Legal documents", "Tax ID/EIN", "Operating agreement", "Business bank account", "Compliance guide"],
    technologies: ["Legal Documentation", "Government Filing", "Tax Registration", "Corporate Structuring", "Compliance Management"]
  },

  // Multi-Platform Store
  17: {
    intro: "Expert setup and optimization for Amazon, eBay, Etsy, and TikTok Shop with product listing optimization, SEO, multi-channel inventory management, and sales analytics.",
    estimatedTime: "2-3 weeks",
    timeline: [
      { step: "Account Setup", duration: "3-5 days", description: "Create and verify seller accounts on all platforms" },
      { step: "Product Optimization", duration: "1 week", description: "Product photography, descriptions, SEO, and competitive pricing" },
      { step: "Listing Launch", duration: "3-5 days", description: "Upload products, configure shipping, and setup payment processing" },
      { step: "Marketing Setup", duration: "2-3 days", description: "Advertising campaigns, promotions, and analytics configuration" }
    ],
    deliverables: ["Multi-platform stores", "Optimized listings", "SEO keywords", "Product images", "Inventory sync", "Analytics dashboard"],
    technologies: ["Amazon Seller Central", "eBay Seller Hub", "Etsy Shop Manager", "TikTok Shop", "Multichannel Tools", "SEO Tools"]
  },

  // Shopify Customization
  18: {
    intro: "Premium Shopify store design with custom themes, advanced app integration, payment gateways, conversion-optimized checkout, and performance tuning for maximum sales.",
    estimatedTime: "3-4 weeks",
    timeline: [
      { step: "Design & Branding", duration: "1 week", description: "Custom theme design, branding, and UX optimization" },
      { step: "Development", duration: "1-2 weeks", description: "Theme customization, app integration, and feature development" },
      { step: "Product Setup", duration: "3-5 days", description: "Product imports, collections, and inventory configuration" },
      { step: "Launch Preparation", duration: "2-3 days", description: "Payment setup, shipping, testing, and optimization" }
    ],
    deliverables: ["Custom Shopify theme", "App integrations", "Payment gateways", "Product catalog", "SEO optimization", "Training guide"],
    technologies: ["Shopify Liquid", "Theme Customization", "App APIs", "Payment Processing", "Conversion Optimization", "Performance Tuning"]
  },

  // RDP & Dedicated IP
  19: {
    intro: "Enterprise Remote Desktop Protocol servers with dedicated IP addresses, full administrator access, high-performance computing resources, and 24/7 technical support.",
    estimatedTime: "24-48 hours",
    timeline: [
      { step: "Server Selection", duration: "2-4 hours", description: "Choose specs: CPU, RAM, storage, and bandwidth requirements" },
      { step: "Deployment", duration: "4-8 hours", description: "Windows Server installation, RDP configuration, and IP assignment" },
      { step: "Security Setup", duration: "4-6 hours", description: "Firewall rules, antivirus, and security hardening" },
      { step: "Delivery & Support", duration: "2-4 hours", description: "Access credentials, connection guide, and onboarding" }
    ],
    deliverables: ["RDP server access", "Dedicated IP", "Admin credentials", "Security setup", "Connection guide", "24/7 support"],
    technologies: ["Windows Server", "RDP Protocol", "Dedicated IP", "SSD Storage", "DDoS Protection", "Firewall Management"]
  },

  // AI Automation
  20: {
    intro: "Cutting-edge AI workflow automation with intelligent process optimization, machine learning models, and custom AI integration to transform business operations and boost productivity.",
    estimatedTime: "6-12 weeks",
    timeline: [
      { step: "AI Strategy", duration: "1-2 weeks", description: "Process analysis, AI opportunity mapping, and solution design" },
      { step: "Model Development", duration: "3-6 weeks", description: "Train custom AI models, develop automation workflows, and integrate APIs" },
      { step: "Integration", duration: "1-2 weeks", description: "Connect with existing systems, data pipelines, and user interfaces" },
      { step: "Optimization", duration: "1-2 weeks", description: "Model tuning, performance optimization, and team training" }
    ],
    deliverables: ["AI automation system", "Custom ML models", "API integrations", "Analytics dashboard", "Documentation", "Ongoing support"],
    technologies: ["Python/TensorFlow", "OpenAI/GPT", "Machine Learning", "Workflow Automation", "API Integration", "Cloud AI Services"]
  },

  // Chatbot & Trading Bot
  21: {
    intro: "Advanced AI chatbot for customer service and sophisticated algorithmic trading bot with real-time market analysis, risk management, and automated execution strategies.",
    estimatedTime: "4-8 weeks",
    timeline: [
      { step: "Requirements & Strategy", duration: "1 week", description: "Define bot capabilities, trading strategies, and risk parameters" },
      { step: "AI Development", duration: "2-4 weeks", description: "Train NLP models, develop trading algorithms, and backtesting" },
      { step: "Integration & Testing", duration: "1-2 weeks", description: "Connect to platforms, API integration, and comprehensive testing" },
      { step: "Launch & Monitoring", duration: "1 week", description: "Deployment, performance monitoring, and optimization" }
    ],
    deliverables: ["AI chatbot", "Trading algorithms", "Risk management", "Analytics dashboard", "API integrations", "Monitoring system"],
    technologies: ["NLP/GPT Models", "Trading APIs", "Python/Node.js", "Machine Learning", "Real-time Data", "Risk Algorithms"]
  },

  // Mobile Apps
  22: {
    intro: "Professional native mobile app development for Android and iOS with stunning UI/UX, robust backend integration, push notifications, and complete App Store deployment.",
    estimatedTime: "8-16 weeks",
    timeline: [
      { step: "Planning & Design", duration: "2-3 weeks", description: "Wireframes, UI/UX design, user flows, and design system" },
      { step: "Development", duration: "4-8 weeks", description: "Native iOS and Android development, backend API, database design" },
      { step: "Testing & QA", duration: "1-2 weeks", description: "Beta testing, bug fixes, performance optimization, security audit" },
      { step: "Launch & Support", duration: "1-2 weeks", description: "App Store submission, approval process, and post-launch support" }
    ],
    deliverables: ["iOS app", "Android app", "Backend API", "Admin panel", "App Store listings", "Source code", "Documentation"],
    technologies: ["Swift/Kotlin", "React Native/Flutter", "Node.js/Firebase", "Push Notifications", "Analytics", "App Store Connect"]
  }
};

export const getServiceDetails = (serviceId) => {
  return serviceDetails[serviceId] || {
    intro: "Premium service designed to meet your business needs with expert implementation and ongoing support.",
    estimatedTime: "1-2 weeks",
    timeline: [
      { step: "Consultation & Planning", duration: "1-2 days", description: "Understand requirements and create detailed project plan" },
      { step: "Implementation", duration: "1-2 weeks", description: "Expert deployment with regular updates" },
      { step: "Testing & QA", duration: "2-3 days", description: "Rigorous testing and quality assurance" },
      { step: "Launch & Training", duration: "1-2 days", description: "Go-live support and team training" }
    ],
    deliverables: ["Complete setup", "Documentation", "Training", "Support access"],
    technologies: ["Industry-leading tools", "Best practices", "Security standards"]
  };
};
