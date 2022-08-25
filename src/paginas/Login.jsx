import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"
import clienteAxios from "../config/axios"
import { useNavigate } from "react-router-dom"
const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

    const {setAuth} = useAuth();

    const navigate = useNavigate();

  const handleSubmit = async function (e) {
    e.preventDefault()
    if ([email, password].includes('')) {
      setAlerta({ msg: 'Hay Campos Vacios', error: true })
      return;
    }

    //Crear el Usuario en la API

    try {
      const { data } = await clienteAxios.post(`/veterinarios/login`, { email, password })
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/admin')
      window.location.reload() //SALVADOR SIUUUUU Para autenticar y recargar la pagina para asi poder tener un token disponible junto con toda la informacion
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      return
    }
    

  }

 
  const { msg } = alerta


  return (
    <>
      <div><h1 className=" text-indigo-600 font-black text-6xl">Inicia Sesión y Administra tus <span className=" text-black">Pacientes</span></h1></div>
      <div className="mt-20 md:mt-36 p-6 shadow-lg rounded-xl bg-white">

        {msg && <Alerta

          alerta={alerta}
        />}

        <form action="" onSubmit={handleSubmit}>
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

          <input className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase	font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" value='Iniciar Sesión' type="submit" />




        </form >

        <nav className=" mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tiene una cuenta? Registrate</Link>
          <Link className="block text-center my-5 text-gray-500" to="/olvidepassword">Olvide mi password</Link>

        </nav>

      </div>
    </>
  )
}

export{
  
}

export default Login