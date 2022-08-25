import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth"

const PacientesContext = createContext()

const PacientesProvider = ({ children }) => {
    const [pacientes, setPacientes] = useState([])

    const [paciente, setPaciente] = useState({})

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }

                }
                const { data } = await clienteAxios('/pacientes', config)
                setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes();
    }, [])
    const { auth } = useAuth();
    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token')

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

                const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)

                setPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error)
            }
        } else {
            paciente.veterinario = auth.perfil._id


            try {

                const { data } = await clienteAxios.post('/pacientes', paciente, config)


                //elimina infomracion de data y la guarda la informacion no eliminada en pacienteAlmacenado
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data

                setPacientes([pacienteAlmacenado, ...pacientes])

            } catch (error) {
                console.log(error.response.data.msg)
            }
        }


    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async (id) => {
        const confirmar = confirm('¿Deseas Eliminar este Paciente?')
        const token = localStorage.getItem('token')

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (confirmar) {
            try {
                const data = await clienteAxios.delete(`pacientes/${id}`,config)
                console.log(data)
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (

        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}

        </PacientesContext.Provider>

    )
}

export {
    PacientesProvider
}

export default PacientesContext