import { type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button, Flex } from 'antd';

import styles from './Modal.module.scss';

interface IModalProps {
   onClose: () => void;
   children: ReactNode;
}

const Modal: FC<IModalProps> = ({ onClose, children }) => {
   const modalRoot = document.getElementById('root');

   if (!modalRoot) {
      return null;
   }

   return createPortal( 
      <Flex onClick={onClose} className={styles.modalOverlay}>
         <Flex onClick={(e) => e.stopPropagation()} className={styles.modalContent}>
            <Button onClick={onClose} className={styles.modalClose}>x</Button>
            {children}
         </Flex>
      </Flex>, 
   modalRoot)
}

export default Modal;