'use client'

import { useLoginMutation } from '@/redux/service/projectsApi';
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useLoginMutation();
  const router = useRouter();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: mutationError } = await login({ 
        username: credentials.email, 
        password: credentials.password 
      });

      if (mutationError) {
        throw new Error('Login failed');
      }

      if (data) {
        router.push('/register');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [credentials, login, router]);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="text" className="form-label">
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={credentials.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="form-input"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;