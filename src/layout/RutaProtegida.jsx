import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegida = () => {
    const { auth, cargando } = useAuth();


    if (cargando) return 'Cargando...'
 

    
    
    return (
        <>
            <Header></Header>
            {auth.perfil?._id ? (<main className="container mx-auto mt-10"> <Outlet></Outlet></main>) : <Navigate to='/' />}
            <Footer></Footer>
        </>
    )
}

export default RutaProtegida