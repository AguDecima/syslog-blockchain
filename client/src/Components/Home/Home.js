import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'

import md5 from 'md5';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faTrash
} from '@fortawesome/free-solid-svg-icons'

// services
import { getAllAuditorias, getAllAuditoriasHyperLedger, getByKeyAuditoriasHyperLedger } from '../../Services/auditodiaService';

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
            getAllAuditoriasHyperLedger('user1')
                .then(data => {
                    console.log(data);
                });
            setIsLoad(false);
        }
    }, [isLoad]);

    const jsonToMD5 = (data) => {
        return md5(data);
    }

    const saveAuditoria = (auditoria) => {
        getByKeyAuditoriasHyperLedger('user1',auditoria.id + auditoria.organizacion + auditoria.ip )
        .then( data => {
            console.log(data);
        })
        .catch( error => console.log(error));
    }

    return (
        <Fragment>
            <Header />
            <div className="container-fluid">
                <div className="mt-3">
                    <h3 className="text-center">Base de Datos</h3>
                    <table class="table mt-2">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Organizacion</th>
                                <th scope="col">IP</th>
                                <th scope="col">Dia y Hora</th>
                                <th scope="col">Prioridad</th>
                                <th scope="col">Nivel</th>
                                <th scope="col">Mensaje</th>
                                <th scope="col">Hash</th>
                                <th scope="col">Estado - Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(registros.map(registro => {
                                return (
                                    <tr>
                                        <td>{registro.organizacion}</td>
                                        <td>{registro.ip}</td>
                                        <td>{registro.datetime}</td>
                                        <td>{registro.prioridad}</td>
                                        <td>{registro.level}</td>
                                        <td>{registro.mensaje}</td>
                                        <td>{ jsonToMD5(registro) }</td>
                                        <td>
                                            <button className="btn btn-success mr-2" title="verificar blockchain">
                                                <FontAwesomeIcon icon={faCheckDouble} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }))}

                        </tbody>
                    </table>
                </div>
                <div className="mt-3">
                    <h3 className="text-center">Blockchain</h3>
                    <table class="table mt-2">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Organizacion</th>
                                <th scope="col">IP</th>
                                <th scope="col">Dia y Hora</th>
                                <th scope="col">Prioridad</th>
                                <th scope="col">Nivel</th>
                                <th scope="col">Mensaje</th>
                                <th scope="col">Hash</th>
                                <th scope="col">Estado - Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(registros.map(registro => {
                                return (
                                    <tr>
                                        <td>{registro.organizacion}</td>
                                        <td>{registro.ip}</td>
                                        <td>{registro.datetime}</td>
                                        <td>{registro.prioridad}</td>
                                        <td>{registro.level}</td>
                                        <td>{registro.mensaje}</td>
                                        <td>{ jsonToMD5(registro) }</td>
                                        <td>
                                            <button className="btn btn-success mr-2" title="verificar blockchain"
                                                onClick={() => {saveAuditoria(registro)}}>
                                                <FontAwesomeIcon icon={faCheckDouble} />
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
