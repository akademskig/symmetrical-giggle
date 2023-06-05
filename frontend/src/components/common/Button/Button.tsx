import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  useCallback,
} from "react";

import styles from "./Button.module.scss";


const Button = ({
  children,
  onClick,
  ...rest
}:ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      onClick && onClick(e);
    },
    [onClick]
  );
  return (
    <button {...rest} className={styles.root} onClick={handleClick}>
      {children}
    </button>
  );
};
export default Button;
