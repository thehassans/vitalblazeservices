require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Service = require('../models/Service');
const servicesData = require('../data/memoryDb');

const initDatabase = async () => {
  try {
    console.log('🚀 Starting database initialization...\n');

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }

    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected\n');

    // Initialize Admin User
    console.log('👤 Setting up admin user...');
    const adminExists = await Admin.findOne({ username: 'vitalservices' });
    
    if (adminExists) {
      console.log('⚠️  Admin user already exists');
    } else {
      const admin = new Admin({
        username: 'vitalservices',
        password: 'Hassanvitalblaze123',
        email: 'info@vitalblaze.com',
        role: 'superadmin'
      });
      await admin.save();
      console.log('✅ Admin user created successfully');
      console.log('   Username: vitalservices');
      console.log('   Password: Hassanvitalblaze123\n');
    }

    // Initialize Services
    console.log('🛠️  Setting up services...');
    const serviceCount = await Service.countDocuments();
    
    if (serviceCount > 0) {
      console.log(`⚠️  Database already has ${serviceCount} services`);
      console.log('   Skipping service initialization...\n');
    } else {
      console.log(`📦 Importing ${servicesData.length} services...`);
      await Service.insertMany(servicesData);
      console.log(`✅ Successfully imported ${servicesData.length} services\n`);
    }

    // Display summary
    const totalAdmins = await Admin.countDocuments();
    const totalServices = await Service.countDocuments();
    
    console.log('📊 Database Summary:');
    console.log(`   Total Admins: ${totalAdmins}`);
    console.log(`   Total Services: ${totalServices}`);
    console.log('\n✨ Database initialization completed successfully!');
    
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Database initialization failed:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
};

// Run initialization
initDatabase();
