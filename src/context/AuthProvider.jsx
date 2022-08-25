import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import { useRef } from "react";


const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})
    const shouldLog = useRef(true)
    useEffect(() => {
        const autenticarUsuario = async () => {
            if (shouldLog.current) {
                shouldLog.current = false;
                const token = localStorage.getItem('token')
                if (!token) {
                    setCargando(false)
                    return
                }

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                try {
                    const { data } = await clienteAxios('/veterinarios/perfil', config)

                    setAuth(data)
                } catch (error) {
                    setAuth({})

                }
                setCargando(false)

            }
        }
        autenticarUsuario();
    }, [cargando])


    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async (datos) => {
        const token = localStorage.getItem('token')
        if (!token) {
            setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const { data } = await clienteAxios.put(url, datos, config)
            return {
                msg: 'Cambios Realizados Correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token')
        if (!token) {
            setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = '/veterinarios/actualizar-password'
            const { data } = await clienteAxios.put(url, datos, config)
            return {
                msg: 'Cambios Realizados Correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider

            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext

