import { useForm } from "react-hook-form";
import Checkbox from "../../../common/Checkbox/Checkbox";
import coverages from "./coverages";
import styles from "./Sidebar.module.scss";

const SideBar = () => {
  const { register } = useForm({
    defaultValues: coverages.reduce<Record<string, boolean>>((a, v) => {
      a[v.label] = v.defaultValue;
      return a;
    }, {}),
  });
  return (
    <div className={styles.root}>
      {coverages.map((c, i) => (
        <div key={i} className={styles.item}>
          <Checkbox label={c.label} registerFields={register(c.id)} />
        </div>
      ))}
    </div>
  );
};
export default SideBar;
