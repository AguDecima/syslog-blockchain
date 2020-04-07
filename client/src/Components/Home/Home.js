import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'

import md5 from 'md5';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faPlus } from '@fortawesome/free-solid-svg-icons'

// services
import {
    getAllAuditorias, getAllAuditoriasHyperLedger, getByKeyAuditoriasHyperLedger,
    setInvokeCreateHyperLedger, getByIdAuditoria
} from '../../Services/auditodiaService';

// style
import './Home.css'
import Header from '../Header/Header';

// sweer alert
import Swal from 'sweetalert2';

const Home = () => {

    const [isLoad, setIsLoad] = useState(true);
    const [registros, setRegistros] = useState([]);
    const [registrosHL, setRegistrosHL] = useState([]);

    useEffect(() => {
        if (isLoad) {
            getAllAuditorias()
                .then(data => {
                    console.log(data);
                    setRegistros(data.data)
                });

            getAllAuditoriasHyperLedger('user1')
                .then(data => {
                    console.log(data.data.registros);
                    setRegistrosHL(data.data.registros);
                });
            setIsLoad(false);
        }
    }, [isLoad]);

    const toMD5 = (auditoria) => {
        return md5(JSON.stringify({
            id: auditoria.id,
            seqblock: auditoria.secuencia,
            orblock: auditoria.organizacion,
            ipblock: auditoria.ip,
            tsblock: auditoria.datetime,
            crblock: auditoria.level,
            fablock: auditoria.facility,
            prblock: auditoria.prioridad,
            deblock: auditoria.mensaje,
            tablock: auditoria.tag
        }));
    }

    const saveAuditoria = async (auditoria) => {
        let auditoriaHP = {
            id: (auditoria.id).toString(),
            seqblock: (auditoria.secuencia).toString(),
            orblock: (auditoria.organizacion).toString(),
            ipblock: (auditoria.ip).toString(),
            tsblock: (auditoria.datetime).toString(),
            crblock: (auditoria.level).toString(),
            fablock: (auditoria.facility).toString(),
            prblock: (auditoria.prioridad).toString(),
            deblock: (auditoria.mensaje).toString(),
            tablock: (auditoria.tag).toString()
        }

        getByKeyAuditoriasHyperLedger('user1', (auditoria.id).toString() + (auditoria.organizacion).toString() + (auditoria.ip).toString())
            .then(data => {
                console.log(data);
                if (data.data.status === true) {
                    Swal.fire({
                        text: 'el registro ya existe en hyper ledger',
                        type: 'warning'
                    });
                }
            })
            .catch(error => {
                console.log(error.response);
                if (error.response.data.status === false) {
                    setInvokeCreateHyperLedger('user1', auditoriaHP)
                    .then(data => {
                        console.log(data);
                        Swal.fire({
                            text: 'El registro de añadio correctamente en Hyper Ledger',
                            type: 'success'
                        });
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
                }
            });

       

    }

    const verificarAuditoria = (registro) => {

        getByIdAuditoria(registro.Record.id)
        .then( data => {
            let auditoriaHP = data.data[0];
            console.log( toMD5(auditoriaHP), registro.Record);
        })
        .catch(error => {
            console.log(error.response);
        });
        
    }

    return (
        <Fragment>
            <Header />
            <div className="container-fluid">

                <div className="mt-3">
                    <h3 className="text-center">Blockchain</h3>
                    <table class="table mt-2">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Key</th>
                                <th scope="col">Organizacion</th>
                                <th scope="col">IP</th>
                                <th scope="col">Dia y Hora</th>
                                <th scope="col">Prioridad</th>
                                <th scope="col">Nivel</th>
                                <th scope="col">Mensaje</th>
                                <th scope="col">Hash</th>
                                <th scope="col">Verificar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(registrosHL.map(registro => {
                                return (
                                    <tr>
                                        <td>{registro.Key}</td>
                                        <td>{registro.Record.orblock}</td>
                                        <td>{registro.Record.ipblock}</td>
                                        <td>{registro.Record.tsblock}</td>
                                        <td>{registro.Record.prblock}</td>
                                        <td>{registro.Record.crblock}</td>
                                        <td>{registro.Record.deblock}</td>
                                        <td>{registro.Record.hashblock}</td>
                                        <td>
                                            <button className="btn btn-success mr-2" title="añadir en blockchain"
                                                onClick={() => verificarAuditoria(registro)}>
                                                Verificar <FontAwesomeIcon icon={faCheckDouble} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }))}

                        </tbody>
                    </table>
                </div>

                <div className="mt-3">
                    <h3 className="text-center">Base de Datos</h3>
                    <table class="table mt-2">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Organizacion</th>
                                <th scope="col">IP</th>
                                <th scope="col">Dia y Hora</th>
                                <th scope="col">Prioridad</th>
                                <th scope="col">Nivel</th>
                                <th scope="col">Mensaje</th>
                                <th scope="col">Añadir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(registros.map(registro => {
                                return (
                                    <tr>
                                        <td>{registro.id}</td>
                                        <td>{registro.organizacion}</td>
                                        <td>{registro.ip}</td>
                                        <td>{registro.datetime}</td>
                                        <td>{registro.prioridad}</td>
                                        <td>{registro.level}</td>
                                        <td>{registro.mensaje}</td>
                                        <td>
                                            <button className="btn btn-info mr-2" title="añadir en blockchain"
                                                onClick={() => saveAuditoria(registro)}>
                                                Añadir <FontAwesomeIcon icon={faPlus} />
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
