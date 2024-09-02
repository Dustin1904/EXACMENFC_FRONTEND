import { useEffect, useState } from "react";
import axios from "axios";
import BotonAcciones from "./Boton";
import ActualizarDatos from "./modals/Actualizar";
import { useNavigate } from "react-router-dom";

export default function TablaRegistros({ registros , informacion = [] , className , mostrarAcciones = true }) {
	const [modalVisible, setModalVisible] = useState(false);

	const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

	const [datos, setDatos] = useState([]);

	const [columnas, setColumnas] = useState([]);

	const navigate = useNavigate();

	const handleGetData = async () => {
		if (informacion.length !== 0) {
			setDatos(informacion)
			const columnasSinId = Object.keys(informacion[0]).filter(
				(columna) => columna !== "_id"
			);
			setColumnas([...columnasSinId]);
			return
		}
		try {
			const respuesta = await axios.get(
				`${process.env.REACT_APP_BACKEND}/${registros}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			//delete respuesta.data[0]._id;
			//const ticketsRecibidos = Object.keys(respuesta.data[0]);
			//setColumnas(columnasSinId);
			//setDatos(informacion)
			const columnasSinId = Object.keys(respuesta.data[0]).filter(
				(columna) => columna !== "_id"
			);
			setColumnas([...columnasSinId]);
			setDatos(respuesta.data);
		} catch (error) {
			console.log(error);
		}
	};

	const formatearFecha = (fecha) => {
		const nuevaFecha = new Date(fecha);
		nuevaFecha.setMinutes(
			nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset()
		);
		return new Intl.DateTimeFormat("es-EC", { dateStyle: "long" }).format(
			nuevaFecha
		);
	};

	const handleEdit = (dato) => {
		setRegistroSeleccionado(dato);
		setModalVisible(true);
	};

	const handleDelete = async (dato) => {
		//const confirmar = confirm("Confirma, Quieres realizar esta acción??");
		//if (confirmar) {
			try {
				const respuesta = await axios.delete(
					`${process.env.REACT_APP_BACKEND}/${registros}/${dato._id}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				setDatos(datos.filter((item) => item._id !== dato._id));
				console.log("Informacion eliminada con éxito");
			} catch (error) {
				console.log("ERROR al eliminar la información: ", error);
			}
		//}
	};

	useEffect(() => {
		handleGetData();
	}, []);

	return (
		<div className={`${className} w-3/4 overflow-x-auto overflow-hidden`}>
			{datos.length > 0 ? (
				<table className="backdrop-blur-sm bg-white/10 border-2 border-white rounded-lg mx-auto">
					<thead className="rounded-t-lg bg-white/20">
						<tr>
							{columnas.map((columna, index) => (
								<th
									key={index}
									className={`px-4 py-2 ${index === 0 ? "rounded-tl-lg" : ""} ${
										index === columnas.length - 1 ? "rounded-tr-lg" : ""
									}`}
								>
									{columna}
								</th>
							))}
							{ mostrarAcciones && (
								<th> Acciones </th>
							)}
						</tr>
					</thead>
					<tbody className="">
						{datos.map((dato, index) => (
							<tr
								key={index}
								className={index === datos.length - 1 ? "rounded-b-lg" : ""}
							>
								{columnas.map((columna, colIndex) => (
									<td
										key={colIndex}
										className="px-4 py-2 whitespace-nowrap text-center"
									>
										{typeof dato[columna] === "object" &&
										dato[columna] !== null ? (
											<>
												{" "}
												{dato[columna].nombre} {dato[columna].apellido}{" "}
											</>
										) : columna.includes("fecha") ? (
											formatearFecha(dato[columna])
										) : (
											dato[columna]
										)}
									</td>
								))}
								{mostrarAcciones && (
									<td className="flex">
										<BotonAcciones texto="Ver" accion={() => {navigate(`/dashboard/visualizar/${registros}/${dato._id}`)}}></BotonAcciones>
										<BotonAcciones
											texto="Editar"
											accion={() => {
												handleEdit(dato);
											}}
										></BotonAcciones>
										<BotonAcciones
											texto="Eliminar"
											accion={() => {
												handleDelete(dato);
											}}
										></BotonAcciones>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="flex flex-col gap-6 backdrop-blur-sm bg-white/10 justify-center items-center border rounded-lg"> No existen registros en la base de datos </div>
			)}
			{modalVisible && (
				<ActualizarDatos
					registroSeleccionado={registroSeleccionado}
					formulario={registros}
					setModalVisible={setModalVisible}
				>
					{" "}
					<BotonAcciones
						texto="Cancelar"
						accion={() => {
							setModalVisible(false);
						}}
					></BotonAcciones>
				</ActualizarDatos>
			)}
		</div>
	);
}
