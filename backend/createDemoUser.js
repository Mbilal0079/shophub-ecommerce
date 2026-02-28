import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const createDemoUser = async () => {
  try {
    await connectDB();

    // Get the database connection
    const db = mongoose.connection.db;

    // Check if demo user already exists
    const userExists = await db.collection('users').findOne({ email: 'demo@shophub.com' });
    if (userExists) {
      console.log('Demo user already exists');
      console.log('Email: demo@shophub.com');
      console.log('Password: demo123');
      process.exit(0);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('demo123', salt);

    // Insert demo user directly into MongoDB
    const result = await db.collection('users').insertOne({
      name: 'Demo User',
      email: 'demo@shophub.com',
      password: hashedPassword,
      role: 'user',
      phone: '+1-555-0123',
      address: {
        street: '123 Demo Street',
        city: 'Demo City',
        state: 'DS',
        zipCode: '12345',
        country: 'Demo Country'
      },
      avatar: {
        public_id: '',
        url: 'https://res.cloudinary.com/demo/image/upload/v1/avatar-default.png'
      },
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Demo user created successfully');
    console.log('Email: demo@shophub.com');
    console.log('Password: demo123');
    console.log('Name: Demo User');
    console.log('Role: user');

    process.exit(0);
  } catch (error) {
    console.error('Error creating demo user:', error.message);
    process.exit(1);
  }
};

createDemoUser();
