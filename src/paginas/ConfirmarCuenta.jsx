import { useEffect } from "react";
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta";
import { useRef } from "react";
import clienteAxios from "../config/axios";

export const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})


  const params = useParams();

  const { id } = params
  const shouldLog = useRef(true)
  useEffect(() => {



    const confirmarCuenta = async () => {
      if (shouldLog.current) {
        shouldLog.current = false;


        try {
          const { data } = await clienteAxios(`/veterinarios/confirmar/${id}`)
          setCuentaConfirmada(true)
          setAlerta({
            msg: data.msg,
          })
        } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          })
        }

        setCargando(false)

      }
    }
    confirmarCuenta();
  }, [])

  return (
    <>
      <div><h1 className=" text-indigo-600 font-black text-6xl">Confirma tu Cuenta y Comienza a Administrar tus <span className=" text-black">Pacientes</span></h1></div>


      <div className="mt-20 md:mt-36 p-6 shadow-lg rounded-xl bg-white">
        {!cargando &&
          <Alerta
            alerta={alerta}
          />}
        {cuentaConfirmada &&
          <Link
            className='block text-center my-5 text-gray-500'
            to='/'
          >Iniciar Sesión</Link>}
      </div>
    </>
  )
}
