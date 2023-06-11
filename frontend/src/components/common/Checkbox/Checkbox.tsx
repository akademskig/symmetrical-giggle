import { ChangeHandler } from 'react-hook-form';
import styles from './Checkbox.module.scss';
import { InputHTMLAttributes } from 'react';

type InputType = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  checked: boolean;
  onToggle?: ChangeHandler;
};

const Checkbox = ({ label, checked, onToggle, name, disabled }: InputType) => {
  return (
    <div className={styles.root}>
      <label className={styles.control}>
        <input
          type="checkbox"
          className={styles.input}
          name={name}
          onChange={onToggle}
          checked={checked}
          disabled={disabled}
        />
        <span className={styles.label}>{label}</span>
      </label>
    </div>
  );
};
export default Checkbox;
