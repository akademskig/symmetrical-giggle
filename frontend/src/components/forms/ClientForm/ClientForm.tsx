import { useCallback } from "react";
import { useForm } from "react-hook-form";
import styles from "./ClientForm.module.scss";
import Input from "../../common/Input/Input";
import clientFormFields from "./clientFormFields";
import Button from "../../common/Button/Button";

const ClientForm = () => {
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

  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Client data</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formFields}>
          {clientFormFields.map((f, i) => (
            <Input
              key={i}
              registerFields={register(f.id, {
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
