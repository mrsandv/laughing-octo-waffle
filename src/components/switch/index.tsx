import styles from './switch.module.css'

interface TSwitch extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  restProps?: React.InputHTMLAttributes<HTMLInputElement>;
  checked?: boolean;
}

export default function Switch({ checked, label, ...restProps }: TSwitch) {
  return (
    <label className={styles.switch}>
      <input
        checked={checked}
        {...restProps} type="checkbox" className={styles.input} />
      <span className={styles.slider} />
    </label>)
}