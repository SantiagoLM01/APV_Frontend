import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
const Header = () => {

    const {cerrarSesion} = useAuth()
    return (
        <>
            <header className="py-10 bg-indigo-600">
              <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <h1 className="font-bold text-2xl text-indigo-200 text-center lg:ml-20 2xl:ml-0" >Administrador de Pacientes de <span className="text-white font-black"> Veterinaria</span></h1>
                <nav className="flex flex-col lg:flex-row text-center mt-4 lg:mt-0">
                    <Link to='/admin' className="text-white text-sm uppercase font-bold hover:text-indigo-300 lg:mr-4">Pacientes</Link>
                    <Link to='/admin/perfil' className="text-white text-sm uppercase font-bold hover:text-indigo-300 mt-4 lg:mt-0 lg:mr-4">Perfil</Link>
                    <button type="button" className="text-white text-sm uppercase font-bold hover:text-indigo-300 mt-4 lg:mt-0 lg:mr-20 2xl:mr-0"
                    onClick={cerrarSesion}>
                        Cerrar Sesión
                    </button>
                </nav>
              </div>
            </header>
        </>
    )
}

export default Header