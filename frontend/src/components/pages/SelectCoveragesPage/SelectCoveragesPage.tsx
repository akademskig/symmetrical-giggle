import CustomerForm from '../../forms/CustomerForm/CustomerForm';
import SelectCoveragesLayout from '../../layouts/SelectCoveragesLayout/SelectCoveragesLayout';
import styles from './SelectCoveragesPage.module.scss';
import PriceTable from './PriceTable/PriceTable';

const SelectCoveragesPage = () => {
  return (
    <SelectCoveragesLayout>
      <div className={styles.root}>
        <CustomerForm />
        <PriceTable />
      </div>
    </SelectCoveragesLayout>
  );
};
export default SelectCoveragesPage;
