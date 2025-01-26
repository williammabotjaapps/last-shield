import { verifyToken, hasRole, generateToken, refreshToken } from '../src/auth';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; 

describe('Authentication Utilities', () => {
  let validToken: string;
  let invalidToken: string;

  beforeAll(() => {
    validToken = jwt.sign({ id: 1, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
    invalidToken = validToken + 'invalid';
  });

  test('verifyToken should return valid for a correct token', () => {
    const result = verifyToken(validToken);
    expect(result.valid).toBe(true);
    expect(result.decoded).toHaveProperty('id', 1);
    expect(result.decoded).toHaveProperty('role', 'admin');
  });

  test('verifyToken should return invalid for an incorrect token', () => {
    const result = verifyToken(invalidToken);
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('hasRole should return true for a matching role', () => {
    const decoded = { id: 1, role: 'admin' };
    expect(hasRole(decoded, 'admin')).toBe(true);
  });

  test('hasRole should return false for a non-matching role', () => {
    const decoded = { id: 1, role: 'user' };
    expect(hasRole(decoded, 'admin')).toBe(false);
  });

  test('generateToken should create a valid token', () => {
    const userData = { account_no: '1', user_role: 'admin' };
    const token = generateToken(userData);
    const decoded = jwt.verify(token, SECRET_KEY);
    expect(decoded).toHaveProperty('id', 1);
    expect(decoded).toHaveProperty('role', 'admin');
  });

  test('refreshToken should return a new token for a valid old token', () => {
    const newToken = refreshToken(validToken);
    expect(newToken).toBeDefined();
    const decoded = jwt.verify(String(newToken), SECRET_KEY);
    expect(decoded).toHaveProperty('id', 1);
    expect(decoded).toHaveProperty('role', 'admin');
  });

  test('refreshToken should return null for an invalid old token', () => {
    const result = refreshToken(invalidToken);
    expect(result).toBeNull();
  });
});