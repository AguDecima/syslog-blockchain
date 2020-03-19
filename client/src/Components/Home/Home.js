import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faTrash
} from '@fortawesome/free-solid-svg-icons'

// services
import { getAllAuditorias, getByIdAuditoria } from '../../Services/auditodiaService';

// style
import './Home.css'
import Header from '../Header/Header';

const Home = () => {

    const [isLoad, setIsLoad] = useState(true);
    const [registros, setRegistros] = useState([]);

    useEffect(() => {
        if (isLoad) {
            getAllAuditorias()
                .then(data => {
                    console.log(data);
                    setRegistros(data.data)
                });
            setIsLoad(false);
        }
    }, [isLoad]);

    return (
        <Fragment>
            <Header />
            <div className="container">
                <div className="mt-3">
                    <h3 className="text-center">Registros</h3>
                    <table class="table mt-2">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Secuencia</th>
                                <th scope="col">Organizacion</th>
                                <th scope="col">IP</th>
                                <th scope="col">Fecha y Hora</th>
                                <th scope="col">Level</th>
                                <th scope="col">Facility</th>
                                <th scope="col">Prioridad</th>
                                <th scope="col">Mensaje</th>
                                <th scope="col">Tag</th>
                                <th scope="col">Estado - Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(registros.map(registro => {
                                return (
                                    <tr className="text-center">
                                        <th scope="row">{registro.id}</th>
                                        <td>{registro.secuencia}</td>
                                        <td>{registro.organizacion}</td>
                                        <td>{registro.ip}</td>
                                        <td>{registro.datetime}</td>
                                        <td>{registro.level}</td>
                                        <td>{registro.facility}</td>
                                        <td>{registro.prioridad}</td>
                                        <td>{registro.mensaje}</td>
                                        <td>{registro.tag}</td>
                                        <td>
                                            <button className="btn btn-success mr-2" title="verificar blockchain">
                                                <FontAwesomeIcon icon={faCheckDouble} />
                                            </button>
                                            <button className="btn btn-primary" title="eliminar registro">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }))}

                        </tbody>
                    </table>
                </div>

            </div>
        </Fragment>
    );
}

export default withRouter(Home);
