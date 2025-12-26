'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useLoginMutation } from '@/store/service/authApi';
import { LanguageContext, LanguageContextType } from '@/context/LanguageContext';

import style from './page.module.css';

const LoginPage: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
  const router = useRouter();
  const [login] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);

  const loginSchema = z.object({
    username: z
      .string()
      .min(3, isSpanish ? 'Mínimo 3 caracteres' : 'Minimum 3 characters')
      .regex(/^[a-zA-Z0-9._-]+$/, isSpanish
        ? 'Solo letras, números y . _ -'
        : 'Only letters, numbers and . _ -'
      ),
    password: z
      .string()
      .min(6, isSpanish ? 'Mínimo 6 caracteres' : 'Minimum 6 characters')
      .regex(/[0-9]/, isSpanish ? 'Debe contener un número' : 'Must contain a number')
      .regex(/[A-Z]/, isSpanish ? 'Debe contener una mayúscula' : 'Must contain an uppercase letter'),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      await login(data).unwrap();
      router.push('/dashboard');
    } catch {
      setError(
        isSpanish
          ? 'Usuario o contraseña incorrectos'
          : 'Invalid username or password'
      );
    }
  };

  return (
    <section className={style['login__container']}>
      <form onSubmit={handleSubmit(onSubmit)} className={style['login__form']}>
        <fieldset>
          <legend className={style['login__title']}>
            {isSpanish ? 'Iniciar sesión' : 'Login'}
          </legend>

          {error && (
            <div className={style['login__error-message']} role="alert">
              {error}
            </div>
          )}

          <label>
            {isSpanish ? 'Usuario' : 'Username'}
            <input {...register('username')} disabled={isSubmitting} />
          </label>
          {errors.username && <p>{errors.username.message}</p>}

          <label>
            {isSpanish ? 'Contraseña' : 'Password'}
            <input type="password" {...register('password')} disabled={isSubmitting} />
          </label>
          {errors.password && <p>{errors.password.message}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isSpanish ? 'Ingresando…' : 'Logging in…'
              : isSpanish ? 'Entrar' : 'Login'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/')}
            className={style['login__cancel']}
          >
            {isSpanish ? 'Cancelar' : 'Cancel'}
          </button>

        </fieldset>
      </form>
    </section>
  );
};

export default LoginPage;


// 'use client';

// import React, { useState, useContext } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// import { useLoginMutation } from '@/store/service/authApi';
// import { LanguageContext, LanguageContextType } from '@/context/LanguageContext';

// import MainLayout from '@/components/templates/MainLayout/MainLayout';
// import style from './page.module.css';

// const LoginPage: React.FC = () => {
//   // 🌐 Multilanguage support
//   const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

//   // 🔐 Redux Toolkit (RTK Query) mutation for login
//   const [login] = useLoginMutation();

//   // ⚠️ Local state for login error messages
//   const [error, setError] = useState<string | null>(null);

//   // 🚀 Router hook to navigate after login
//   const router = useRouter();

//   // ✅ Zod validation schema for login form
//   const loginSchema = z.object({
//     username: z
//       .string()
//       .min(3, isSpanish
//         ? 'El usuario debe tener al menos 3 caracteres'
//         : 'The username must be at least 3 characters long'
//       )
//       .regex(/^[a-zA-Z0-9._-]+$/, isSpanish
//         ? 'Solo se permiten letras, números y . _ -'
//         : 'Only letters, numbers, and . _ - are allowed'
//       ),
//     password: z
//       .string()
//       .min(6, isSpanish
//         ? 'La contraseña debe tener al menos 6 caracteres'
//         : 'The password must be at least 6 characters long'
//       )
//       .regex(/[0-9]/, isSpanish
//         ? 'Debe tener un número'
//         : 'It must contain a number'
//       ),
//   });

//   // 📄 Infers the form data type from the schema
//   type LoginFormData = z.infer<typeof loginSchema>;

//   // 📝 React Hook Form setup with Zod schema resolver
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   // 🔁 Handles form submission
//   const onSubmit = async (data: LoginFormData) => {
//     setError(null); // Reset previous error
//     try {
//       const { data: response, error: loginError } = await login(data);

//       if (loginError) throw new Error('Login failed');

//       // ✅ Redirect to dashboard if login is successful
//       if (response) router.push('/dashboard');
//     } catch (err) {
//       console.warn(err);
//       setError(isSpanish
//         ? 'Credenciales inválidas. Intenta de nuevo.'
//         : 'Invalid credentials. Please try again.'
//       );
//     }
//   };

//   // 🧩 Renders reusable input fields
//   const renderInput = (
//     id: keyof LoginFormData,
//     label: string,
//     type: string = 'text',
//     placeholder?: string
//   ) => (
//     <>
//       <label htmlFor={id} className={style['login__label']}>
//         {label}:
//         <input
//           id={id}
//           type={type}
//           placeholder={placeholder || label}
//           {...register(id)}
//           disabled={isSubmitting}
//           className={errors[id] ? style['login__input--error'] : ''}
//           aria-invalid={!!errors[id]}
//           aria-describedby={`${id}-error`}
//         />
//       </label>

//       {errors[id] && (
//         <p id={`${id}-error`} className={style['login__input--message-error']}>
//           {errors[id]?.message}
//         </p>
//       )}
//     </>
//   );

//   return (
//     <MainLayout isAdmin={false} language={isSpanish ? 'es' : 'en'}>
//       <section className={style['login__container']}>
//         <form onSubmit={handleSubmit(onSubmit)} className={style['login__form']}>
//           <fieldset>
//             <legend className={style['login__title']}>
//               {isSpanish ? 'Iniciar sesión' : 'Login'}
//             </legend>

//             {/* 🔴 Global error message */}
//             {error && (
//               <div
//                 className={style['login__error-message']}
//                 aria-live="polite"
//                 role="alert"
//               >
//                 {error}
//               </div>
//             )}

//             {/* 🧾 Form fields */}
//             {renderInput('username', isSpanish ? 'Usuario' : 'Username')}
//             {renderInput('password', isSpanish ? 'Contraseña' : 'Password', 'password')}

//             {/* 🚪 Submit button */}
//             <button type="submit" disabled={isSubmitting}>
//               {isSpanish
//                 ? isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'
//                 : isSubmitting ? 'Logging in...' : 'Login'}
//             </button>
//           </fieldset>
//         </form>
//       </section>
//     </MainLayout>
//   );
// };

// export default LoginPage;
