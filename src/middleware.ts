import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: { cookies: { token: any; }; user: string | jwt.JwtPayload; }, p0: any, next: jest.Mock<any, any, any>) {
  const token = req.cookies.token;

  if (!token) {
    return NextResponse.redirect('/login'); 
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded; 
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect('/login');
  }
}