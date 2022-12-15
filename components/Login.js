import React, { useState } from 'react'
import { useAuth } from '../context/authContext'

const Login = () => {
  const {  opcLogin, setopcLogin,login,handleChangeModal, currentUser : usuario,mensajeToast } = useAuth();

  const [valores, grabaValores] = useState({
    correo: "",
    password: "",
  });

  const [error,setError] = useState("")

  const { correo, password } = valores;

  const cambiar = (e) => {
    grabaValores({ ...valores, [e.target.name]: e.target.value });

  };

  const grabarfinal = async (e) => {
    e.preventDefault();

    try {
      const {user} = await login(correo, password);
      setopcLogin(!opcLogin)
      mensajeToast("Has ingresado al sistema!")
      console.log(user.uid)

    } catch (error) {
      console.log(error.message);
      setError(error.message)

    }

  };
    
  return (
        <div className='w-full max-w-xs mx-auto flex-1'>
            <div className='
            flex flex-col
             space-y-4 text-center text-blue-400 font-bold text-xl'>Login</div>
            <form
                onSubmit={grabarfinal}
            >

            <div className='mb-2 mt-2'>

            {error && <p className=' text-red-500'>{error}</p>}

            <label className="block text-gray-700 text-sm font-bold mb-2">
              correo
            </label>
                <input
                className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"                
                type="email"
                name="correo"
                value={correo}
                onChange={(e) => cambiar(e)}
                 />    
            </div>

            <div className='mb-2 mt-2'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  password
                </label>
                <input
                 className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                 id="password"
                 type="password"
                 name="password"
                 value={password}
                 onChange={(e) => cambiar(e)}
                 />    
            </div>

            <div className='flex mt-10 justify-between'>

                <button className=' bg-gray-400 px-2 py-2'
                 onClick={ () =>  setopcLogin(!opcLogin)  }>
                Cancelar</button>

                <button className=' bg-gray-400 px-2 py-2'
                >
                Aceptar</button>

            </div>


            </form>


        </div>

    )
  
}

export default Login