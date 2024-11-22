const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PrivateDataSchema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User
      address: { type: String },
      phoneNumber: { type: String },
      sensitiveNotes: { type: String },
    },
    { timestamps: true }
  );
  
  const PrivateData = mongoose.model('PrivateData', PrivateDataSchema);
  module.exports = PrivateData;
  