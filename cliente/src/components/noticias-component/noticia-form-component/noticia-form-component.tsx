import { Button, Card, Col, Form, Row } from "react-bootstrap"
import _Toast from "../../shared/toast-component/toast-component"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TypeNoticiaForm } from "./types";
import Spinner from "../../shared/spinner-component/spinner-component";
import { inputTextRequeridoValidacion, inputTextareaRequeridoValidacion } from "../../../utility/validaciones";
import url_Api from "../../../services/api.services";
import { TypeCarrera } from "../../carrera-component/types";
import { UserContextType } from "../../../provider/type";
import { useUser } from "../../../provider/user.context.provider";

const NoticiaForm = ({ noticiaData }: { noticiaData?: TypeNoticiaForm }) => {
    const [carreras, setCarreras] = useState<TypeCarrera[]>([]);
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false); // spinner
    const [guardadoExitoso, setGuardadoExitoso] = useState(false); // toast
    const [selectedCarrera, setSelectedCarrera] = useState('');
    const { user } = useUser() as UserContextType; 
    const { id } = useParams<{ id: string }>();
    const {
        register,
        handleSubmit: validateForm,
        formState: { errors },
        setValue,
    } = useForm<TypeNoticiaForm>();
    const navigate = useNavigate();

    const getNoticiaId = async () => {
        await fetch(`${url_Api.apiNoticia}/${id}`)
        .then(data => {
          if (!data.ok) {
            throw new Error(`Ocurrio un error. Respuesta: ${data}`);
          }
          return data.json();
        })
        .then(data => {
          Object.keys(data).forEach(key => {
            setValue(key as keyof TypeNoticiaForm, data[key as keyof TypeNoticiaForm]);
          });
        })
        .catch(error => {
          console.error('Error de datos. Respuesta:', error);
        });
    }
    const handleCarreraChange = (event:any) => {
      const selectedId = event.target.value;
      setSelectedCarrera(selectedId);
    };

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
    
      const onSubmit = async (data:TypeNoticiaForm) => {
        setLoading(true);
        try {
          const formData = new FormData();
          formData.append('titulo', data.titulo);
          formData.append('cuerpo', data.cuerpo);
          formData.append('id_carrera', data.id_carrera);
          formData.append('autor', user);
          if (data.img != null && data.img.length > 0) {
            formData.append('img', data.img[0]);
          }
          const response = await fetch(id ? `${url_Api.apiNoticia}/${id}` : url_Api.apiNoticia, {
            method: id ? 'PATCH' : 'POST',
            body: formData,
          });
          if (response.ok) {
            setLoading(false);
            setGuardadoExitoso(true);
          }
        } catch (error) {
          console.error('Error al enviar formulario:', error);
          setLoading(false);
        }
      };

    const handleVolver = () => {
        navigate('/noticias')
    }

    const cargarCarrera = async () => {
      try {
        const response = await fetch(url_Api.apiCarrera);
        if (!response.ok) {
          throw new Error("Error al cargar las carrera");
        }
        const data = await response.json();
        setCarreras(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar las noticias:", error);
      }
    };

    useEffect(() => {
      cargarCarrera();
      if(id !== undefined){
        getNoticiaId()
      }
    }, [id, setValue]);
    
    return (
    <>
      <Spinner showSpinner={loading} />
      {guardadoExitoso && (
        <_Toast 
          title="Éxito"
          type=""
          message={`¡Los datos de la noticia se guardaron correctamente!`}
          url = "/noticias"
        />
      )}
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <Card>
              <Card.Header>Ingresar los datos correspondientes </Card.Header>
              <Card.Body>
                <Form noValidate validated={validated}  onSubmit={handleFormSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="titulo">
                      <Form.Label>Titulo</Form.Label>
                      <Form.Control
                        required
                        minLength={8}
                        type="text"
                        placeholder="Titulo de la noticia"
                        value={noticiaData?.titulo}
                        {...register("titulo", inputTextRequeridoValidacion)}
                      />
                      <Form.Control.Feedback type="invalid">
                          {errors.titulo && errors.titulo.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="id_carrera">
                        <Form.Label>Carrera</Form.Label>
                        <Form.Select aria-label="id_carrera" {...register('id_carrera')}  onChange={handleCarreraChange}  value={selectedCarrera}>
                            {carreras.map((carrera) => (
                                <option key={carrera._id} value={carrera._id}>
                                    {carrera.carrera}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="img">
                      <Form.Label>Imagen</Form.Label>
                      <Form.Control
                        type="file"
                        {...register('img')}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                        <Form.Group className="mb-3" controlId="cuerpo">
                            <Form.Label>Cuerpo de la noticia</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                required
                                minLength={100}
                                maxLength={1000}
                                rows={6} 
                                placeholder="Desarrolle su noticia" 
                                {...register('cuerpo', inputTextareaRequeridoValidacion)} 
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.cuerpo && errors.cuerpo.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                  </Row>                  
                  <Row className="mb-3">
                    <Col md="6" className="d-flex justify-content-start">
                      <Button variant="secondary" type="button" onClick={handleVolver}>Volver a las noticias</Button>
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
  )
}
export default NoticiaForm
