import axios from "axios";
import { useEffect, useState } from "react";
import BotonAcciones from "../Boton";

export default function ActualizarDatos({ formulario , children , registroSeleccionado }) {

    const [ form , setForm ] = useState({});

    useEffect(() => {
        if ( registroSeleccionado ) {
            if ( registroSeleccionado?.cliente?.cedula && registroSeleccionado?.vehiculo?.placa ) {
                registroSeleccionado.cliente = registroSeleccionado.cliente.cedula;
                registroSeleccionado.vehiculo = registroSeleccionado.vehiculo.placa;
            }
            setForm(registroSeleccionado);
        }
    }, [ registroSeleccionado ]);

    const handleChange = ( e ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault(); 
        try {
            if (formulario === "reservas") {
                try {
                    const respuesta = await axios.put(`${process.env.REACT_APP_BACKEND}/${formulario}`,
                    form,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    window.parent.location = window.parent.location.href;
                } catch (error) {
                    console.log("No se pudo actualizar la informacion: ", error);
                }
            }
            else{
                const respuesta = await axios.put(`${process.env.REACT_APP_BACKEND}/${formulario}/${registroSeleccionado._id}` , form , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                window.parent.location=window.parent.location.href;
            }
        } catch (error) {
            console.error("ERROR al enviar los datos: ", error);
        }
    }

	return (
		<div className="flex justify-center items-center backdrop-blur-sm bg-black/25 inset-0 m-auto absolute z-10">

            <form className="flex flex-col gap-6 backdrop-blur-sm bg-black/10 z-20 items-center border rounded-lg w-1/2 overflow-y-scroll p-5 h-96" onSubmit={handleSubmit}>
                <h1 className="text-white text-3xl" > Actualización de {formulario || "Usuarios"} </h1>
                <hr className="border border-white w-full" /> 
                { Object.keys(form).map(( input ) => {
                    if ( input === "genero" ) {
                        return(
                            <div className="relative w-4/5">
                                <select className="bg-transparent w-full rounded-full border-2 text-white py-1 pr-3 pl-8 placeholder:text-white focus:outline-none autofill:bg-transparent" 
                                name={input} value={form[input] || ""} onChange={handleChange}
                                >
                                    <option value="">Genero</option>
                                    <option className="text-black" value="Hombre"> Hombre </option>
                                    <option className="text-black" value="Mujer"> Mujer </option>
                                    <option className="text-black" value="Prefiero no decirlo"> Prefiero no decirlo </option>
                                </select>
                            </div>
                        )
                    }
                    return (

                        <div key={input} className="relative w-4/5">
                            <input
                                className="bg-transparent w-full rounded-full border-2 text-white py-1 pr-3 pl-8 placeholder:text-white focus:outline-none autofill:bg-transparent"
                                placeholder={ input }
                                type={ form[input] }
                                name={ input }
                                value={form[input] || ""}
                                onChange={handleChange}
                            />
                        </div>
                            
                    );
                })}
                <div className="flex gap-3" >
                    <BotonAcciones texto="Actualizar"></BotonAcciones>
                    { children }
                </div>
            </form>
		</div>
	);
}
