import { useState } from 'react';
import  url_Api from '../../../services/carrer.services';
import Spinner from '../../shared/spinner-component/spinner-component';
import { TypeCarreraForm } from './types';
import { useForm } from 'react-hook-form';

function CarreraForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeCarreraForm>();

  const onSubmit = (data: TypeCarreraForm) => {
    setLoading(true);
    fetch(url_Api.postCarrer, {
      method: data.id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json', // Configurar el tipo de contenido
      },
      body:  JSON.stringify({ 
        id: 8,
        carrera: data.carrera, 
        resolucion: data.resolucion, 
        pdf:  "pdf", 
        creado: "2023-11-27"
      }),
    })
    .then(response => {
      console.log(response)
      setLoading(false);
    })
    .catch(error => console.error('Error submitting form:', error));
  };
  return (
    <div className='container'>
      <Spinner showSpinner={loading} />
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='card'>
            <div className='card-header'>Ingrese la carrera nueva</div>
            <div className='card-body'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="carrera" className="form-label">Nombre de la carrera</label>
                  <input type="text" className="form-control" id="carrera" placeholder="Ingenieria en Sistemas" {...register('carrera', { required: true })}/>
                  {errors.carrera && <span>This field is required</span>}
                </div>
                <div className="mb-3">
                  <label htmlFor="resolucion" className="form-label">Resolución</label>
                  <input type="text" className="form-control" id="resolucion" placeholder="T1-04"  {...register('resolucion', { required: true })}/>
                  {errors.resolucion && <span>This field is required</span>}
                </div>
                <div className="mb-3">
                  <label htmlFor="pdf" className="form-label">Subir PDF</label>
                  <input type="file" className="form-control" id="pdf"  {...register('pdf')}/>
                  {errors.pdf && <span>This field is required</span>}
                </div>
                <button type="submit" className="btn btn-primary btn-block">Guardar datos</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarreraForm;
