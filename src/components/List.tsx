import { ReactNode } from 'react';
import styles from './List.module.scss';

interface ListProps {
  children: ReactNode;
}

export default function List({ children }: ListProps) {
  
  return <ul className={styles['list']}>
    {children}
    {/* TODO ADD LINK HERE WITH PROPERTIES */}
  </ul>
}