import { useEffect, useState } from "react";
import reactLogo from "../../assets/react.svg"
import { TypeNoticia } from "./types";
import Spinner from "../shared/spinner-component/spinner-component";
import url_Api from "../../services/api.services";
import { Button, Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useUser } from "../../provider/user.context.provider";
import { UserContextType } from "../../provider/type";
import _Modal from "../shared/modal-component/modal-component";
import moment from "moment";
import { Link } from "react-router-dom";
import { TypeCarrera } from "../carrera-component/types";

const Noticias = () => {
  const [noticias, setNoticias] = useState<TypeNoticia[]>([]);
  const [modalShow, setModalShow] = useState(false); // modal
  const [loading, setLoading] = useState(true); // spinner
  const { user } = useUser() as UserContextType; 
  const [modalData, setModalData] = useState({
    title: "",
    subtitle: "",
    verEliminarBotton: false,
    data: [],
    id: "", 
    type:"",
    message: ""
  });

  const formatFecha = (fecha: string) => {
    const fechaFormateada = moment(fecha).format("DD/MM/YYYY"); // Formato de fecha deseado
    return fechaFormateada;
  };

  const convercionObjeto = (noticia : TypeNoticia, EliminarBotton:boolean) => {
    const excludedProperties = ["_id", "__v", "titulo", "cuerpo", "img" ];
    const filteredNoticia = Object.fromEntries(
      Object.entries(noticia).filter(([key]) => !excludedProperties.includes(key))
    );
    const noticiaData = Object.entries(filteredNoticia);
    let label = ['Carrera','Autor',  'Creado', 'Ultima actualización']
    const formattedData:any = noticiaData.map(([key, value], i) => ({
      key: label[i], 
      value: key === "creado" || key === "actualizado" ? formatFecha(value as string) 
      :  key === "id_carrera" ? (value as TypeCarrera).carrera : value, 
    }));

    setModalData({
      title: "Noticia", // Usar un campo relevante de la carrera para el título
      id: noticia._id,
      subtitle: noticia.titulo,
      data: formattedData, // Pasar los datos clave-valor al modal
      message: noticia.cuerpo,
      verEliminarBotton: EliminarBotton, 
      type:'noticia'
    });
    setModalShow(true);
  }

  const cargarNoticias = async () => {
    try {
      const response = await fetch(url_Api.apiNoticia);
      if (!response.ok) {
        throw new Error("Error al cargar las noticias");
      }
      const data = await response.json();
      setNoticias(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar las noticias:", error);
    }
  };
  
  useEffect(() => {
    cargarNoticias();
  }, []);
  
  const handlePDFDownload = async (pdf:string) => {
    setLoading(true);
    try {
      const response = await fetch(`${url_Api.apiArchivo}/${pdf}`);
      if (!response.ok) {
        throw new Error('Error al descargar el PDF');
      }
      // Código para descargar el PDF, si es necesario
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', pdf);
      document.body.appendChild(link);
  
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
      <Spinner showSpinner={loading} />
      <_Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          // EliminarRegistro={handleDelete}
          {...modalData}
        />
      <div className="container">
      <Row>
          {noticias.map((noticia, index) => (   
            <Col sm={12} md={6} lg={6} className="mb-2">
              <Card key={index} >
                <Card.Img variant="top" src={reactLogo} width="400" height="250"/>
                <div className="dropdown-divider"></div>
                <Card.Body>
                  <Card.Title>  {(noticia.titulo).length > 120 ? (noticia.titulo).slice(0, 120).concat('...') : (noticia.titulo)}</Card.Title>
                  <Row>
                    <Col sm={12} md={6} lg={6}>
                      <OverlayTrigger placement="top" overlay={<Tooltip id="autor-tooltip">{noticia.autor}</Tooltip>}>
                        <p className="text-muted">Autor: {(noticia.autor).split('@')[0]}</p>
                      </OverlayTrigger>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                      <p className="text-muted">Tipo carrera: {noticia.id_carrera.carrera}</p>
                    </Col>
                  </Row>
                  <Card.Text> {(noticia.cuerpo).length > 250 ? (noticia.cuerpo).slice(0, 250).concat('...') : (noticia.cuerpo)} </Card.Text>
                </Card.Body>
                <Card.Body>
                  <Card.Link href="#" className="badge badge-warning">
                    { (noticia.id_carrera.pdf != null && (
                        <button className="badge bg-success" onClick={() => handlePDFDownload( (noticia.id_carrera.pdf).split('\\').pop() as string )}>
                          { (noticia.id_carrera.pdf).split('\\').pop() as string }
                        </button>
                      ))
                    }
                  </Card.Link> 
                  <div className="dropdown-divider"></div>
                  <Row>
                    <Col sm={12} md={6} lg={6}>
                      <OverlayTrigger placement="top" overlay={<Tooltip id="ver-tooltip">Ver</Tooltip>}>
                        <Button variant="link" className="text-center" onClick={() => {
                            convercionObjeto(noticia, false);
                            setModalShow(true);
                          }}
                        ><i className="fas fa-eye text-primary"></i>
                        </Button>
                      </OverlayTrigger>
                      {user == noticia.autor && (
                        <>
                          <OverlayTrigger placement="top" overlay={<Tooltip id="editar-tooltip">Editar</Tooltip>}>
                            <Link to={`/noticia-form/${noticia._id}`} className="btn">
                              <span className="text-white"><i className="far fa-edit text-info"></i></span>
                            </Link>
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip id="borrar-tooltip">Borrar</Tooltip>}>
                            <Button variant="link" className="text-center" onClick={() => {
                              convercionObjeto(noticia, true);
                              setModalShow(true);
                            }}>
                              <i className="fas fa-trash-alt text-danger"></i>
                            </Button>
                          </OverlayTrigger>   
                        </> 
                      )}
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                      <p className="card-text text-right">
                        <small className="text-muted">{formatFecha((noticia.actualizado).toString())}</small>
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
       </Row>  
      </div>
    </>
  )
}
export default Noticias