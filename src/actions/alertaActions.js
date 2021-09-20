import {
	MOSTRAR_ALERTA,
	OCULTAR_ALERTA,

} from "../types";

//Muestra Alerta
const mostrarAlertaAction = (alerta) =>{
	return(dispatch) =>{
		dispatch(crearAlerta(alerta));
	}
}

const crearAlerta = alerta =>({
	type: MOSTRAR_ALERTA,
	payload: alerta,
});

//ocultar Action
const ocultarAlertaAction = (alerta) =>{
	return(dispatch) =>{
		dispatch(ocultarAlerta());
	}
}

const ocultarAlerta = () =>({
	type: MOSTRAR_ALERTA,
	payload: null,
});


export { mostrarAlertaAction, ocultarAlertaAction };