import { useState, useEffect, ReactNode } from 'react';
import styles from './Modal.module.scss';

export interface ModalI {
  showModal: boolean,
  onModalClosed: () => void,
  children: ReactNode,
}

export default function Modal({ 
  showModal, 
  onModalClosed, 
  children 
}:ModalI) {
  const [show, setShow] = useState<boolean>(showModal);

  useEffect(() => {
    setShow(showModal);
  },[showModal])

  const onOverlayClicked = () => {
    setShow(false);
    onModalClosed();
  }

  return (
    <>
      {show && (
        <>
          <div onClick={onOverlayClicked} className={styles['overlay']}></div>
          <div className={styles['modal']}>
            {children}
          </div>
        </>
      )}
    </>
  );
}
