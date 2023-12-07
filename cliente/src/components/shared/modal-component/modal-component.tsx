import { Modal } from "react-bootstrap";

const _Modal = (props:any) => {
    const { title, subtitle, message, data, verEliminarBotton, EliminarRegistro, ...modalProps } = props;

    const handleEliminar = async () => {
        if (EliminarRegistro) {
            EliminarRegistro();
        }
    };

    return (
        <Modal {...modalProps}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={props.onHide}>
            <Modal.Title id="contained-modal-title-vcenter">
                { title }
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h4>{ subtitle }</h4>
            <ul>
                {data.map((item:any, index:number) => (
                <li key={index}>
                <strong>{item.key}:</strong> {item.value}
                </li>
            ))}

            </ul>
            <p>
                { message }
            </p>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onHide} className="btn btn-secondary">Cerrar</button>
                {verEliminarBotton && (
                 <button onClick={handleEliminar}  className="btn btn-danger">Eliminar</button>
                )}              
            </Modal.Footer>
        </Modal>
    );
}
export default _Modal;