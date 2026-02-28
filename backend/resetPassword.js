import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const resetAdminPassword = async () => {
  try {
    await connectDB();

    // Find admin user
    const admin = await User.findOne({ email: 'admin@shophub.com' }).select('+password');

    if (!admin) {
      console.log('Admin user not found');
      process.exit(1);
    }

    // Hash the password using bcrypt directly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Update using raw MongoDB update (bypass mongoose middleware)
    await User.updateOne(
      { email: 'admin@shophub.com' },
      { password: hashedPassword }
    );

    console.log('Admin password reset successfully');
    console.log('Email: admin@shophub.com');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error resetting password:', error.message);
    process.exit(1);
  }
};

resetAdminPassword();
