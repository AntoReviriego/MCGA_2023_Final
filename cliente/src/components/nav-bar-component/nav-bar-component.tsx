// import { useState } from 'react'

function NavBar() {
   //const [count, setCount] = useState(0)

  return (
    <>
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div className="container">
                <a className="navbar-brand" href="/">
                    Universidad Ficticia
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="ml-1"><a href='/carrera'>Carrera</a></li>
                    <li className="ml-1"><a href='/noticias'>Noticia</a></li>
                    {/* <li className="ml-1"><a href='/carrera'>Alumnos</a></li> */}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/login"> Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/registro"> Registrarse </a>
                                </li>
                            {/* <li className="nav-item dropdown">
                                <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                  Si esta logueado, nombre
                                </a>

                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="{{ route('logout') }}">
                                       Logout
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" className="d-none">
                                       
                                    </form>
                                </div>
                            </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}
export default NavBar