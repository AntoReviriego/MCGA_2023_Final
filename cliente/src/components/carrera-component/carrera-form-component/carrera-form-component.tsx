import { useEffect, useState } from 'react';
import  url_Api from '../../../services/api.services';
import Spinner from '../../shared/spinner-component/spinner-component';
import { TypeCarreraForm } from './types';
import { useForm } from 'react-hook-form';
import _Toast from '../../shared/toast-component/toast-component';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { inputRequeridoValidacion, inputTextRequeridoValidacion } from '../../../utility/validaciones';

const CarreraForm = ({ carreraData }: { carreraData?: TypeCarreraForm }) =>  {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false); // spinner
  const [guardadoExitoso, setGuardadoExitoso] = useState(false); // toast
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit: validateForm,
    formState: { errors },
    setValue,
  } = useForm<TypeCarreraForm>();
  const navigate = useNavigate();

  const getCarreraId = async () => {
    await fetch(`${url_Api.apiCarrera}/${id}`)
    .then(data => {
      if (!data.ok) {
        throw new Error(`Ocurrio un error. Respuesta: ${data}`);
      }
      return data.json();
    })
    .then(data => {
      Object.keys(data).forEach(key => {
        setValue(key as keyof TypeCarreraForm, data[key as keyof TypeCarreraForm]);
      });
    })
    .catch(error => {
      console.error('Error de datos. Respuesta:', error);
    });
  }

  useEffect(() => {
    if(id !== undefined){
      getCarreraId()
    }
  }, [id, setValue]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setLoading(false);
    }
    setValidated(true);
    validateForm(onSubmit, (errors) => {
      setLoading(false);
      e.preventDefault();
      e.stopPropagation();
      console.error('Errores en el formulario:', errors);
    })();
  };

  const onSubmit = async (data:TypeCarreraForm) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('carrera', data.carrera);
      formData.append('resolucion', data.resolucion);
      if (data.pdf.length > 0) {
        formData.append('pdf', data.pdf[0]);
      }
      const response = await fetch(id ? `${url_Api.apiCarrera}/${id}` : url_Api.apiCarrera, {
        method: id ? 'PATCH' : 'POST',
        body: formData,
      });
      if (response.ok) {
        setLoading(false);
        setGuardadoExitoso(true);
        console.log(guardadoExitoso)
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setLoading(false);
    }
  };

  const handleVolver = () => {
    navigate('/carrera')
  }

  return (
    <>
      <Spinner showSpinner={loading} />
      {guardadoExitoso && (
        <_Toast 
          title="Éxito"
          type=""
          message={`¡Los datos de la carrera se guardaron correctamente!`}
          url = "/carrera"
        />
      )}
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <Card>
              <Card.Header>Ingresar los datos correspondientes </Card.Header>
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="carrera">
                      <Form.Label>Nombre de la carrera</Form.Label>
                      <Form.Control
                        required
                        minLength={8}
                        type="text"
                        placeholder="Ingenieria en Sistemas"
                        value={carreraData?.carrera}
                        {...register("carrera", inputTextRequeridoValidacion)}
                      />
                      <Form.Control.Feedback type="invalid">
                          {errors.carrera && errors.carrera.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="resolucion">
                      <Form.Label>Resolución</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="T1-04"
                        value={carreraData?.resolucion}
                        {...register("resolucion", inputRequeridoValidacion)}
                      />
                      <Form.Control.Feedback type="invalid">
                          {errors.resolucion && errors.resolucion.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="pdf">
                      <Form.Label>Subir PDF</Form.Label>
                      <Form.Control
                        type="file"
                        value={carreraData?.pdf}
                        {...register('pdf')}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Col md="6" className="d-flex justify-content-start">
                      <Button variant="secondary" type="button" onClick={handleVolver} >Volver al listado</Button>
                    </Col>
                    <Col md="6" className="d-flex justify-content-end">
                      <Button type="submit">Guardar datos</Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarreraForm;
