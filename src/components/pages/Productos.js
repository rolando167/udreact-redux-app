import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductosAction } from "../../actions/productoActions";
import Producto from "../Producto";

const Productos = () => {

	const dispatch = useDispatch();

	useEffect(()=>{

		//CONSULTAR LA API
		const cargarProductos = () => dispatch(obtenerProductosAction());
		cargarProductos();
		// eslint-disable-next-line
	}, []);

	//obtener el state
	const productos = useSelector( state => state.productos.productos);
	// console.log(productos);
	const cargando = useSelector( state => state.productos.loading);
	const error = useSelector( state => state.productos.error);


	return (
		<div>
			<h2 className="text-center my-5">Listado de Productos 📄</h2>

			<table className="table table-striped">
				<thead className="bg-primary table-dark">
					<tr>
						<th scope="col">Nombre</th>
						<th scope="col">Precio</th>
						<th scope="col">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{
						productos.length === 0 ? <tr><td>NO Hay Productos</td></tr> : (
							productos.map(producto => (
								<Producto
									key={producto.id}
									producto={producto}
								/>
							))
						)
					}
				</tbody>
			</table>
			{cargando ? <p> Cargando ⏲️ ... </p> : null}

						{error ? <p className="alert alert-danger p2 mt-2 text-center">Hubo un error 🛑</p> : null}
					 
		</div>
	 );
}

export default Productos;