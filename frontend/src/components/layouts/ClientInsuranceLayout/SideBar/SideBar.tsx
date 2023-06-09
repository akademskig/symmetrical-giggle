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
  console.log(coverages);
  return (
    <div className={styles.root}>
      {coverages.map((c, i) => (
        <div key={i} className={styles.item}>
          <Checkbox
            label={c.name}
            value={selectedProductids.includes(c._id)}
            name={c._id}
            onToggle={onToggle}
          />
        </div>
      ))}
    </div>
  );
};
export default SideBar;
