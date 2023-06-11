import { useSelector } from 'react-redux';
import {
  getCart,
  getCartBaseCoverage,
  getCartCoverages,
  getCartDiscounts,
  getVoucher,
} from '../../../../redux/client';
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
            <tr>
              <th className={styles.header}>
                <span>{formatMessage(messages.item)}</span>
              </th>
              <th className={styles.header}>{formatMessage(messages.price)}</th>
            </tr>
            <tr>
              <th>
                <span>{baseCoverage?.name}</span>
              </th>
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
              <th>{formatMessage(messages.additionalCoverages)}</th>
            )}
            {coverages.map((c) => (
              <tr>
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
              <th>{formatMessage(messages.discounts)}</th>
            )}
            {discounts.map((c) => (
              <tr>
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
                <th>
                  <span>{formatMessage(messages.voucher)}</span>
                </th>
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
              <th>
                <span>{formatMessage(messages.totalPrice)}</span>
              </th>
              <td>
                <span>
                  {formatNumber(cart?.totalPrice, {
                    currency: 'EUR',
                    style: 'currency',
                  })}
                </span>
              </td>
            </tr>
          </table>
        </div>
      ) : null}
    </>
  );
};

export default Prices;
