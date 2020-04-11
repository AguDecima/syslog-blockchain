import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'
import Header from '../Header/Header';



const AddUsuario = () => {

    const [nombreUsuario, setNombreUsuario] = useState('');

    const addUsuario = (e) => {
        e.preventDefault();
        console.log(nombreUsuario);
    }

    return (
        <Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row justify-content-center">

                    <div className="col-8 mt-4">
                        <form onSubmit={addUsuario}>
                            <div class="form-group">
                                <label for="inputNombre">Nombre usuario</label>
                                <input type="text" class="form-control" id="inputNombre" onChange={(e) => setNombreUsuario(e.target.value)} />
                                <small id="emailHelp" class="form-text text-muted">El usuario no deberia compartir esta informacion.</small>
                            </div>
                            <button type="submit" class="btn btn-lg btn-success">Añadir usuario</button>
                        </form>
                    </div>

                </div>
            </div>
        </Fragment>
    )

}

export default withRouter(AddUsuario);