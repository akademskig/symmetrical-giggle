import { useSelector } from 'react-redux';
import {
  getCart,
  getCartCoverages,
  getCartDiscounts,
} from '../../../../redux/client';
import styles from './Prices.module.scss';
import { ProductType } from '../../../../types/product';

const Prices = () => {
  const cart = useSelector(getCart);
  const coverages = useSelector(getCartCoverages).sort((a, b) =>
    a.type === ProductType.BASE_COVERAGE ? -1 : 1
  );
  const discounts = useSelector(getCartDiscounts);
  return (
    <div className={styles.root}>
      <table>
        <tr>
          <th>
            <span>Item</span>
          </th>
          <th>Price</th>
        </tr>
        <th>Coverages</th>
        {coverages.map((c) => (
          <tr>
            <td>
              <span>{c.name}</span>
            </td>
            <td>
              <span>{c.price}</span>
            </td>
          </tr>
        ))}
        <th>Discounts</th>
        {discounts.map((c) => (
          <tr>
            <td>
              <span>{c.name}</span>
            </td>
            <td>
              <span>-{c.price}</span>
            </td>
          </tr>
        ))}
        <th>
          <span>Total Price</span>
        </th>
        <tr>
          <span>{cart?.totalPrice}</span>
        </tr>
        <th>
          <span>Base Price</span>
        </th>
        <tr>
          <span>{cart?.basePrice}</span>
        </tr>
      </table>
    </div>
  );
};

export default Prices;
