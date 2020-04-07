import React, { useState } from 'react';
import './Login.css';

// router
import { withRouter } from 'react-router-dom';

// Sweet alert
import Swal from 'sweetalert2';

function Login({ history }) {

    //<div className="custom-control custom-checkbox mb-3">
    //<input type="checkbox" className="custom-control-input" id="customCheck1" />
    //<label className="custom-control-label" for="customCheck1">Remember password</label>
    //</div>

    //<button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Sign in with Google</button>
    //<button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>

    const [nameuser, setNameuser] = useState('');
    const [password, setPassword] = useState('');

    const LoginSubmit = (e) => {
        e.preventDefault();

        if (nameuser === 'admin' && password === 'admin') {
            
            history.push('/home');
        }else{
            Swal.fire({
                text: 'usuario o contraseña incorrecta, intente nuevamente',
                type: 'info',
                showConfirmButton: false,
                timer: 2000
            });
        }

    }

    return (

        <body>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Inicio Sesion</h5>
                                <form className="form-signin" onSubmit={LoginSubmit}>
                                    <div className="form-label-group">
                                        <input type="text"
                                            id="inputEmail"
                                            className="form-control"
                                            placeholder="Email address"
                                            onChange={e => setNameuser(e.target.value)}
                                            required autoFocus={true} />
                                        <label htmlFor="inputEmail">Nombre de usuario</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="password"
                                            id="inputPassword"
                                            className="form-control"
                                            placeholder="Password"
                                            onChange={e => setPassword(e.target.value)}
                                            required />
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>
                                    <button className="btn btn-lg btn-info btn-block text-uppercase" type="submit">Ingresar</button>
                                    <hr className="my-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )

}

export default withRouter(Login);