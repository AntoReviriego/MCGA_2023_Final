import { Navigate, Route} from "react-router-dom"
import Noticias from '../components/noticias-component/noticias-component'
import Carrera from '../components/carrera-component/carrera-component'
import Login from "../components/login-component/login-component"
import Registro from "../components/login-component/registro-component/registro-component"
import CarreraForm from "../components/carrera-component/carrera-form-component/carrera-form-component"
import NoticiaForm from "../components/noticias-component/noticia-form-component/noticia-form-component"

const RenderRouter = () => {
  let token = "";
  const _token = localStorage.getItem('token');
  if (_token !== null && _token !== undefined && _token !== "") {
    token = _token;
  }

  return (
    route.map(x => { 
      if (x.requiresAuth && token == "") {
        return <Route key={x.key} path={x.path} element={<Navigate to="/login" />} />;
      } else {
        return <Route key={x.key} path={x.path} element={x.element} />;
      }
    })
  );
}
export default RenderRouter

export const route = [
  {
    key:"_noticia",
    path: "/", 
    element: <Noticias/>,
    requiresAuth: false,
  }, 
  {
    key:"noticia",
    path: "/noticias", 
    element: <Noticias/>,
    requiresAuth: false,
  }, 
  {
    key:"noticiaForm",
    path: "/noticia-form", 
    element: <NoticiaForm/>,
    requiresAuth: true,
  },
  {
    key:"noticiaFormId",
    path: "/noticia-form/:id", 
    element: <NoticiaForm/>, 
    requiresAuth: true,
  }, 
  {
    key:"login",
    path: "/login", 
    element: <Login/>,
    requiresAuth: false,
  }, 
  {
    key:"registro",
    path: "/registro", 
    element: <Registro/>,
    requiresAuth: false,
  }, 
  {
    key:"carrera",
    path: "/carrera", 
    element: <Carrera/>,
    requiresAuth: true,
  }, 
  {
    key:"carreraForm",
    path: "/carrera-form", 
    element: <CarreraForm/>,
    requiresAuth: true,
  }, 
  {
    key:"carreraFormId",
    path: "/carrera-form/:id", 
    element: <CarreraForm/>, 
    requiresAuth: true,
  }
]