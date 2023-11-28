// import { useState } from 'react'
import reactLogo from '../../assets/react.svg'

function Noticias(props:any) {
   //const [count, setCount] = useState(0)

  return (
    <>
      <div className='row p-3'>
        <div className='col-sm-12 col-md-6 col-lg-6'>
          <div className='card'>
            <img src={reactLogo} className='card-img-top' alt='Imagen no encontrada' width='400' height='250'/>
            <div className='dropdown-divider'></div>
            {/* <h5 className='text-center text-muted'> No hay imagen disponible </h5> */}
            <div className='card-body'>
                <h3 className='card-title text-info'>{props.titulo} </h3>
                <div className='row'>
                  <div className='col-sm-12 col-md-6 col-lg-6'>
                      <small className='text-muted'><span className='font-weight-bold'>Autor:</span> Autor</small>
                  </div>
                  <div className='col-sm-12 col-md-6 col-lg-6'>
                    <small className='text-muted'><span className='font-weight-bold'>Carrera:</span>Tipo carrera / Asignanda o no</small>
                  </div>
                </div>
                <p className='card-text'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, nesciunt enim unde, accusantium quae rerum saepe ipsum omnis hic nostrum illum nam quibusdam. Nemo veniam, minima optio ut corporis ducimus?</p>
                <span className='badge badge-warning'><a href='#'> Archivo 1 </a></span>  
                <span className='badge badge-warning'><a href='#'> Archivo 2</a></span>  
                <a href='#'><span className='badge badge-info'> Etiqueta que hace filtros</span></a>
                <div className='dropdown-divider'></div>
                {/* Logueado permitimos ver, editar o borrar  */}
                <div className='row'>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <a href='#' className='text-center btn' data-toggle='tooltip' data-placement='top' title='Ver'><i className='fas fa-eye text-primary'></i></a>
                        <a href='#' className='text-center btn' data-toggle='tooltip' data-placement='top' title='Editar'><i className='far fa-edit text-info'></i></a>
                        <a href='#' className='text-center btn' data-toggle='tooltip' data-placement='top' title='Borrar'><i className='fas fa-trash-alt text-danger'></i></a>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <p className='card-text text-right'><small className='text-muted'> 14/11/2023 19:48</small></p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Noticias