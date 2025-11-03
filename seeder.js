const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users'); // We will create this file
const products = require('./data/products'); // We will create this file
const User = require('./models/userModel');
const Item = require('./models/itemModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Item.deleteMany();
    await User.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Add admin user to each product
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });

    // Insert products
    await Item.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Item.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// To run this script, use node backend/seeder.js in terminal
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
