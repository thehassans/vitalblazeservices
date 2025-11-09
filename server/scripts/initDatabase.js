const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
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
      console.error('❌ MONGODB_URI not found in environment variables');
      console.error('📁 Looking for .env file at:', path.join(__dirname, '../../.env'));
      console.error('💡 Please create a .env file in the project root with MONGODB_URI');
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
    const adminExists = await Admin.findOne({ 
      $or: [
        { email: 'vitalservices@vitalblaze.com' },
        { username: 'vitalservices' }
      ]
    });
    
    if (adminExists) {
      console.log('⚠️  Admin user already exists');
      console.log('   Updating credentials...');
      adminExists.email = 'vitalservices@vitalblaze.com';
      adminExists.password = 'vitalservice975312468';
      await adminExists.save();
      console.log('✅ Admin credentials updated successfully');
    } else {
      const admin = new Admin({
        username: 'vitalservices',
        password: 'vitalservice975312468',
        email: 'vitalservices@vitalblaze.com',
        role: 'superadmin'
      });
      await admin.save();
      console.log('✅ Admin user created successfully');
    }
    console.log('   Email: vitalservices@vitalblaze.com');
    console.log('   Password: vitalservice975312468\n');

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
