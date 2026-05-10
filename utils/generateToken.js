import jwt from 'jsonwebtoken';

const generateToken = (id, role, organizationId = null) => {
  return jwt.sign(
    { id, role, organizationId }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1d' }
  );
};

export default generateToken;