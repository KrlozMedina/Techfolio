'use client';

/**
 * =========================================================
 * Login Page
 * ---------------------------------------------------------
 * Página de autenticación del sistema.
 *
 * Funcionalidades:
 * - Validación de formulario con React Hook Form + Zod
 * - Internacionalización mediante hook useTranslation
 * - Autenticación usando RTK Query
 * - Manejo de estados de error
 * - Redirección al dashboard tras login exitoso
 *
 * Flujo:
 * 1. Usuario ingresa credenciales
 * 2. Validación cliente con Zod
 * 3. Petición al endpoint de login
 * 4. Si es exitoso → redirección a /dashboard
 * 5. Si falla → se muestra mensaje de error
 * =========================================================
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import clsx from 'clsx';

import { useLoginMutation } from '@/infrastructure/auth/auth.api';
import { useTranslation } from '@/hooks/useTranslation';

import styles from './page.module.scss';
import { Button } from '@/components/atom/Button/Button';
import { Input } from '@/components/atom/Input/Input';

const LoginPage: React.FC = () => {

  /**
   * Hook de internacionalización
   */
  const { t } = useTranslation();

  /**
   * Router de Next.js para redirecciones
   */
  const router = useRouter();

  /**
   * Mutación RTK Query para login
   */
  const [login] = useLoginMutation();

  /**
   * Estado para manejar errores del servidor
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * =========================================================
   * Schema de validación
   * ---------------------------------------------------------
   * Define reglas de validación del formulario usando Zod
   * =========================================================
   */
  const loginSchema = z.object({

    /**
     * Username:
     * - mínimo 3 caracteres
     * - solo caracteres alfanuméricos, ".", "_" o "-"
     */
    username: z
      .string()
      .min(3, t.login.messageUser1)
      .regex(/^[a-zA-Z0-9._-]+$/, t.login.messageUser2),

    /**
     * Password:
     * - mínimo 6 caracteres
     * - al menos un número
     * - al menos una letra mayúscula
     */
    password: z
      .string()
      .min(6, t.login.messagePass1)
      .regex(/[0-9]/, t.login.messagePass2)
      .regex(/[A-Z]/, t.login.messagePass3),
  });

  /**
   * Tipo inferido automáticamente desde el schema
   */
  type LoginFormData = z.infer<typeof loginSchema>;

  /**
   * =========================================================
   * React Hook Form
   * ---------------------------------------------------------
   * Maneja el estado del formulario y validación
   * =========================================================
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  /**
   * =========================================================
   * Submit handler
   * ---------------------------------------------------------
   * Ejecuta login contra el backend.
   * Si es exitoso redirige al dashboard.
   * =========================================================
   */
  const onSubmit = async (data: LoginFormData) => {

    /**
     * Limpia errores previos
     */
    setError(null);

    try {

      /**
       * Ejecuta login vía RTK Query
       */
      await login(data).unwrap();

      /**
       * Redirección al dashboard
       */
      router.push('/dashboard');

    } catch {

      /**
       * Manejo de error de autenticación
       */
      setError(t.login.error);
    }
  };

  return (

    /**
     * =========================================================
     * Login Container
     * =========================================================
     */
    <section className={styles['login__container']}>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles['login__form']}
      >

        <fieldset>

          {/* =========================================================
              Form Title
          ========================================================= */}

          <legend className={styles['login__title']}>
            {t.login.title}
          </legend>

          {/* =========================================================
              Server Error Message
          ========================================================= */}

          {error && (
            <div
              className={styles['login__error-message']}
              role="alert"
            >
              {error}
            </div>
          )}

          {/* =========================================================
              USERNAME FIELD
          ========================================================= */}

          <label className={styles['login__label']}>
            {t.login.user}

            <Input
              {...register("username")}
              size="md"
              disabled={isSubmitting}
              className={clsx({
                [styles["login__input--error"]]: errors.username,
              })}
            />
          </label>

          {errors.username && (
            <p className={styles['login__input--message-error']}>
              {errors.username.message}
            </p>
          )}

          {/* =========================================================
              PASSWORD FIELD
          ========================================================= */}

          <label className={styles['login__label']}>
            {t.login.pass}

            <Input
              type="password"
              {...register("password")}
              size="md"
              disabled={isSubmitting}
              aria-invalid={!!errors.password}
              className={clsx({
                [styles["login__input--error"]]: errors.password,
              })}
            />
          </label>

          {errors.password && (
            <p className={styles['login__input--message-error']}>
              {errors.password.message}
            </p>
          )}

          {/* =========================================================
              SUBMIT BUTTON
          ========================================================= */}

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
          >
            {isSubmitting ? t.login.loginIn : t.login.login}
          </Button>

          {/* =========================================================
              CANCEL BUTTON
          ========================================================= */}

          <Button
            type="button"
            variant="ghost"
            size="md"
            className={styles["login__cancel"]}
            onClick={() => router.push("/")}
          >
            {t.login.cancel}
          </Button>

        </fieldset>

      </form>

    </section>
  );
};

export default LoginPage;