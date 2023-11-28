// import { useState } from 'react'

function Login() {
   //const [count, setCount] = useState(0)
  return (
    <>
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header'>LogIn</div>

                        <div className='card-body'>
                            <form method='POST' action='#'>
                                <div className='form-group row'>
                                    <label htmlFor='email' className='col-md-4 col-form-label text-md-right'>Email</label>
                                    <div className='col-md-6'>
                                        <input id='email' type='email' className='form-control is-invalid' name='email' value='' required autoComplete='email' autoFocus/>
                                        <span className='invalid-feedback' role='alert'><strong>Email ingresado no es correcto</strong></span>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label htmlFor='password' className='col-md-4 col-form-label text-md-right'>Contraseña</label>
                                    <div className='col-md-6'>
                                        <input id='password' type='password' className='form-control is-invalid' name='password' required autoComplete='current-password'/>
                                        <span className='invalid-feedback' role='alert'><strong>Contraseña no cumple requisitos</strong></span>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <div className='col-md-6 offset-md-4'>
                                        <div className='form-check'>
                                            <input className='form-check-input' type='checkbox' name='remember' id='remember'/>
                                            <label className='form-check-label' htmlFor='remember'>Recordarme</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='form-group row mb-0'>
                                    <div className='col-md-8 offset-md-4'>
                                        <button type='submit' className='btn btn-primary'>Iniciar sesión</button>
                                        <a className='btn btn-link' href='#'> ¿Has olvidado la contrseña?</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
export default Login