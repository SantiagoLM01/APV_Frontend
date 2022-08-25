import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"


const CambiarPassword = () => {

  const {guardarPassword} = useAuth();
  const [alerta, setAlerta] = useState({})

  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: '',
    pwd_nuevo_repetido: ''
  })

  

  const handleSubmit = async e => {
    e.preventDefault()

    if(Object.values(password).some(campo => campo === '')){
      setAlerta({
        msg: 'Todos los campos con obligatorios',
        error: true
      })
      return
    }
    if(password.pwd_nuevo !== password.pwd_nuevo_repetido){
      setAlerta({
        msg: 'El password nuevo no coincide con el password nuevo repetido',
        error: true
      })
      return
    }

    const resultado = await guardarPassword(password)
    setAlerta(resultado)
  }
  const { msg } = alerta
  return (
    <>
      <AdminNav></AdminNav>
      <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Password aqui</span></p>
      <div className=" flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

          {msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit} action="">

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600" htmlFor="">Password Actual</label>
              <input type="password" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name="pwd_actual"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />

            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600" htmlFor="">Nuevo Password </label>
              <input type="password" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name="pwd_nuevo" onChange={e => setPassword({
                ...password,
                [e.target.name]: e.target.value
              })} />

            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600" htmlFor="">Repetir Nuevo Password</label>
              <input type="password" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name="pwd_nuevo_repetido" onChange={e => setPassword({
                ...password,
                [e.target.name]: e.target.value
              })} />

            </div>


            <input className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase	font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800" value='Guardar Cambios' type="submit" />                    </form>

        </div>

      </div>
    </>
  )
}

export default CambiarPassword