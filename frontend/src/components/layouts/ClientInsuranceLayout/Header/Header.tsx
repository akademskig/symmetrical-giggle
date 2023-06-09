import Checkbox from '../../../common/Checkbox/Checkbox';
import styles from './Header.module.scss';

import { useToggleProducts } from '../../../hooks/useToggleProducts';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCart } from '../../../../redux/client';

const Header = () => {
  const { cartProducts, discounts, onToggle } = useToggleProducts();
  const selectedProductids = useMemo(
    () => cartProducts.map((p) => p._id),
    [cartProducts]
  );
  const cart = useSelector(getCart);
  console.log(cart, 'cp');
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
