import { Fragment } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const OlvidePassword = () => {

    const [recuperarPassword, setRecuperarPassword] = useState('')

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async function (e) {
        e.preventDefault()

        if (recuperarPassword === '') {
            setAlerta({
                msg: 'El Email es Obligatorio',
                error: true
            })
            return
        }
        try {
            const { data } = await clienteAxios.post('/veterinarios/olvidepassword', { email: recuperarPassword })
            setAlerta({
                msg: data.msg,
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }
    const { msg } = alerta

    return (
        <>
            <div><h1 className=" text-indigo-600 font-black text-6xl">Recupera tu Acceso y no Pierdas tus <span className=" text-black">Pacientes</span></h1></div>

            <div className="mt-20 md:mt-36 p-6 shadow-lg rounded-xl bg-white">
                {msg && <Alerta

                    alerta={alerta}
                />}
                <form action="">
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Email</label>
                        <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Email de Registro" type="email" name="" id=""
                            value={recuperarPassword}
                            onChange={e => setRecuperarPassword(e.target.value)}
                        />



                    </div>
                    <input className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase	font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" value='Enviar Instrucciones' type="submit"
                        onClick={handleSubmit}
                    />




                </form>
                <nav className=" mt-10 lg:flex lg:justify-between">
                    <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                    <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tiene una cuenta? Registrate</Link>

                </nav>
            </div>
        </>

    )
}

export default OlvidePassword