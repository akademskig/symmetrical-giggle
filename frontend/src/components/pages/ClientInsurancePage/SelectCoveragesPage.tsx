import ClientForm from '../../forms/ClientForm/CustomerForm';
import SelectCoveragesLayout from '../../layouts/ClientInsuranceLayout/SelectCoveragesLayout';
import styles from './SelectCoveragesPage.module.scss';
import PriceTable from './PriceTable/PriceTable';

const SelectCoveragesPage = () => {
  return (
    <SelectCoveragesLayout>
      <div className={styles.root}>
        <ClientForm />
        <PriceTable />
      </div>
    </SelectCoveragesLayout>
  );
};
export default SelectCoveragesPage;
