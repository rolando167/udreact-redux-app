import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_EXITO,
	AGREGAR_PRODUCTO_ERROR,

} from "../types";


// cada reducer tiene su propio state
const initialState = {
	productos: [],
	error: false,
	loading: false,
}


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) =>{
	switch (action.type) {
		case AGREGAR_PRODUCTO:
			 return{

			 }

		default:
			return state
	}
}