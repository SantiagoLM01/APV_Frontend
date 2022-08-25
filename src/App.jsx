import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout.jsx'
import RutaProtegida from './layout/RutaProtegida.jsx'
import Login from './paginas/Login.jsx'
import AdministrarPacientes from './paginas/AdministrarPacientes.jsx'
import Registrar from './paginas/Registrar.jsx'
import EditarPerfil from './paginas/EditarPerfil.jsx'
import CambiarPassword from './paginas/CambiarPassword.jsx'
import OlvidePassword from './paginas/OlvidePassword.jsx'
import { ConfirmarCuenta } from './paginas/ConfirmarCuenta.jsx'
import NuevoPassword from './paginas/NuevoPassword.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { PacientesProvider } from './context/PacientesProvider.jsx'

function App() {


  return (// path indica la pagina element el componente que se esta cargando e index toma el index de la ruta y carga el contenido de login
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>

            <Route path="/" element={<AuthLayout></AuthLayout>}>

              <Route index element={<Login></Login>}></Route>
              <Route path="registrar" element={<Registrar></Registrar>}></Route>
              <Route path="olvidepassword" element={<OlvidePassword></OlvidePassword>}></Route>
              <Route path="olvidepassword/:token" element={<NuevoPassword></NuevoPassword>}></Route>
              <Route path="confirmar/:id" element={<ConfirmarCuenta></ConfirmarCuenta>}></Route>


            </Route>
            <Route path='/admin' element={<RutaProtegida></RutaProtegida>}>
              <Route index element={<AdministrarPacientes></AdministrarPacientes>}></Route>
              <Route path='perfil' element={<EditarPerfil></EditarPerfil>}></Route>
              <Route path='cambiar-password' element={<CambiarPassword></CambiarPassword>}></Route>



            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>

    </BrowserRouter>
  )
}

export default App
