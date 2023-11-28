import { useEffect, useState } from "react";
import { TypeCarrera } from './types';
import  url_Api from '../../services/carrer.services';
import Spinner from "../shared/spinner-component/spinner-component";
function Carrera() {
  const [carreras, setCarreras] = useState<TypeCarrera[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url_Api.getCarrer)
      .then(response => response.json())
      .then(data => { 
        setCarreras(data)
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
   
  return (
      <div className="container">
        <Spinner showSpinner={loading} />
        <h2 className="text-center pb-4">Listado de carreras</h2>
        <a href="./carrera-form" role="button" className="btn btn-info mb-1"><i className="fas fa-plus-circle"></i> Crear nueva carrera</a>
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
              {carreras.map(carrera => (
                <tr key={carrera.id}>
                  <td scope="col">{carrera.carrera}</td>
                  <td scope="col">{carrera.resolucion}</td>
                  <td scope="col">
                    {carrera.pdf ? (
                      <span className="badge badge-warning">
                        <a href={`/storage/${carrera.pdf}`} target="_blank">
                          PDF
                          {/* {carrera.pdf.substr(carrera.pdf.lastIndexOf('/') + 1, 25)} */}
                        </a>
                      </span>
                    ) : (
                      // Agregar un botón o enlace para cargar un PDF, si es necesario
                      <span className="badge badge-warning">
                        <button>Cargar PDF</button>
                      </span>
                    )}
                  </td>
                  <td scope="col">
                    <button type="button" className="btn btn-danger mr-1">
                      <i className="fas fa-trash-alt text-light"></i>
                    </button>
                    <a href={`/carrera/edit/${carrera.id}`} className="btn btn-dark mr-1">
                      <i className="far fa-edit text-light"></i>
                    </a>
                    <a href={`/carrera/show/${carrera.id}`} className="btn btn-view mr1">
                      <i className="fas fa-eye text-light"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}
  
export default Carrera