import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export const Inicio = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Mi Aplicación</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/notas">Notas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/crudejerciciodos">Api categorias</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div>
                <h1 className='text-center'>Inicio</h1>
            </div>

        </>

    )
}
