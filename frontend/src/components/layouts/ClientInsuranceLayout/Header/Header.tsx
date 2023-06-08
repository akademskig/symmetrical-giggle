import Checkbox from '../../../common/Checkbox/Checkbox';
import styles from './Header.module.scss';

import { useToggleProducts } from '../../../hooks/useToggleProducts';
import { useMemo } from 'react';

const Header = () => {
  const { selectedProducts, discounts, onToggle } = useToggleProducts();
  const selectedProductids = useMemo(
    () => selectedProducts.map((p) => p._id),
    [selectedProducts]
  );
  console.log(selectedProductids);
  return (
    <div className={styles.root}>
      {(discounts || []).map((pm, i) => (
        <div key={i} className={styles.item}>
          <Checkbox
            name={pm._id}
            value={selectedProductids.includes(pm._id)}
            label={pm.name}
            onToggle={onToggle}
          />
        </div>
      ))}
    </div>
  );
};

export default Header;
