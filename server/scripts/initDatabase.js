const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const Service = require('../models/Service');
const { services } = require('../data/memoryDb');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const initDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');

    // Create admin user
    const adminEmail = 'vitalservices@vitalblaze.com';
    const adminPassword = 'vitalservice975312468';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
    } else {
      const admin = new User({
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        isActive: true
      });
      
      await admin.save();
      console.log('✅ Admin user created successfully');
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
    }

    // Import services
    console.log('\n📦 Importing services...');
    
    // Clear existing services (optional - comment out if you want to keep existing)
    // await Service.deleteMany({});
    
    let imported = 0;
    let skipped = 0;

    for (const serviceData of services) {
      const existingService = await Service.findOne({ id: serviceData.id });
      
      if (existingService) {
        skipped++;
        continue;
      }

      const service = new Service(serviceData);
      await service.save();
      imported++;
    }

    console.log(`✅ Services imported: ${imported}`);
    console.log(`ℹ️  Services skipped (already exist): ${skipped}`);
    console.log(`📊 Total services in database: ${await Service.countDocuments()}`);

    console.log('\n🎉 Database initialization complete!');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
};

// Run initialization
initDatabase();
