import { Link } from "react-router-dom"


const AdminNav = () => {
    return (
        <nav className="flex justify-evenly">
            <Link className="font-bold uppercase text-gray-500 hover:text-indigo-500" to='/admin/perfil'>Editar Perfil</Link>
            <Link className="font-bold uppercase text-gray-500 hover:text-indigo-500" to='/admin/cambiar-password'>Cambiar Password</Link>
        </nav>
    )
}

export default AdminNav