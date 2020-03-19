import React from 'react';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

// router
import { withRouter } from 'react-router-dom';


// link
import { Link } from 'react-router-dom';

const Header = ({history}) => {


    const logOut = () => {
        history.push('/');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">SYSLOG AUDITORIA</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/home">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/clientes">Consultas</Link>
                        </li>
                    </ul>


                <div className="form-inline my-2 my-lg-0">

                    <div className="dropdown">
                        <button className="btn btn-outline-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FontAwesomeIcon icon={faUser} />  ADMIN
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item" >Configuraciones</button>
                            <button className="dropdown-item" onClick={() => { logOut() }}>Cerrar Sesion</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default withRouter(Header);