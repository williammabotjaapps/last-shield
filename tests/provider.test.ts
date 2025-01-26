import React from 'react';
import { render, screen } from '@testing-library/react';
import { LastProvider, useAuth } from '../src/provider';

const TestComponent = () => {
  const { user, login, logout } = useAuth();
  
  return (
    <div>
      <h1>{user ? `Welcome, ${user.name}` : 'Please log in'}</h1>
      <button onClick={() => login({ id: 1, name: 'John Doe', role: 'admin' })}>
        Log In
      </button>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

describe('AuthProvider', () => {
  test('renders login prompt when not authenticated', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText(/please log in/i)).toBeInTheDocument();
  });

  test('allows user to log in', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByText(/log in/i);
    loginButton.click();

    expect(screen.getByText(/welcome, john doe/i)).toBeInTheDocument();
  });

  test('allows user to log out', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByText(/log in/i);
    loginButton.click();

    const logoutButton = screen.getByText(/log out/i);
    logoutButton.click();

    expect(screen.getByText(/please log in/i)).toBeInTheDocument();
  });
});