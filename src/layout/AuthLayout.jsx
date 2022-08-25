import { Fragment } from "react"
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (//Lo que hace outlet es injectar contenido del componente principal que esten dentro del mismo route
    <Fragment>

        <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-12 p-5 items-center">
        <Outlet>
                
        </Outlet>
        </main>

    </Fragment>
  )
}

export default AuthLayout