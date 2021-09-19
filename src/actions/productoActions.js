import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_EXITO,
	AGREGAR_PRODUCTO_ERROR,

} from "../types";

//Crear nuevos Productos
const crearNuevoProductoAction = (producto) => {
    return (dispatch) =>{
        console.log(producto);
    }
}

export { crearNuevoProductoAction };