import { useMemo } from 'react';
import Checkbox from '../../../common/Checkbox/Checkbox';
import { useToggleProducts } from '../../../hooks/useToggleProducts';
import styles from './Sidebar.module.scss';

const SideBar = () => {
  const { selectedProducts, coverages, onToggle } = useToggleProducts();

  const selectedProductids = useMemo(
    () => selectedProducts.map((p) => p._id),
    [selectedProducts]
  );

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
