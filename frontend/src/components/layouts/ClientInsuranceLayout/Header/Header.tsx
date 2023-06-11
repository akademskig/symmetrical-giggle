import Checkbox from '../../../common/Checkbox/Checkbox';
import styles from './Header.module.scss';

import { useToggleProducts } from '../../../hooks/useToggleProducts';
import { useMemo } from 'react';

const Header = () => {
  const { cartProducts, discounts, onToggle } = useToggleProducts();
  const selectedProductIds = useMemo(
    () => cartProducts.map((p) => p._id),
    [cartProducts]
  );
  return (
    <div className={styles.root}>
      {(discounts || []).map((d, i) => (
        <div key={i} className={styles.item}>
          <Checkbox
            name={d._id}
            disabled={d.mandatory}
            checked={selectedProductIds.includes(d._id)}
            label={d.name}
            onToggle={onToggle}
          />
        </div>
      ))}
    </div>
  );
};

export default Header;
