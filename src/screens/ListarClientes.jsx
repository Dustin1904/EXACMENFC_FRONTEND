import BotonAcciones from "./components/Boton";
import TablaRegistros from "./components/tabla";
import { useState } from "react";
import RegistrarDatos from "./components/modals/Registrar";

export default function ListarC() {

    const [ modalVisible , setModalVisible ] = useState(false);

    return(
        <>
            <BotonAcciones texto="Registrar Cliente" accion={ ( ) => { setModalVisible(true) }}></BotonAcciones>
            <TablaRegistros registros="clientes"></TablaRegistros>
            { modalVisible && <RegistrarDatos formulario="clientes"> <BotonAcciones texto="Cancelar" accion={ ( ) => { setModalVisible(false) }}></BotonAcciones> </RegistrarDatos> }
        </>
    );
}