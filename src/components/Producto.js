import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { borrarProductoAction, obtenerProductoAction } from "../actions/productoActions";
import Swal from "sweetalert2";


const alertaConfirmacion = (dispatch, id) =>{
	Swal.fire({
		title: '¿Estas seguro de?',
		text: "Un producto que se elimina no se puede recuperar!!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si, Eliminar!',
		cancelButtonText: "Cancelar"
	}).then((result) => {
		if (result.isConfirmed) {
		  dispatch(borrarProductoAction(id));
		}
	})
}


const Producto = ({producto}) => {
	const {nombre, precio, id} = producto;

	const dispatch = useDispatch();
	const history = useHistory(); // habilitar history para redireccion

	//confirmar si desea eliminarlo
	const confirmarEliminarProducto = id => {
		//Preguntar al usuario
		alertaConfirmacion(dispatch, id);
	}

	//funcion que redirige de forma programada
	const redireccionaEdicion = producto =>{
		dispatch( obtenerProductoAction(producto));
		history.push(`/productos/editar/${producto.id}`);
	}

	return (
		<tr>
			<td>{nombre}</td>
			<td><span className="font-weight-bold"> $ {precio} </span></td>
			<td className="acciones">
				<button
					type="button"
					onClick={()=> redireccionaEdicion(producto)}
					className="btn btn-primary mr-2"
				>Editar</button>

				{/* <Link to={`/productos/editar/${id}`} className="btn btn-primary mr-2">Editar</Link> */}
				<button
					type="button"
					className="btn btn-danger"
					onClick={()=> confirmarEliminarProducto(id)}
				>Eliminar</button>
			</td>
		</tr>
	 );
}

export default Producto;