export default function BotonAcciones( {texto , className , accion} ) {
    return (
        <button onClick={accion} className={`${className} font-medium rounded-full py-1 relative overflow-hidden border px-3 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full flex items-center group border-white bg-white hover:text-white text-black before:bg-neutral-900 hover:shadow-white justify-center mt-4`}>
			<span className="z-10"> { texto } </span>  
		</button>
    );
}