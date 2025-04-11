import { useState, forwardRef, ReactNode } from "react";
import Button from "./Button";
import styles from "./Form.module.scss";

export interface FormI {
  children: ReactNode,
  onFormSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  buttonText?: string,
}

const Form = forwardRef<HTMLFormElement, FormI>(({
    onFormSubmit, 
    children, 
    buttonText = "Submit" 
  }:FormI, ref) => {
  const [isSaving, setIsSaving] = useState(false);

  const afterSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    onFormSubmit(ev); 
    setIsSaving(false);
  };

  return (
    <form ref={ref} className={styles.form} onSubmit={afterSubmit}>
      <div>{children}</div>
      <div>
        <Button
          text={buttonText}
          type="submit"
          disabled={isSaving}
          variant='success'
          onClick={() => setIsSaving(true)}
        />
      </div>
    </form>
  );
});

Form.displayName = 'Form';

export default Form;
