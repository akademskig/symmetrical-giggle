import { ChangeHandler } from 'react-hook-form';
import styles from './Checkbox.module.scss';

type InputType = {
  label: string;
  name: string;
  value: boolean;
  onToggle?: ChangeHandler;
};

const Checkbox = ({ label, value, onToggle, name }: InputType) => {
  return (
    <div className={styles.root}>
      <label className={styles.control}>
        <input
          type="checkbox"
          className={styles.input}
          name={name}
          onChange={onToggle}
          checked={value}
        />
        <span className={styles.label}>{label}</span>
      </label>
    </div>
  );
};
export default Checkbox;
