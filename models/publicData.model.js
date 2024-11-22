const PublicDataSchema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User
      bio: { type: String, default: '' },
      profileViews: { type: Number, default: 0 },
      socialLinks: { type: Map, of: String }, // e.g., { facebook: 'url', twitter: 'url' }
    },
    { timestamps: true }
  );
  
  const PublicData = mongoose.model('PublicData', PublicDataSchema);
  module.exports = PublicData;
  