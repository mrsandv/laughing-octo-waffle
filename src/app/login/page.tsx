'use client'
import { useState, type FormEvent } from 'react'
import styles from './login.module.css'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Loader } from 'components';
import { signInAction } from 'app/api';
import type { TCredentials } from 'types';

const cookies = new Cookies();

export default function Login() {
  const [form, setForm] = useState<TCredentials>({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    const { data, success, message } = await signInAction(form)
    if (success) {
      cookies.set('token', data.access, {
        path: '/',
        maxAge: 60 * 60 * 8,
      });
      cookies.set('refresh', data.refresh, {
        path: '/',
        maxAge: 60 * 60 * 8,
      });
      setIsLoading(false)
      router.push('/auth')
    } else {
      setIsLoading(false)
      setErrors(data.errors)
      toast.error(message)
    }
  }

  const handleShowPass = () => setShowPassword(!showPassword)

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src="/logo.webp" alt="Parrot logo" className={styles.logo} />
        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.inputText} onChange={(e) => {
            setForm({ ...form, username: e.target.value })
          }} type="text" name="user" placeholder="Usuario" required />
          <div className={styles.passWrapp}>
            <input className={styles.input} type={showPassword ? "text" : "password"} onChange={(e) => {
              setForm({ ...form, password: e.target.value })
            }} name="password" placeholder="Contraseña" required />
            <button onClick={handleShowPass} type='button' className={styles.passCtrl}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <button disabled={isLoading} className={styles.btn} type="submit">{isLoading ? <Loader label='Cargando...' /> : "LOGIN"}</button>
          {errors.map((err: { code: string, message: string }) => <p key={err.code} className={styles.err}>{err.message}</p>)}
        </form>
      </div>
      <div
        className={styles.cover}
      />
    </div>
  )
}