import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./Checkbox.module.scss";

type InputType = {
  label: string;
  registerFields: UseFormRegisterReturn;
};

const Checkbox = ({ label, registerFields }: InputType) => {
  return (
    <div className={styles.root}>
      <label className={styles.control}>
        <input type="checkbox" className={styles.input} {...registerFields} />
        <span className={styles.label}>{label}</span>
      </label>
    </div>
  );
};
export default Checkbox;
