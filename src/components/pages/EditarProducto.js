import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../../actions/productoActions";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";


const EditarProducto = () => {

	const [productoLocal, setProductoLocal] = useState({
		nombre: '',
		precio: '',
	});

	const history = useHistory();
	const dispatch = useDispatch();

	//Producto a Editar
	const producto = useSelector(state => state.productos.productoEditar);
	// if(!producto) return null;

	//llenar el state automaticamente
	useEffect( () => {
		setProductoLocal(producto);
	}, [producto]);

	//Leer los datos del formulario
	const onChangeFormulario = e => {
		setProductoLocal({
			...productoLocal,
			[e.target.name]: e.target.value,
		})
	}

	const {nombre, precio} = productoLocal;
	// console.log(producto);

	const submitEditarProducto = e => {
		e.preventDefault();

		dispatch(editarProductoAction(productoLocal));
		history.push('/');
	}

	return ( 
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					 <div className="card-body">
						<h2 className="text-center mb-4 font-weight-bold">
							Editar producto
						</h2>
						<form
							onSubmit={submitEditarProducto}
						>
							<div className="form-group">
								<label>Nombre Producto</label>
								<input
									type="text"
									className="form-control"
									placeholder="Nombre Producto"
									name="nombre"
									value={nombre}
									onChange={onChangeFormulario}
								/>
							</div>
							<div className="form-group">
								<label>Precio Producto</label>
								<input
									type="number"
									className="form-control"
									placeholder="Precio Producto"
									name="precio"
									value={precio}
									onChange={onChangeFormulario}
								/>
							</div>
							<button
								type="submit"
								className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
							>Guardar</button>
						</form>
					 </div>
				</div>
			</div>
		</div>
	 );
}
 
export default EditarProducto;