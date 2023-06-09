import ClientForm from '../../forms/ClientForm/ClientForm';
import ClientInsuranceLayout from '../../layouts/ClientInsuranceLayout/ClientInsuranceLayout';
import styles from './ClientInsurancePage.module.scss';
import Prices from './Prices/Prices';

const ClientInsurancePage = () => {
  return (
    <ClientInsuranceLayout>
      <div className={styles.root}>
        <ClientForm />
        <Prices />
      </div>
    </ClientInsuranceLayout>
  );
};
export default ClientInsurancePage;
