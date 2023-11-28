// import { useState } from 'react'

function Registro() {
   //const [count, setCount] = useState(0)
  return (
    <>
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header'>Registro</div>
                        <div className='card-body'>
                            <form method='POST' action='#'>
                                <div className="form-group row">
                                    <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Nombre </label>

                                    <div className="col-md-6">
                                        <input id="name" type="text" className="form-control @error('name') is-invalid @enderror" name="name" value="" required autoComplete="name" autoFocus/>
                                        <span className="invalid-feedback" role="alert">
                                            <strong>Error msj</strong>
                                        </span>
                                    </div>
                                </div>

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
                                    <label htmlFor='password-confirm' className='col-md-4 col-form-label text-md-right'>Repetir contraseña</label>
                                    <div className='col-md-6'>
                                        <input id='password-confirm' type='password' className='form-control is-invalid' name='password-confirm' required autoComplete='current-password'/>
                                        <span className='invalid-feedback' role='alert'><strong>Contraseña no cumple requisitos</strong></span>
                                    </div>
                                </div>
                                <div className='form-group row mb-0'>
                                    <div className='col-md-8 offset-md-4'>
                                        <button type='submit' className='btn btn-primary'>Registrarse</button>
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
export default Registro