import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Organization from '../models/Organization.js';
import generateToken from '../utils/generateToken.js';


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === process.env.SUPER_ADMIN_EMAIL && password === process.env.SUPER_ADMIN_PASSWORD) {
      return res.json({
        message: 'Super Admin logged in successfully',
        token: generateToken('super_admin_id', 'SUPER_ADMIN'),
        user: { email, role: 'SUPER_ADMIN' }
      });
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return res.json({
        message: 'User logged in successfully',
        token: generateToken(user._id, user.role, user.organizationId),
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          organizationId: user.organizationId
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};


export const registerOrgAdmin = async (req, res) => {
  const { email, password, organizationId } = req.body;

  try {

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }


    const orgExists = await Organization.findById(organizationId);
    if (!orgExists) {
      return res.status(404).json({ message: 'Organization not found. Super Admin must create it first.' });
    }


    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);


    const user = await User.create({
      email,
      passwordHash,
      role: 'ORG_ADMIN',
      organizationId
    });

    if (user) {
      res.status(201).json({
        message: 'Organization Admin created successfully',
        token: generateToken(user._id, user.role, user.organizationId),
        user: { id: user._id, email: user.email, role: user.role }
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during signup', error: error.message });
  }
};