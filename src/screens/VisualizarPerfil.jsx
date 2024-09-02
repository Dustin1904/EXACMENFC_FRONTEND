import axios from "axios";
import { useEffect, useState } from "react";
import BotonAcciones from "./components/Boton";
import ActualizarDatos from "./components/modals/Actualizar";

export default function Perfil() {

    const [ perfil , setPerfil ] = useState({});

    const [ modalVisible , setModalVisible ] = useState(false);

    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

    const getDataPerfilUser = async () => {
        try {
            const respuesta = await axios.get(`${process.env.REACT_APP_BACKEND}/perfil`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            setPerfil(respuesta.data);
            console.log(respuesta.data);
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    useEffect( ( ) => {
        getDataPerfilUser();
    }, []);

    return (
        <>
            <BotonAcciones texto="Actualizar Perfil" accion={() => {
                setModalVisible(true)
            }}></BotonAcciones>
            <div className="flex flex-col gap-3 backdrop-blur-sm bg-black/50 w-3/4 justify-center p-4 border rounded-lg" >
                <h1 className="text-white"> Visualizar datos de {perfil.nombre} </h1>
                <hr />
                {Object.keys(perfil).map(( dato ) => {
                    if ( dato.includes("_id") ) return;
                    return (
                        <div className="text-white flex gap-2">
                            <strong> { dato } </strong>
                            <p> { perfil[dato] } </p>
                        </div>
                )}
                )}
            </div>
            { modalVisible && <ActualizarDatos registroSeleccionado={perfil} formulario="usuario"> <BotonAcciones texto="Cancelar" accion={(event) => {
                event.stopPropagation();
                setModalVisible(false);
            }}></BotonAcciones> </ActualizarDatos> }
        </>
    );
}