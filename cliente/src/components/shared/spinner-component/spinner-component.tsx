import styles from './spinner.module.css';
const Spinner = ({ showSpinner }: { showSpinner: boolean }) => {
    if (!showSpinner) {
        return null; // Si showSpinner es falso, no muestra nada
    }
    
    return (
        <div className={styles.spinnerOverlay}>
            <div className="text-center">
                <div className="spinner-border spinner-border-lg" role="status"></div>
            </div>
        </div>
    )
};
export default Spinner;