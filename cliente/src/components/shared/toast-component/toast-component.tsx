import styles from './toast.module.css';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';
import { ToastProps } from './types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const _Toast = ({ title, type, message, url, }: ToastProps) => {
  const [showToast, setShowToast] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!showToast && url) {
      navigate(url); // Navegar a la URL cuando el Toast se cierra
    }
  }, [showToast, url, navigate]);
  
  return (
    <div className={styles.toastStyle}>
      {showToast && (
        <ToastContainer position="top-end">
          <Toast onClose={() => setShowToast(false)} show={showToast} autohide delay={3000} bg= { type != undefined && type == 'err' ? 'danger' : 'success'}>
            <Toast.Header closeButton={false}>
              <span className="me-auto" ><i className="fa fa-check" aria-hidden="true"></i> {title} </span>
              <small>Ahora</small>
            </Toast.Header>
            <Toast.Body className='text-white'>{ message }</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </div>
  );
}
export default _Toast;