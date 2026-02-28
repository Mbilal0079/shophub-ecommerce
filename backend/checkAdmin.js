import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const checkAdmin = async () => {
  try {
    await connectDB();

    const admin = await User.findOne({ email: 'admin@shophub.com' }).select('+password');

    if (!admin) {
      console.log('Admin user not found');
      process.exit(1);
    }

    console.log('Admin user found:');
    console.log('  Name:', admin.name);
    console.log('  Email:', admin.email);
    console.log('  Role:', admin.role);
    console.log('  Password hash exists:', !!admin.password);
    console.log('  Password hash preview:', admin.password?.substring(0, 20) + '...');

    if (!admin.password) {
      console.log('Password is not set!');
      process.exit(1);
    }

    // Test password match
    const isMatch = await admin.matchPassword('admin123');
    console.log('  Password matches "admin123":', isMatch);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkAdmin();
