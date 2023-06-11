import ClientForm from '../../forms/ClientForm/ClientForm';
import ClientInsuranceLayout from '../../layouts/ClientInsuranceLayout/ClientInsuranceLayout';
import styles from './ClientInsurancePage.module.scss';
import PriceTable from './PriceTable/PriceTable';

const ClientInsurancePage = () => {
  return (
    <ClientInsuranceLayout>
      <div className={styles.root}>
        <ClientForm />
        <PriceTable />
      </div>
    </ClientInsuranceLayout>
  );
};
export default ClientInsurancePage;
