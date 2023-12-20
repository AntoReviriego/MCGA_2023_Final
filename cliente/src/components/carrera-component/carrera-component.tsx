import { useEffect, useState } from "react";
import { TypeCarrera } from './types';
import  url_Api from '../../services/api.services';
import Spinner from "../shared/spinner-component/spinner-component";
import { Link } from "react-router-dom";
import _Modal from "../shared/modal-component/modal-component";
import _Toast from "../shared/toast-component/toast-component";
import moment from "moment";
import { descargaArchivo } from "../../utility/manejoArchivo";
function Carrera() {
  const [carreras, setCarreras] = useState<TypeCarrera[]>([]);
  const [loading, setLoading] = useState(true); // spinner
  const [guardadoExitoso, setGuardadoExitoso] = useState(false); // toast
  const [modalShow, setModalShow] = useState(false); // modal
  const [modalData, setModalData] = useState({
    title: "",
    subtitle: "",
    verEliminarBotton: false,
    data: [],
    id: "", 
    type:""
  });
  const formatFecha = (fecha: string) => {
    const fechaFormateada = moment(fecha).format("DD/MM/YYYY"); // Formato de fecha deseado
    return fechaFormateada;
  };
  const convercionObjeto = (carrera : TypeCarrera, EliminarBotton:boolean) => {
    const excludedProperties = ["_id", "__v"];
    const filteredCarrera = Object.fromEntries(
      Object.entries(carrera).filter(([key]) => !excludedProperties.includes(key))
    );
    const carreraData = Object.entries(filteredCarrera);
    let label = ['Carrera', 'Resolución', 'Pdf', 'Fecha Creación', 'Última Actualización'];
    const formattedData:any = carreraData.map(([key, value], i) => ({
      key: label[i], 
      value: key === "creado" || key === "actualizado" ? formatFecha(value as string) : value, 
    }));
    setModalData({
      title: carrera.carrera, // Usar un campo relevante de la carrera para el título
      id: carrera._id,
      subtitle: "Información de la carrera",
      data: formattedData, // Pasar los datos clave-valor al modal
      verEliminarBotton: EliminarBotton, 
      type: ""
    });
    setModalShow(true);
  }
  const cargarCarreras = async () => {
   await  fetch(url_Api.apiCarrera)
    .then(response => response.json())
    .then(data => { 
      setCarreras(data);
      setLoading(false);
    })
    .catch(error => console.error('Error de datos. Respuesta:', error));
  }
  useEffect(() => {
    cargarCarreras();
  }, []);  
  const handleDelete = async () => {
    try {
      setGuardadoExitoso(false);
      setModalShow(false);
      setLoading(true);
      await fetch(`${url_Api.apiCarrera}/${modalData.id}`, {
        method: 'DELETE',
      }).then(data => {
        if(data.ok){
          setLoading(false);
          setGuardadoExitoso(true);
          cargarCarreras();
        }
        else{
          throw new Error(`Ocurrio un error. Respuesta: ${data}`);
        }
      });
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };
  const handlePDFDownload = async (pdf:string) => {
    setLoading(true);
    try {
      await descargaArchivo(pdf)
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Spinner showSpinner={loading} />
      {guardadoExitoso && (
        <_Toast 
          title="Éxito"
          type=""
          message={`¡Los datos de la carrera ${modalData.title} se eliminaron correctamente!`}
          url = "/carrera"
        />
      )}
      <_Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        EliminarRegistro={handleDelete}
        {...modalData}
      />
      <h2 className="text-center pb-4">Listado de carreras</h2>
      <Link to={'/carrera-form'} className="btn btn-info mb-1">
        <span className="text-white"><i className="fas fa-plus-circle"></i> Crear nueva carrera</span>
      </Link>
      <div className="table-responsive">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">Nombre de la carrera</th>
              <th scope="col">Resolución</th>
              <th scope="col">Resolución PDF</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {carreras.map((carrera, index) => (
              <tr key={index}>
                <td scope="col">{carrera.carrera}</td>
                <td scope="col">{carrera.resolucion}</td>
                <td scope="col">
                {carrera.pdf == null ? (
                  <span className="badge bg-warning">Cargar PDF</span>
                ) : ( 
                    <button className="badge bg-success"
                      onClick={() => handlePDFDownload( (carrera.pdf).split('\\').pop() as string )}
                    >
                      { (carrera.pdf).split('\\').pop() as string }
                    </button>
                )}
                </td>
                <td scope="col">
                  <button className="btn btn-view me-1" onClick={() => {
                      convercionObjeto(carrera, false);
                      setModalShow(true);
                    }}> 
                    <span className="text-white"><i className="fas fa-eye text-light"></i></span>
                  </button>
                  <Link to={`/carrera-form/${carrera._id}`} className="btn btn-dark me-1">
                    <span className="text-white"><i className="far fa-edit text-light"></i></span>
                  </Link>
                  <button className="btn btn-danger me-1" onClick={() => {
                      convercionObjeto(carrera, true);
                      setModalShow(true);
                    }}>
                    <span className="text-white"><i className="fas fa-trash-alt text-light"></i></span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Carrera;