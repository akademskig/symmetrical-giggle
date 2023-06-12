import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import styles from './CustomerForm.module.scss';
import Input from '../../common/Input/Input';
import customerFormFields from './customerFormFields';
import Button from '../../common/Button/Button';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { SUBMIT_CUSTOMER_DATA } from '../../../apollo/customer';
import { setCustomer } from '../../../redux/customer';
import { useAvalableProducts } from '../../hooks/useAvailableProducts';
import { useIntl } from 'react-intl';
import { messages } from './customerForm.messages';
import useCustomers from '../../hooks/useCustomers';

const CustomerForm = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: customerFormFields.reduce<Record<string, string | number>>(
      (a, v) => {
        a[v.id] = v.defaultValue;
        return a;
      },
      {}
    ),
  });

  const { refetch } = useAvalableProducts();
  const { refetchCustomers } = useCustomers();
  const [submitCustomerData] = useMutation(SUBMIT_CUSTOMER_DATA);

  const onSubmit = useCallback(
    async (values: any) => {
      const { data: customerData } = await submitCustomerData({
        variables: { input: values },
      });
      dispatch(setCustomer(customerData.customer));
      await refetch({ input: { customerId: customerData.customer._id } });
      refetchCustomers();
    },
    [dispatch, refetch, refetchCustomers, submitCustomerData]
  );

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>{formatMessage(messages.formTitle)}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formFields}>
          {customerFormFields.map((f, i) => (
            <Input
              key={i}
              registerFields={register(f.id, {
                valueAsNumber: f.type === 'number',
                required: {
                  message: formatMessage(messages.errorRequired, {
                    label: f.label.substring(0, f.label.length - 1),
                  }),
                  value: f.required,
                },
              })}
              label={f.label}
              type={f.type}
              error={errors[f.id]}
            />
          ))}
        </div>
        <Button type="submit">{formatMessage(messages.save)}</Button>
      </form>
    </div>
  );
};

export default CustomerForm;
