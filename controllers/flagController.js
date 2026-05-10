import FeatureFlag from '../models/FeatureFlag.js';


export const createFlag = async (req, res) => {
  try {
    const { featureKey, isEnabled } = req.body;
    const organizationId = req.user.organizationId; 

    const flagExists = await FeatureFlag.findOne({ featureKey, organizationId });
    if (flagExists) return res.status(400).json({ message: 'Flag already exists in your org' });

    const flag = await FeatureFlag.create({ featureKey, isEnabled, organizationId });
    res.status(201).json(flag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getFlags = async (req, res) => {
  try {
    const flags = await FeatureFlag.find({ organizationId: req.user.organizationId });
    res.status(200).json(flags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateFlag = async (req, res) => {
  try {
    const flag = await FeatureFlag.findOne({ _id: req.params.id, organizationId: req.user.organizationId });
    if (!flag) return res.status(404).json({ message: 'Flag not found' });

    flag.isEnabled = req.body.isEnabled !== undefined ? req.body.isEnabled : flag.isEnabled;
    const updatedFlag = await flag.save();
    
    res.status(200).json(updatedFlag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const checkFlag = async (req, res) => {
  try {
    const { orgId, featureKey } = req.query;
    if (!orgId || !featureKey) {
      return res.status(400).json({ message: 'Please provide orgId and featureKey' });
    }

    const flag = await FeatureFlag.findOne({ organizationId: orgId, featureKey });
    
    if (!flag) {
      return res.status(200).json({ isEnabled: false, message: 'Feature not found, defaulting to disabled' });
    }

    res.status(200).json({ isEnabled: flag.isEnabled });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};