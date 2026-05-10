import mongoose from 'mongoose';

const featureFlagSchema = new mongoose.Schema({
  featureKey: {
    type: String,
    required: true,
    trim: true
  },
  isEnabled: {
    type: Boolean,
    default: false
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  }
});

featureFlagSchema.index({ featureKey: 1, organizationId: 1 }, { unique: true });

export default mongoose.model('FeatureFlag', featureFlagSchema);