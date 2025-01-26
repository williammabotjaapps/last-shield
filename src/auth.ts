import jwt, { JwtPayload } from 'jsonwebtoken';
import { useLastTokenStore } from 'store';
import { useStore } from 'zustand'; 

interface LastUserData {
  account_no?: string | null;
  user_role?: string | null;
}

const SECRET_KEY = String(process?.env?.NEXT_PUBLIC_LAST_SECRET_KEY);

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    const userData: LastUserData = {
      account_no: decoded.account_no || null,
      user_role: decoded.user_role || null,
    };

    return { valid: true, decoded: userData };
  } catch (error: any) {
    return { valid: false, error: error?.message };
  }
};

export const hasRole = (decodedToken: any, requiredRole: string) => {
  return decodedToken && decodedToken.user_role === requiredRole; 
};

export const generateToken = (userData: LastUserData) => {
  return jwt.sign(userData, SECRET_KEY, { expiresIn: '1h' });
};

export const refreshToken = (oldToken: string) => {
  const { valid, decoded } = verifyToken(oldToken);
  if (valid) {
    return generateToken({ account_no: decoded?.account_no, user_role: decoded?.user_role });
  }
  return null;
};

export const storeToken = (token: string | null) => {
  const { setLastToken } = useStore(useLastTokenStore);
  setLastToken(token);
};