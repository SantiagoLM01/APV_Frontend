import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"
import { Link } from "react-router-dom"

const NuevoPassword = () => {

  const [password, setPassword] = useState('')

  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({})

  const [tokenValido, setTokenValido] = useState(false)

  const [passwordModificado, setPasswordModificado] = useState(false)




  const params = useParams();
  const { token } = params
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvidepassword/${token}`)
        setAlerta({
          msg: 'Coloca tu Nuevo Password',
        })
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        })
      }
    }
    comprobarToken();
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Los Password No Coinciden',
        error: true
      })
      return
    } else if (password === '' || repetirPassword === '') {
      setAlerta({
        msg: 'Todos los Campos Son Obligatorios',
        error: true
      })
      return
    }
    try {
      const url = `/veterinarios/olvidepassword/${token}`
      const { data } = await clienteAxios.post(url, { password })
      setAlerta({
        msg: data.msg,

      })
      setPasswordModificado(true)
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

        {tokenValido && (

          <>

            <form onSubmit={handleSubmit} >
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Nuevo Password</label>
                <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Tu Nuevo password" type="password" name="" id=""
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />



              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">Repetir Nuevo Password</label>
                <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Repite tu nuevo password" type="password" name="" id=""
                  value={repetirPassword}
                  onChange={e => setRepetirPassword(e.target.value)}
                />



              </div>

              <input className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase	font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" value='Guardar Nuevo Password' type="submit" />




            </form>

            {passwordModificado && (
              <nav className=" mt-10 lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/">Inicia Sesión</Link>

              </nav>
            )}
          </>
        )}

      </div>

    </>


  )
}

export default NuevoPassword