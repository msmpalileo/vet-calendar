
type ModalPropsType = {
  children: React.ReactNode;
  isActive: boolean;
  setIsActive?: (value: boolean) => void;
  modalClassName?: string;
}

//Styles
import styles from '@/styles/components.module.scss';

const Modal = (props: ModalPropsType) => {
  const { children, isActive, setIsActive, modalClassName } = props;

  return (
    <div className={`${styles.modal} ${modalClassName} transition-all duration-200 ease-linear`} style={{
      opacity: isActive ? 100 : 0,
      zIndex: isActive ? 999 : -1,
      maxWidth: '800px',
    }}>
      <div className={styles.modalBackground} />
      <div className={styles.modalBody}>
        {children}
      </div>
    </div>
  )
}

export default Modal;