import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CrudEjercicioDos = () => {
    const apiUrl = 'https://api.escuelajs.co/api/v1/categories/';

    const [categorias, setCategorias] = useState([]);
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);

    const toggleModal = () => {
        setShowModal(!showModal);
        setEditingUserId(null); // Reseteamos el ID de edición al cerrar el modal
    };

    const resetForm = () => {
        setNombreCategoria('');
        setName('');
        setImageUrl('');
    };

    const postCategoria = async () => {
        try {
            // Validar si los campos están vacíos
            if (!nombreCategoria || !imageUrl) {
                Swal.fire('Error', 'Por favor, completa todos los campos', 'error');
                return;
            }

            const data = {
                name: nombreCategoria,
                image: imageUrl
            };

            await axios.post(apiUrl, data);

            resetForm();
            toggleModal();
            getCategorias();
            Swal.fire('Éxito', 'Categoria agregada correctamente', 'success');
        } catch (error) {
            console.error('Error al agregar la categoria:', error);
            Swal.fire('Error', 'Ocurrió un error al agregar la categoria', 'error');
        }
    };

    const putCategoria = async () => {
        try {
            const data = {
                name: nombreCategoria
            };

            await axios.put(`${apiUrl}${editingUserId}`, data);

            resetForm();
            toggleModal();
            getCategorias();
            Swal.fire('Éxito', 'Categoria actualizada correctamente', 'success');
        } catch (error) {
            console.error('Error al actualizar la categoria:', error);
            Swal.fire('Error', 'Ocurrió un error al actualizar la categoria', 'error');
        }
    };

    const deleteCategorias = async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¡No podrás revertir esto!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminarlo',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await axios.delete(`${apiUrl}${id}`);
                getCategorias();
                Swal.fire('Éxito', 'Categoria eliminada correctamente', 'success');
            }
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
            Swal.fire('Error', 'Ocurrió un error al eliminar la categoría', 'error');
        }
    };

    const getCategorias = async () => {
        try {
            const response = await axios.get(apiUrl);
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al obtener las escuelas:', error);
        }
    };

    useEffect(() => {
        getCategorias();
    }, []);

    const handleEditClick = (id, userName) => {
        setEditingUserId(id);
        setNombreCategoria(userName);
        setShowModal(true);
    };

    return (
        <>
            <div className='App'>
                <div className="container mt-5">
                    <h2>CRUD de Categorias</h2>
                    <button className="btn btn-primary mb-3" onClick={() => { toggleModal(); resetForm(); }}>Agregar Categoria</button>

                    <div className="row">
                        {categorias.map((categoria) => (
                            <div className="col-md-4 mb-4" key={categoria.id}>
                                <div className="card">
                                    <img src={categoria.image} className="card-img-top" alt="Avatar" />
                                    <div className="card-body">
                                        <h5 className="card-title">{categoria.name}</h5>
                                        <button className="btn btn-warning mr-2" onClick={() => handleEditClick(categoria.id, categoria.name)}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => deleteCategorias(categoria.id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{editingUserId ? 'Editar Categoria' : 'Agregar Categoria'}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleModal}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="nombreCategoria">Nombre de la categoria</label>
                                            <input type="text" className="form-control" id="nombreCategoria" value={nombreCategoria} onChange={(e) => setNombreCategoria(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="imageUrl">URL del Avatar</label>
                                            <input type="text" className="form-control" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancelar</button>
                                    <button type="button" className="btn btn-primary" onClick={editingUserId ? putCategoria : postCategoria}>{editingUserId ? 'Guardar Cambios' : 'Agregar'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
                </div>
            </div>
        </>
    )
}
