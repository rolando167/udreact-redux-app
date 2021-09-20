import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_EXITO,
	AGREGAR_PRODUCTO_ERROR,
	COMENZAR_DESCARGA_PRODUCTOS,
	DESCARGA_PRODUCTOS_EXITO,
	DESCARGA_PRODUCTOS_ERROR,
	OBTENER_PRODUCTO_ELIMINAR,
	PRODUCTO_ELIMINADO_EXITO,
	PRODUCTO_ELIMINADO_ERROR,
	OBTENER_PRODUCTO_EDITAR,
	COMENZAR_EDICION_PRODUCTO,
	PRODUCTO_EDITADO_EXITO,
	PRODUCTO_EDITADO_ERROR,

} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import Producto from "../components/Producto";

//Crear nuevos Productos
const crearNuevoProductoAction = (producto) => {
	return async(dispatch) =>{
		// console.log(producto);
		dispatch(agregarProducto()); // estado de cargando...

		try {
			//insertar en la API
			await clienteAxios.post('/productos', producto);

			// si todo sale bien, actualizar el state
			dispatch(agregarProductoExito(producto)); // SI guardó en DB

			// Muestra alerta
			Swal.fire(
				'Correcto',
				'El producto se agregó correctamente 😄',
				'success'
			);

		} catch (error) {
			console.log(error);
			dispatch(agregarProductoError(true));
			Swal.fire(
				{
					icon:	'Error',
					title: 'Hubo un error 😞',
					text: 'Intenta de nuevo.'
				}
			);
		}
	}
}

const agregarProducto  = () => ({
	type: AGREGAR_PRODUCTO,
	payload: true
});

const agregarProductoExito = (producto) =>({
	type: AGREGAR_PRODUCTO_EXITO,
	payload: producto
});

const agregarProductoError = (estado) =>({
	type: AGREGAR_PRODUCTO_ERROR,
	payload: estado
});

//Funcion que descarga los productos de la Base de datos
const obtenerProductosAction = () =>{
	return async (dispatch) => {
		dispatch( descargaProductos());

		try {
			// setTimeout(async() =>{ // Simular
				const respuesta = await clienteAxios.get('/productos');
				// console.log(respuesta.data);
				dispatch( descargaProductosExitosa(respuesta.data));
			// }, 1000);
		} catch (error) {
			dispatch( descargaProductosError());
		}
	}
};

const descargaProductos = () =>({
	type: COMENZAR_DESCARGA_PRODUCTOS,
	payload: true
})

const descargaProductosExitosa = (productos) => ({
	type: DESCARGA_PRODUCTOS_EXITO,
	payload: productos
});

const descargaProductosError = () => ({
	type: DESCARGA_PRODUCTOS_ERROR,
	payload: true
});

// Selecciona y Elimina el producto
const borrarProductoAction = (id) =>{
	return async(dispatch) =>{
		dispatch(obtenerProductoEliminar(id));
		// console.log(id);
		try {
			await clienteAxios.delete(`/productos/${id}`);
			dispatch(eliminarProductoExito());

			// Si se elimina mostrar Alerta
			Swal.fire(
				'Registro Eliminado!',
				'El registro ha sido Eliminado.',
				'success'
			)
		} catch (error) {
			console.log(error);
			dispatch(eliminarProductoError());
		}
	}
}

const obtenerProductoEliminar = (id) => ({
	type: OBTENER_PRODUCTO_ELIMINAR,
	payload: id
});

const eliminarProductoExito = () =>({
	type: PRODUCTO_ELIMINADO_EXITO,
	payload: true
})

const eliminarProductoError = () =>({
	type: PRODUCTO_ELIMINADO_ERROR,
	payload: true
});

//Colocar Producto en Edicion
const obtenerProductoAction = (producto) => {
	return async(dispatch) => {
		dispatch(obtenerProductoEditar(producto));
	}
}

const obtenerProductoEditar = (producto) =>({
	type: OBTENER_PRODUCTO_EDITAR,
	payload: producto
});

//Edita un registro en la Api y state
const editarProductoAction = (producto) =>{
	return async(dispatch)=>{
		dispatch(editarProducto());
		try {
			await clienteAxios.put(`/productos/${producto.id}`, producto);

			dispatch(editarProductoExito(producto));
		} catch (error) {
			console.log(error);
			dispatch( editarProductoError() );

		}
	}
}

const editarProducto = () => ({
	type: COMENZAR_EDICION_PRODUCTO,
});

const editarProductoExito = (producto) => ({
	type: PRODUCTO_EDITADO_EXITO,
	payload: producto,
});

const editarProductoError = () => ({
	type: PRODUCTO_EDITADO_ERROR,
});

export { crearNuevoProductoAction,
		obtenerProductosAction,
		borrarProductoAction,
		obtenerProductoAction,
		editarProductoAction,
	};