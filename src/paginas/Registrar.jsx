
import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

    const [alerta, setAlerta] = useState({})


    const handleSubmit = async function (e) {
        e.preventDefault()
        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({ msg: 'Hay Campos Vacios', error: true })
            return;
        }
        if (password !== repetirPassword) {
            setAlerta({ msg: 'Los passwords no son iguales', error: true })
            return;

        }
        if (password.length < 6) {
            setAlerta({ msg: 'El password es muy corto, minimo 6 caracteres', error: true })
            return;


        }
        
        //Crear el Usuario en la API

        try {
            const respuesta = await clienteAxios.post(`/veterinarios`, {nombre,email,password})
            console.log(respuesta)
            setAlerta({
                msg:'Registrado Correctamente, revisa tu email',
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error:true
            })
        }

    }
    const {msg} = alerta






    return (
        <>
            <div><h1 className=" text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra tus <span className=" text-black">Pacientes</span></h1></div>

        
            <div className="mt-20 md:mt-36 p-6 shadow-lg rounded-xl bg-white">
           {msg && <Alerta 
               
                alerta={alerta}
           />}
                <form action="" onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Nombre</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Tu Nombre" type="text" name="" id=""
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />



                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Email</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Email de Registro" type="email" name="" id=""
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />



                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Password</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Tu password" type="password" name="" id=""
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />



                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Repetir Password</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Repite tu password" type="password" name="" id=""
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                        />



                    </div>

                    <input className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase	font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" value='Registrarse' type="submit" />




                </form>
                
                <nav className=" mt-10 lg:flex lg:justify-between">
                    <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>

                </nav>
            </div>
        </>
    )
}

export default Registrar