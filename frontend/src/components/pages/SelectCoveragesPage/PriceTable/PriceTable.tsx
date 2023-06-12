import styles from './PriceTable.module.scss';
import { ProductType } from '../../../../types/product';
import { useIntl } from 'react-intl';
import { messages } from './priceTable.messages';
import { useMemo } from 'react';
import { Customer } from '../../../../types/customer';

type Props = {
  customer: Customer;
};
const PriceTable = ({ customer }: Props) => {
  const { formatMessage, formatNumber } = useIntl();
  const cart = customer?.cart;
  const voucher = customer.voucher;
  const coverages = useMemo(
    () =>
      (customer.cart?.products || [])
        .filter(
          (p) =>
            p.type === ProductType.COVERAGE || p.type === ProductType.SURCHARGE
        )
        .sort((a, b) => (a.type === ProductType.BASE_COVERAGE ? -1 : 1)),
    [customer.cart?.products]
  );

  const discounts = useMemo(
    () =>
      (customer.cart?.products || []).filter(
        (p) => p.type === ProductType.DISCOUNT
      ),
    [customer.cart?.products]
  );

  const baseCoverage = useMemo(
    () =>
      (customer.cart?.products || []).find(
        (p) => p.type === ProductType.BASE_COVERAGE
      ),
    [customer.cart?.products]
  );
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

export default PriceTable;
