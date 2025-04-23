import { ReactNode } from 'react';
import styles from './List.module.scss';

interface ListProps {
  children: ReactNode;
  variant?: string;
}

export default function List({ children, variant }: ListProps) {
  
  return <ul className={styles['list']} data-variant={variant}>
    {children}
  </ul>
}