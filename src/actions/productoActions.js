import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_EXITO,
	AGREGAR_PRODUCTO_ERROR,

} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

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

export { crearNuevoProductoAction };