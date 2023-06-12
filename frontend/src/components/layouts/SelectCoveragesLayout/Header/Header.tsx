import Checkbox from '../../../common/Checkbox/Checkbox';
import styles from './Header.module.scss';

import { useToggleProducts } from '../../../hooks/useToggleProducts';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import { messages } from './header.messages';

const Header = () => {
  const { cartProducts, discounts, onToggle } = useToggleProducts();
  const selectedProductIds = useMemo(
    () => cartProducts.map((p) => p._id),
    [cartProducts]
  );
  const { formatMessage } = useIntl();
  return (
    <div className={styles.root}>
      <div className={styles.items}>
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
      <Link to="view-customer-data">
        <div className={styles.link}>
          <span>{formatMessage(messages.viewCustomerData)}</span>
          <FaArrowAltCircleRight className={styles.rightArrow} />
        </div>
      </Link>
    </div>
  );
};

export default Header;
