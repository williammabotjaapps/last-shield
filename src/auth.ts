import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; 

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

export const hasRole = (decodedToken: any, requiredRole: string) => {
  return decodedToken && decodedToken.role === requiredRole;
};

export const generateToken = (userData: any) => {
  return jwt.sign(userData, SECRET_KEY, { expiresIn: '1h' });
};

export const refreshToken = (oldToken: string) => {
  const { valid, decoded } = verifyToken(oldToken);
  if (valid) {
    return generateToken({ id: decoded.id, role: decoded.role });
  }
  return null;
};