import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"


const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const { guardarPaciente, paciente } = usePacientes()


    useEffect(() => {
        if (paciente?._id) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    const handleSubmit = function (e) {
        e.preventDefault()
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({ msg: 'Hay Campos Vacios', error: true })
            return;
        }
        setAlerta({})
        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })
        setAlerta({
            msg: 'Guardado Correctamente'
        })
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId(null)
        return
    }
    const { msg } = alerta

    return (
        <>
            <h2 className=" font-black text-3xl text-center">Administrador de Pacientes</h2>

            <p className=" text-xl mt-5 mb-10 text-center">Añade tus <span className=" text-indigo-600 font-bold">Pacientes y Administralos</span></p>
            {msg && <Alerta

                alerta={alerta}
            />}

            <form id='form' onSubmit={handleSubmit} className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md" action="">
                <div>
                    <label htmlFor="mascota" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre de la Mascota" type="text" name="" id="mascota" value={nombre}
                        onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mt-2">
                    <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
                    <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre del Propietario" type="text" name="" id="propietario" value={propietario}
                        onChange={(e) => setPropietario(e.target.value)} />
                </div>
                <div className="mt-2">
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email</label>
                    <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Tu Email" type="email" name="" id="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mt-2">
                    <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
                    <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre del Propietario" type="Date" name="" id="fecha" value={fecha}
                        onChange={(e) => setFecha(e.target.value)} />
                </div>
                <div className="mt-2">
                    <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Sintomas</label>
                    <textarea className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Sintomas" name="" id="sintomas" value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)} />
                </div>
                <input className="bg-indigo-600 w-full p-3 text-white uppercase	 font-bold hover:bg-indigo-700 cursor-pointer rounded-md transition-colors mt-2" type="submit" value={id ? 'Guardar Cambios' : 'Agregar Paciente'} />
            </form>
        </>
    )
}

export default Formulario