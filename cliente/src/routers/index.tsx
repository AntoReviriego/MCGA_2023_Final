import { Route } from "react-router-dom"
import Noticias from '../components/noticias-component/noticias-component'
import Carrera from '../components/carrera-component/carrera-component'
import Login from "../components/login-component/login-component"
import Registro from "../components/registro-component/registro-component"
import CarreraForm from "../components/carrera-component/carrera-form-component/carrera-form-component"

function RenderRouter() {
  return (
    route.map(x => {
      return <Route key={x.key} path={x.path} element ={x.element}/>
    })
  )
}
export default RenderRouter

export const route = [
  {
    key:"_noticia",
    path: "/", 
    element: <Noticias/>
  }, 
  {
    key:"noticia",
    path: "/Noticias", 
    element: <Noticias/>
  }, 
  {
    path: "/Login", 
    element: <Login/>
  }, 
  {
    path: "/Registro", 
    element: <Registro/>
  }, 
  {
    key:"carrera",
    path: "/carrera", 
    element: <Carrera/>
  }, 
  {
    key:"carreraForm",
    path: "/carrera-form", 
    element: <CarreraForm/>
  }, 
  {
    key:"carreraFormId",
    path: "/carrera-form/:id", 
    element: <CarreraForm/>
  }, 
]