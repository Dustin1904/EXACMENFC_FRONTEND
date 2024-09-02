import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BotonAcciones from "./components/Boton";

export default function PantallaLogin() {

    const navigate = useNavigate();

	const [form, setForm] = useState({
		email: "",
		password: "",
	}); // Use State sirve para inicializar la variable que trabajara con los datos

	const handleChange = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	const [ojo, setOjo] = useState(false); // UsteState es como inicia la variable (numerica, texto, booleano, etc)

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.post(`${process.env.REACT_APP_BACKEND}/login`,form);
            console.log(respuesta.data);
			localStorage.setItem("token" , respuesta.data.token)
            navigate("/dashboard/perfil");
        } catch (error) {
            console.log( error);
        }
    }

	return (
		<main className="bg-[url('https://elcomercio.pe/resizer/6XqsG2CAdwMjWOAAm7J_t1B6HoA=/1920x768/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/GZDEHTLXKZA6VDR4MHFLO7XIII.jpg')] min-h-screen bg-cover bg-center flex justify-center items-center">
			<form
				className="flex flex-col gap-6 backdrop-blur-sm bg-white/10 md:w-2/5 sm:w-1/2 lg:w-2/6 xl:w-1/4 w-3/4 h-96 justify-center items-center border rounded-lg"
				action=""
                onSubmit={handleSubmit}
			>
				<h1 className="text-3xl font-bold text-white"> Iniciar Sesión </h1>
				<div className="relative w-4/5">
					<input
						className="bg-transparent w-full rounded-full border-2 text-white py-1 pr-3 pl-8 placeholder:text-white focus:outline-none autofill:bg-transparent"
						placeholder="Usuario"
						type="email"
						name="email"
						onChange={handleChange}
					/>
					<svg
						className="absolute inset-y-0 my-auto left-2 stroke-white"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
						<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
					</svg>
				</div>
				<div className="relative w-4/5">
					<input
						className="bg-transparent w-full rounded-full border-2 text-white py-1 pr-0 pl-8 placeholder:text-white focus:outline-none"
						placeholder="Contraseña"
						type= { ojo ? "text" : "password"} // Con la variable ojo se puede cambiar el tipo de input para la contraseña
						name="password"
						onChange={handleChange}
					/>
					<svg
						className="absolute inset-y-0 my-auto left-2 stroke-white"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
						<path d="M8 11v-4a4 4 0 1 1 8 0v4" />
						<path d="M15 16h.01" />
						<path d="M12.01 16h.01" />
						<path d="M9.02 16h.01" />
					</svg>
					{ojo ? (
						<svg
                        className="absolute inset-y-0 my-auto right-2 stroke-white"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
                            onClick={ () => setOjo(false) }
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
							<path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
							<path d="M3 3l18 18" />
						</svg>
					) : (
						<svg
                            className="absolute inset-y-0 my-auto right-2 stroke-white"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
                            onClick={ () => setOjo(true) }
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
							<path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
						</svg>
					)}
				</div>
				<BotonAcciones texto="Iniciar Sesión" className="w-4/5"></BotonAcciones>
			</form>
		</main>
	);
}
