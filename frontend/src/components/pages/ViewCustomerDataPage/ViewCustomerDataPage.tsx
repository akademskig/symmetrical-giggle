import styles from './ViewCustomerDataPage.module.scss';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import customerFormFields from '../../forms/CustomerForm/customerFormFields';
import PriceTable from '../SelectCoveragesPage/PriceTable/PriceTable';
import useCustomers from '../../hooks/useCustomers';
import { messages } from './viewCustomerDataPage.messages';

const headerFieldsToOmit = ['cart', '__typename', '_id', 'priceMatch'];

const ViewCustomerDataPage = () => {
  const { customers } = useCustomers();
  const { locale, formatMessage } = useIntl();
  const headerItems = useMemo(() => {
    return Object.keys(customers[0] || {})
      .filter((item) => !headerFieldsToOmit.includes(item))
      .map((item) => customerFormFields.find((cff) => cff.id === item))
      .map((item) =>
        item?.required
          ? item?.label?.substring(0, item?.label.length - 1)
          : item?.label
      );
  }, [customers]);

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{formatMessage(messages.title)}</h2>
      <div className={styles.list}>
        {(customers || []).map((c, i) => (
          <div className={styles.customer}>
            <table className={styles.table}>
              <thead>
                {headerItems.map((head, i) => (
                  <tr>
                    <th>{head}</th>
                  </tr>
                ))}
              </thead>
              <tbody>
                <tr className={styles.customerData}>
                  <td>{c.name}</td>
                </tr>
                <td>{c.city}</td>
                <tr className={styles.customerData}>
                  <td>
                    {new Date(Number(c.birthDate)).toLocaleDateString(locale)}
                  </td>
                </tr>
                <tr className={styles.customerData}>
                  <td>{c.vehiclePower}</td>
                </tr>
                <tr>
                  <td>{c.voucher}</td>
                </tr>
              </tbody>
            </table>
            <PriceTable customer={c} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCustomerDataPage;
