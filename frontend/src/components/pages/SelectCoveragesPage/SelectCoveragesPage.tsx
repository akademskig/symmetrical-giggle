import CustomerForm from '../../forms/CustomerForm/CustomerForm';
import SelectCoveragesLayout from '../../layouts/SelectCoveragesLayout/SelectCoveragesLayout';
import styles from './SelectCoveragesPage.module.scss';
import PriceTable from './PriceTable/PriceTable';
import { useSelector } from 'react-redux';
import { getCustomer } from '../../../redux/customer';

const SelectCoveragesPage = () => {
  const customer = useSelector(getCustomer);

  return (
    <SelectCoveragesLayout>
      <div className={styles.root}>
        <CustomerForm />
        <div className={styles.priceTable}>
          <PriceTable customer={customer} />
        </div>
      </div>
    </SelectCoveragesLayout>
  );
};
export default SelectCoveragesPage;
