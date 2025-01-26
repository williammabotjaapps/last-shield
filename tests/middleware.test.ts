import { NextResponse } from 'next/server';
import { authMiddleware } from '../src/middleware';
import jwt from 'jsonwebtoken';

describe('Auth Middleware', () => {
  const mockRequest = (token: string | null) => ({
    cookies: { token },
  });

  const mockResponse = () => {
    const res = {
      redirect: jest.fn(),
    };
    return res;
  };

  test('should allow access for valid token', () => {
    const req = mockRequest('valid-token');
    const res = mockResponse();
    const next = jest.fn();

    jest.spyOn(jwt, 'verify').mockImplementation(() => ({ id: 1, role: 'admin' }));

    const result = authMiddleware(req as any, res as any, next);
    expect(next).toHaveBeenCalled(); 
    expect(res.redirect).not.toHaveBeenCalled(); 
  });

  test('should redirect to login for invalid token', () => {
    const req = mockRequest('invalid-token');
    const res = mockResponse();
    const next = jest.fn();

    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const result = authMiddleware(req as any, res as any, next);
    expect(next).not.toHaveBeenCalled(); 
    expect(res.redirect).toHaveBeenCalledWith('/login'); 
  });

  test('should redirect to login if no token is present', () => {
    const req = mockRequest(null);
    const res = mockResponse();
    const next = jest.fn();

    const result = authMiddleware(req as any, res as any, next);
    expect(next).not.toHaveBeenCalled(); 
    expect(res.redirect).toHaveBeenCalledWith('/login'); 
  });
});