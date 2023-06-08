import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ClientForm.module.scss';
import Input from '../../common/Input/Input';
import clientFormFields from './clientFormFields';
import Button from '../../common/Button/Button';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { SUBMIT_CLIENT_DATA } from '../../../apollo/client';
import { getClientId, setClient } from '../../../redux/client';
import { useSelector } from 'react-redux';
import { useAvalableProducts } from '../../hooks/useAvailableProducts';

const ClientForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: clientFormFields.reduce<Record<string, string | number>>(
      (a, v) => {
        a[v.id] = v.defaultValue;
        return a;
      },
      {}
    ),
  });

  const { refetch } = useAvalableProducts();
  const clientId = useSelector(getClientId);
  const [submitClientData, { error: errorClient }] =
    useMutation(SUBMIT_CLIENT_DATA);

  const onSubmit = useCallback(
    async (values: any) => {
      const { data: clientData } = await submitClientData({
        variables: { input: values },
      });
      dispatch(setClient(clientData.client));
      await refetch({ input: { clientId } });
    },
    [clientId, dispatch, refetch, submitClientData]
  );

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Client data</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formFields}>
          {clientFormFields.map((f, i) => (
            <Input
              key={i}
              registerFields={register(f.id, {
                valueAsNumber: f.type === 'number',
                required: {
                  message: `${f.label.substring(
                    0,
                    f.label.length - 1
                  )} is required!`,
                  value: f.required,
                },
              })}
              label={f.label}
              type={f.type}
              error={errors[f.id]}
            />
          ))}
        </div>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default ClientForm;
