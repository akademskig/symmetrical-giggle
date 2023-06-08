import ClientForm from '../../forms/ClientForm/ClientForm';
import ClientInsuranceLayout from '../../layouts/ClientInsuranceLayout/ClientInsuranceLayout';
import styles from './ClientInsurancePage.module.scss';

const ClientInsurancePage = () => {
  return (
    <ClientInsuranceLayout>
      <div className={styles.root}>
        <ClientForm />
      </div>
    </ClientInsuranceLayout>
  );
};
export default ClientInsurancePage;
