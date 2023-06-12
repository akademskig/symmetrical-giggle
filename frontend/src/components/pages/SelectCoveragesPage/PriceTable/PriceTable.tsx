import { useSelector } from 'react-redux';
import {
  getCart,
  getCartBaseCoverage,
  getCartCoverages,
  getCartDiscounts,
  getVoucher,
} from '../../../../redux/customer';
import styles from './PriceTable.module.scss';
import { ProductType } from '../../../../types/product';
import { useIntl } from 'react-intl';
import { messages } from './priceTable.messages';

const Prices = () => {
  const { formatMessage, formatNumber } = useIntl();
  const cart = useSelector(getCart);
  const voucher = useSelector(getVoucher);
  const coverages = useSelector(getCartCoverages).sort((a, b) =>
    a.type === ProductType.BASE_COVERAGE ? -1 : 1
  );
  const baseCoverage = useSelector(getCartBaseCoverage);
  const discounts = useSelector(getCartDiscounts);
  return (
    <>
      {cart ? (
        <div className={styles.root}>
          <table>
            <thead>
              <tr>
                <th className={styles.header}>
                  <span>{formatMessage(messages.item)}</span>
                </th>
                <th className={styles.header}>
                  {formatMessage(messages.price)}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.bolded}>
                  <span>{baseCoverage?.name}</span>
                </td>
                <td>
                  <span>
                    {formatNumber(baseCoverage?.price || 0, {
                      currency: 'EUR',
                      style: 'currency',
                    })}
                  </span>
                </td>
              </tr>
              {coverages.length > 0 && (
                <tr>
                  <td className={styles.bolded}>
                    {formatMessage(messages.additionalCoverages)}
                  </td>
                </tr>
              )}
              {coverages.map((c, i) => (
                <tr key={i}>
                  <td>
                    <span>{c.name}</span>
                  </td>
                  <td>
                    <span>
                      {formatNumber(c.price, {
                        currency: 'EUR',
                        style: 'currency',
                      })}
                    </span>
                  </td>
                </tr>
              ))}
              {discounts.length > 0 && (
                <tr>
                  <td className={styles.bolded}>
                    {formatMessage(messages.discounts)}
                  </td>
                </tr>
              )}
              {discounts.map((c, i) => (
                <tr key={i}>
                  <td>
                    <span>{c.name}</span>
                  </td>
                  <td>
                    <span>
                      -
                      {formatNumber(c.price, {
                        currency: 'EUR',
                        style: 'currency',
                      })}
                    </span>
                  </td>
                </tr>
              ))}
              {!!voucher && (
                <tr>
                  <td className={styles.bolded}>
                    <span>{formatMessage(messages.voucher)}</span>
                  </td>
                  <td>
                    <span>
                      {formatNumber(voucher, {
                        currency: 'EUR',
                        style: 'currency',
                      })}
                    </span>
                  </td>
                </tr>
              )}

              <tr>
                <td className={styles.bolded}>
                  <span>{formatMessage(messages.totalPrice)}</span>
                </td>
                <td>
                  <span>
                    {formatNumber(cart?.totalPrice, {
                      currency: 'EUR',
                      style: 'currency',
                    })}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

export default Prices;
