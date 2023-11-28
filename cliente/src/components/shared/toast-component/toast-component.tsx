import { useEffect, useState } from 'react';
import styles from './toast.module.css'
import { ToastProps } from './types';

const Toast = ({ title, message }: ToastProps) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;
  
      const interval = setInterval(() => {
        if (progress < 100) {
          setProgress((prevProgress) => prevProgress + 1);
        }
      }, 30);
  
      timer = setTimeout(() => {
        clearInterval(interval);
        // Aquí puedes agregar alguna lógica para cerrar el toast, por ejemplo, cambiando el estado para dejar de mostrarlo
      }, 3000);
  
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }, [progress]);

    return (
        <div aria-live="polite" aria-atomic="true" className="d-flex justify-content-center align-items-center w-100">
            <div className="toast-container p-3" id="toastPlacement">
                <div className="toast">
                    <div className="toast-header">
                        <strong className="me-auto">{title}</strong>
                        {/* <small>11 mins ago</small> */}
                    </div>
                    <div className="toast-body">
                        {message}
                    </div>
                </div>
            </div>
            <div className={`progress ${styles.progressHeight}`}>
                <div className={`progress-bar ${styles.progressWidth}`} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
        </div>
    )
};

export default Toast;