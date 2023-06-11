import { useMemo } from 'react';
import Checkbox from '../../../common/Checkbox/Checkbox';
import { useToggleProducts } from '../../../hooks/useToggleProducts';
import styles from './Sidebar.module.scss';

const SideBar = () => {
  const { cartProducts, coverages, onToggle } = useToggleProducts();

  const selectedProductids = useMemo(
    () => cartProducts?.map((p) => p._id),
    [cartProducts]
  );
  return (
    <div className={styles.root}>
      {coverages.map((c, i) => (
        <div key={i} className={styles.item}>
          <Checkbox
            label={c.name}
            checked={selectedProductids.includes(c._id)}
            name={c._id}
            onToggle={onToggle}
            disabled={c.mandatory}
          />
        </div>
      ))}
    </div>
  );
};
export default SideBar;
