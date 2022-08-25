import { useEffect } from "react";
import { useState } from "react";
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta";


const EditarPerfil = () => {

    const { auth } = useAuth();
    const { actualizarPerfil } = useAuth()

    const [alerta, setAlerta] = useState({})


    console.log(auth.perfil._id)

    const handleSubmit = async e => {
        e.preventDefault()
        const nombreInput = document.querySelector('#nombre').value
        const webInput = document.querySelector('#web').value
        const emailInput = document.querySelector('#email').value
        const telefonoInput = document.querySelector('#telefono').value
        console.log(!emailInput)
        if (!emailInput === true || !nombreInput === true) {
            setAlerta({
                msg: 'El Nombre Y Email son obligatorios',
                error: true
            })
            return
        } else {
            const perfil = {
                _id: auth.perfil._id,
                nombre: nombreInput,
                email: emailInput,
                telefono: telefonoInput || null,
                web: webInput || null,
                __v: 0,
            }
           const resultado = await actualizarPerfil(perfil)
           setAlerta(resultado)
        }
    }

    const { msg } = alerta

    return (
        <>
            <AdminNav></AdminNav>
            <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Informacion aqui</span></p>

            <div className=" flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                    {msg && <Alerta alerta={alerta} />}

                    <form onSubmit={handleSubmit} action="">

                        <div className="my-3">
                           
                            <label className="uppercase font-bold text-gray-600" htmlFor="">Nombre</label>
                            <input id="nombre" type="text" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name="name" defaultValue={auth.perfil.nombre}
                            />

                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="">Sitio Web</label>
                            <input id="web" type="text" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name="web"
                                defaultValue={auth.perfil.web} />

                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="">Telefono</label>
                            <input id="telefono" type="text" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name="telefono"
                                defaultValue={auth.perfil.telfono} />

                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600" htmlFor="">Email</label>
                            <input id="email" type="text" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name="email"
                                defaultValue={auth.perfil.email}
                            />

                        </div>

                        <input className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase	font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800" value='Guardar Cambios' type="submit" />                    </form>

                </div>

            </div>
        </>

    )
}

export default EditarPerfil
