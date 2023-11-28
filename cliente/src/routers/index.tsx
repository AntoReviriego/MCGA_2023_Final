import { Route } from "react-router-dom"
import Noticias from '../components/noticias-component/noticias-component'
import Carrera from '../components/carrera-component/carrera-component'
import Login from "../components/login-component/login-component"
import Registro from "../components/registro-component/registro-component"
import CarreraForm from "../components/carrera-component/carrera-form-component/carrera-form-component"

function RenderRouter() {
    //const [count, setCount] = useState(0)
    return (
     route.map(x => {
      return <Route path={x.path} element ={x.element}/>
     })
    )
  }
export default RenderRouter

export const route = [
  {
    path: "/", 
    element: <Noticias/>
  }, 
  {
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
    path: "/carrera", 
    element: <Carrera/>
  }, 
  {
    path: "/carrera-form", 
    element: <CarreraForm/>
  }, 
]