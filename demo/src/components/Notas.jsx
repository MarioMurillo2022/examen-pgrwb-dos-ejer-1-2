import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Notas = () => {
    const [nota1, setNota1] = useState('');
    const [nota2, setNota2] = useState('');
    const [nota3, setNota3] = useState('');

    const limpiarCampos = () => {
        setNota1('');
        setNota2('');
        setNota3('');
    };

    const calcularSuma = () => {
        const numNota1 = parseFloat(nota1);
        const numNota2 = parseFloat(nota2);
        const numNota3 = parseFloat(nota3);

        if (isNaN(numNota1) || isNaN(numNota2) || isNaN(numNota3)) {
            Swal.fire('Error', 'Por favor, ingresa notas válidas', 'error');
            return;
        }

        if (numNota1 > 30 || numNota2 > 30 || numNota3 > 40) {
            Swal.fire('Error', 'La primer y segunda nota no pueden ser mayor que 30 y la tercer nota mayor de 40', 'error');
            return;
        }

        const suma = numNota1 + numNota2 + numNota3;

        let mensaje;
        if (suma <= 59) {
            mensaje = 'Reprobó';
        } else if (suma >= 60 && suma <= 79) {
            mensaje = 'Bueno';
        } else if (suma >= 80 && suma <= 89) {
            mensaje = 'Muy Bueno';
        } else if (suma >= 90 && suma <= 100) {
            mensaje = 'Sobresaliente';
        } else {
            mensaje = 'Error en el cálculo';
        }

        Swal.fire('Resultado', `La suma de las notas es: ${suma.toFixed(2)}. Resultado: ${mensaje}`, 'info');
    };
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

            <div className='App'>
                <div className="container mt-5 p-3">
                    <h2>Calculadora de Notas</h2>
                    <div className="form-inline mb-3">
                        <div className="form-group mr-2">
                            <label className="mr-2">Nota 1:</label>
                            <input type="number" className="form-control" value={nota1} onChange={(e) => setNota1(e.target.value)} />
                        </div>
                        <div className="form-group mr-2">
                            <label className="mr-2">Nota 2:</label>
                            <input type="number" className="form-control" value={nota2} onChange={(e) => setNota2(e.target.value)} />
                        </div>
                        <div className="form-group mr-2">
                            <label className="mr-2">Nota 3:</label>
                            <input type="number" className="form-control" value={nota3} onChange={(e) => setNota3(e.target.value)} />
                        </div>
                    </div>
                    <div className="d-grid gap-2 d-md-flex">
                        <button className="btn btn-success" onClick={calcularSuma}>Calcular Promedio</button>
                        <button className="btn btn-danger" onClick={limpiarCampos}>Limpiar Campos</button>
                    </div>
                </div>
            </div>
        </>
    )
}
