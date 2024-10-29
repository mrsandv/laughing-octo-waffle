'use client';
import { signInAction } from 'app/api';
import { Loader } from 'components';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import type { TCredentials } from 'types';
import Cookies from 'universal-cookie';
import styles from './login.module.css';

const cookies = new Cookies();

const Login = () => {
  const [form, setForm] = useState<TCredentials>({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, success, message } = await signInAction(form);
    if (success) {
      cookies.set('token', data.access, {
        path: '/',
        maxAge: 60 * 25,
      });
      // To force user to refresh the token, this cookie expires on 25 minutes,
      // the middleware check in every request if still present, if not return to login and close the session
      setIsLoading(false);
      router.push('/auth');
    } else {
      setIsLoading(false);
      setErrors(data.errors);
      toast.error(message);
    }
  }

  const handleShowPass = () => setShowPassword(!showPassword);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src="/logo.webp" alt="Parrot logo" className={styles.logo} />
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.inputText}
            onChange={(e) => {
              setForm({ ...form, username: e.target.value });
            }}
            type="text"
            name="user"
            placeholder="Usuario"
            required
          />
          <div className={styles.passWrapp}>
            <input
              className={styles.input}
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
              name="password"
              placeholder="Contraseña"
              required
            />
            <button onClick={handleShowPass} type="button" className={styles.passCtrl}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <button disabled={isLoading} className={styles.btn} type="submit">
            {isLoading ? <Loader label="Cargando..." /> : 'LOGIN'}
          </button>
          {errors.map((err: { code: string; message: string }) => (
            <p key={err.code} className={styles.err}>
              {err.message}
            </p>
          ))}
        </form>
      </div>
      <div className={styles.cover} />
    </div>
  );
};

export default Login;
