import ListadoPacientes from "../components/ListadoPacientes.jsx"
import Formulario from "../components/Formulario.jsx"
import { useState } from "react"
const AdministrarPacientes = () => {

    const [mostrarFormulario, setMostrarFormulario] = useState(false)
   

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <button type="button" className="bg-indigo-700 p-3 rounded-md text-white uppercase font-bold mb-5 hover:cursor-pointer hover:bg-indigo-800 md:hidden" onClick={() => setMostrarFormulario(!mostrarFormulario)}>{mostrarFormulario ? 'Ocultar Formulario'  : 'Mostrar Formulario'}</button>

                <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`} ><Formulario></Formulario></div>

                <div className="md:w-1/2 lg:w-3/5"><ListadoPacientes></ListadoPacientes></div>


            </div>
        </>
    )
}

export default AdministrarPacientes