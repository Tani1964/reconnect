const User = require('../models/users.model.js');
const PublicData = require('../models/publicData.model.js');
const PrivateData = require('../models/privateData.Model.js');

/**
 * Controller to get all users
 */
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users (optional: include related data)
    const users = await User.find().populate('publicData').populate('privateData');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

/**
 * Controller for user signup
 */
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Implement signup logic here (e.g., hash password, save to DB)
    const newUser = new User({ username, password });
    const savedUser = await newUser.save();

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { id: savedUser._id, username } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

/**
 * Controller for user signin
 */
const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Implement signin logic here (e.g., verify password, generate token)
    const token = 'sample-token'; // Replace with actual token generation logic

    res.status(200).json({ message: 'User signed in successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
};

/**
 * Controller for user signout
 */
const signout = async (req, res) => {
  try {
    // Implement signout logic here (e.g., invalidate token or clear session)
    res.status(200).json({ message: 'User signed out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing out', error: error.message });
  }
};

/**
 * Function to create a user with related public and private data
 */
const createUserWithRelatedData = async (newUser, publicDataPayload, privateDataPayload) => {
  try {
    // Create and save the user
    const user = new User(newUser);
    const savedUser = await user.save();

    // Create and save public data
    const publicData = new PublicData({ userId: savedUser._id, ...publicDataPayload });
    const savedPublicData = await publicData.save();

    // Create and save private data
    const privateData = new PrivateData({ userId: savedUser._id, ...privateDataPayload });
    const savedPrivateData = await privateData.save();

    // Link public and private data to the user
    savedUser.publicData = savedPublicData._id;
    savedUser.privateData = savedPrivateData._id;
    await savedUser.save();

    console.log('User with related data created:', savedUser);
    return savedUser;
  } catch (error) {
    console.error('Error creating user with related data:', error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUsers,
  signup,
  signin,
  signout,
  createUserWithRelatedData,
};
