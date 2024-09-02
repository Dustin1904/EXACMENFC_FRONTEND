import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TablaRegistros from "./components/tabla";

export default function VisualizarEspecificData( ) {

    const [ datos , setDatos ] = useState({});

    const [ ticketsRelacionados , setTicketsRelacionados ] = useState([]);

    const params = useParams();

    const getData = async ( ) => {  
        try {
            const respuesta = await axios.get(`${process.env.REACT_APP_BACKEND}/${params?.formulario}/${params?.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(respuesta.data);
            
            
            if (params?.formulario === "reservas") {
                setDatos(respuesta.data)
            }else if ( params?.formulario === "clientes" ){
                setDatos({...respuesta.data.cliente , reservas: respuesta.data.reserva});
            }else if ( params?.formulario === "vehiculos"){
                setDatos({...respuesta.data.vehiculo, reservas: respuesta.data.reserva});
            }
            
            console.log(ticketsRelacionados);

        } catch (error) {
            console.error("ERROR, aparte del programador: ", error);
        }

    }

    const formatearFecha = (fecha) => {
		const nuevaFecha = new Date(fecha);
		nuevaFecha.setMinutes(
			nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset()
		);
		return new Intl.DateTimeFormat("es-EC", { dateStyle: "long" }).format(
			nuevaFecha
		);
	};

    useEffect(() => { 
        getData();
    }, [ ]);

    return(
        <div className="flex flex-col gap-3 backdrop-blur-sm bg-black/50 w-3/4 justify-center p-4 border rounded-lg" >
            <h1 className="text-white"> Visualizar datos de {datos.nombre ? "cliente " + datos.nombre : datos.placa ? "vehiculo " + datos.placa : "reserva " + datos.codigo} </h1>
            <hr />
            {Object.keys(datos).map(( dato ) => {
                if ( dato.includes("id") ) return;
                if (dato === "cliente" || dato === "vehiculo") {
                    return(
                        <TablaRegistros className="w-full text-white" key={dato} informacion={[datos[dato]]} mostrarAcciones={false} columnaAcciones={false} ></TablaRegistros>
                    )
                }
                if (dato === "reservas") {
                    return(
                        <TablaRegistros className="w-full text-white" informacion={datos[dato]} mostrarAcciones={false}></TablaRegistros>
                    )
                }
                return(
                    <div className="text-white" key={dato}>
                        <strong> {dato} </strong>
                        <span> {dato.includes("fecha") ? formatearFecha(datos[dato]) : datos[dato] } </span>
                    </div>
                )
            })
        }
        </div>
    );
}