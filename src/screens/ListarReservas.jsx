import BotonAcciones from "./components/Boton";
import TablaRegistros from "./components/tabla";
import { useState } from "react";
import RegistrarDatos from "./components/modals/Registrar";

export default function ListarTick() {

    const [ modalVisible , setModalVisible ] = useState(false);

    return(
        <> 
            <BotonAcciones texto="Registrar Reservas" accion={ ( ) => { setModalVisible(true) }}></BotonAcciones>
            <TablaRegistros registros="reservas"></TablaRegistros>
            { modalVisible && <RegistrarDatos formulario="reservas"> <BotonAcciones texto="Cancelar" accion={ ( ) => { setModalVisible(false) }}></BotonAcciones> </RegistrarDatos> }
        </>
    );
}