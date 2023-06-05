import { useForm } from "react-hook-form";
import Checkbox from "../../../common/Checkbox/Checkbox";
import styles from "./Header.module.scss";
import priceModifiers from "./priceModifiers";

const Header = () => {
  const { register, watch } = useForm({
    defaultValues: priceModifiers.reduce<Record<string, boolean>>((a, v) => {
      a[v.label] = v.defaultValue;
      return a;
    }, {}),
  });
  const fields = watch();
  return (
    <div className={styles.root}>
      {priceModifiers.map((pm, i) => (
        <div key={i} className={styles.item}>
          <Checkbox registerFields={register(pm.id)} label={pm.label} />
        </div>
      ))}
    </div>
  );
};

export default Header;
