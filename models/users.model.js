const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema(
  {
    id: ObjectId,
    recconectId:  {type: String, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // User's email, must be unique
    password: { type: String, required: true }, // Hashed password for authentication
    role: { type: String, default: 'user', enum: ['user', 'admin'] }, // User role
    isActive: { type: Boolean, default: true }, // Whether the user is active 
    publicData: { type: Schema.Types.ObjectId, ref: 'PublicData' }, 
    privateData: { type: Schema.Types.ObjectId, ref: 'PrivateData' },
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

// Middleware to generate customId before saving
UserSchema.pre('save', async function (next) {
  if (!this.customId) {
    this.customId = `R-${uuidv4()}`; // Custom ID format, e.g., USER-uuid
  }
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
