import Organization from '../models/Organization.js';


export const createOrganization = async (req, res) => {
  try {
    const { name } = req.body;
    const orgExists = await Organization.findOne({ name });
    
    if (orgExists) return res.status(400).json({ message: 'Organization already exists' });

    const organization = await Organization.create({ name });
    res.status(201).json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find({});
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};