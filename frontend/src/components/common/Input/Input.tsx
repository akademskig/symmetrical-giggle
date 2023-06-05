import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./Input.module.scss";
import { InputHTMLAttributes } from "react";
import { FaCalendarDay } from "react-icons/fa";

type InputProps = {
  label: string;
  error?: FieldError;
  registerFields: UseFormRegisterReturn;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  label,
  registerFields,
  type,
  error,
  ...inputProps
}: InputProps) => {
  return (
    <div className={styles.root}>
      <label>{label}</label>
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          {...registerFields}
          {...inputProps}
          type={type}
        />
        {type === "date" && <FaCalendarDay className={styles.calendarIcon} />}
      </div>
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
};
export default Input;
