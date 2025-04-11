import styles from "./FormMessage.module.scss";

export type MessageVariantType = 'success' | 'error';

export interface FormMessageI{
  message: string,
  variant?: MessageVariantType
}

export default function FormMessage({message, variant}:FormMessageI) {
  return <p className={styles['form-message']} data-variant={variant}>{message}</p>
}