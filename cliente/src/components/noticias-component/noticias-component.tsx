import { useEffect, useState } from "react";
import reactLogo from "../../assets/react.svg";
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
import _Toast from "../shared/toast-component/toast-component";
const Noticias = () => {
  const [noticias, setNoticias] = useState<TypeNoticia[]>([]);
  const [guardadoExitoso, setGuardadoExitoso] = useState(false); // toast
  const [modalShow, setModalShow] = useState(false); // modal
  const [loading, setLoading] = useState(true); // spinner
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: string }>({});
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
    let label = ['Carrera','Autor',  'Creado', 'Ultima actualización'];
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
  useEffect(() => {
    cargarImagenes();
  }, [noticias]); // Vuelve a cargar las imágenes cuando cambian las noticias
  const handlePDFDownload = async (pdf:string) => {
    setLoading(true);
    try {
      const response = await fetch(`${url_Api.apiArchivo}/d/${pdf}`);
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
  const cargarImagen = async (img: string) => {
    try {
      if(img != "null" && img != "" && img != null){
        const response = await fetch(`${url_Api.apiArchivo}/${img}`);
        if (!response.ok) {
          throw new Error('Error al mostrar IMG');
        }
        const blob = await response.blob(); // Obtener el contenido de la respuesta como un blob
        const imgUrl = URL.createObjectURL(blob); // Crear una URL para el blob (contenido de la imagen)
        return imgUrl || reactLogo; // Si la URL está vacía, usar reactLogo
      }
      return reactLogo;
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      return reactLogo; // En caso de error, usar reactLogo
    }
  };
  const cargarImagenes = async () => {
    const images: { [key: string]: string } = {};
    await Promise.all(
      noticias.map(async (noticia, index) => {
        if(noticia.img != "null" && noticia.img != "" && noticia.img != null){
          try {
            const imgUrl = await cargarImagen(noticia.img);
            images[index] = imgUrl;
          } catch (error) {
            console.error('Error al cargar la imagen:', error);
            images[index] = reactLogo; // Usa reactLogo en caso de error
          }
        }
      })
    );
    setLoadedImages(images);
  };
  const handleDelete = async () => {
    try {
      setGuardadoExitoso(false);
      setModalShow(false);
      setLoading(true);
      await fetch(`${url_Api.apiNoticia}/${modalData.id}`, {
        method: 'DELETE',
      }).then(data => {
        if(data.ok){
          setLoading(false);
          setGuardadoExitoso(true);
          cargarNoticias();
        }
        else{
          throw new Error(`Ocurrio un error. Respuesta: ${data}`);
        }
      });
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };
 
  return (
    <>
      <Spinner showSpinner={loading} />
      {guardadoExitoso && (
          <_Toast 
            title="Éxito"
            type=""
            message={`¡Los datos de la noticia ${modalData.title} se eliminaron correctamente!`}
            url = "/noticias"
          />
        )}
      <_Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          EliminarRegistro={handleDelete}
          {...modalData}
        />
      <div className="container">
      <Row>
          {noticias.map((noticia, index) => (   
            <Col sm={12} md={6} lg={6} className="mb-2">
              <Card key={index} >
                <Card.Img variant="top" src={loadedImages[index] || reactLogo} width="400" height="250"/>
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
export default Noticias;