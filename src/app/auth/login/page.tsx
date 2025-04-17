'use client'

import { useLoginMutation } from '@/redux/service/authApi';
import React, { useState, useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/templates/MainLayout/MainLayout';
import style from './page.module.css';
import LanguageContext, { LanguageContextType } from '@/redux/context/LanguageContext';

const LoginPage: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
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
        router.push('/dashboard');
      }
    } catch (err) {
      console.warn(err);
      setError(isSpanish ? 'Credenciales inválidas. Por favor, intenta de nuevo.' : 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [credentials, login]);

  return (
    <MainLayout isAdmin={false}>
      <section className={style['login-container']}>
        <form onSubmit={handleSubmit} className={style["login-form"]}>
          <h2 className={style["login-title"]}>{isSpanish ? 'Iniciar sesión' : 'Login'}</h2>
          
          {error && (
            <div className={style["error-message"]}>
              {error}
            </div>
          )}

          <div className={style["form-group"]}>
            <label htmlFor="email" className={style["form-label"]}>
              {isSpanish ? 'Usuario'  : 'Username'}:
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={credentials.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className={style["form-group"]}>
            <label htmlFor="password" className={style["form-label"]}>
              {isSpanish ? 'Contraseña' : 'Password'}:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={style["form-input"]}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={style["submit-button"]}
          >
            {isSpanish
              ? isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'
              : isLoading ? 'Logging in...' : 'Login'
            }
          </button>
        </form>
      </section>
    </MainLayout>
  );
};

export default LoginPage;