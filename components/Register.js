import axios from "axios";
import React, { useState , useEffect , useRef} from 'react'
import { useAuth } from '../context/authContext'
// get the client

const Register = () => {
  const {  opcRegister,setopcRegister,handleChangeModal, currentUser : usuario,registerWithEmailAndPassword ,setcurrentUser,grabaUsuario} = useAuth();
  const [valores, grabaValores] = useState({
    nombre:"",
    apellido:"",
    correo: "",
    password: "",
    repepass:"",
    tel: "",
    localidad:"",
    role:"basico",
   
  });

  const idvalue = useRef('')
  const [error,setError] = useState("")

  const { nombre,apellido,correo, password,repepass, tel,localidad,role} = valores;

  const cambiar = (e) => {
    grabaValores({ ...valores, [e.target.name]: e.target.value });

  };


  const grabarfinal = async (e) => {
    e.preventDefault();

    try {

      // graba el usuario en Mysql  
      // 22.09.22 se agrega el uid que devuelve google
      //const res = await axios.post(
      //  "http://localhost:3000/api/correoPost",
      //  valores);

      const {user} = await registerWithEmailAndPassword(correo, password);

      setcurrentUser( user )
      
      try {

          // grabaValores({ ...valores, correo:user.uid});
          // const res = await axios.post(
          //   "http://localhost:3000/api/correoPost",
          //   valores);
          grabaUsuario( user.uid,valores)

 

      } catch (error) {
        console.log(error.message)        
      }

      setopcRegister(!opcRegister);

    } catch (error) {
      console.log(error.message);
      setError(error.message)

    }

  };
    
  return (
    <div className="w-full max-w-xs">
      <div className="mb-4">Registrarse</div>

      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={grabarfinal}
      >
        <div className="mb-4">
          {error && <p className=" text-red-500">{error}</p>}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre
          </label>
          <input
            className=" shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="nombre"
            value={nombre}
            onChange={(e) => cambiar(e)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Apellido
          </label>
          <input
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="apellido"
            value={apellido}
            onChange={(e) => cambiar(e)}
          />
        </div>

        <div className="mb-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Localidad
          </label>
          <input
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="localidad"
            value={localidad}
            onChange={(e) => cambiar(e)}
          />
        </div>

        <div className="mb-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tel.
          </label>
          <input
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="tel"
            value={tel}
            onChange={(e) => cambiar(e)}
          />
        </div>

        <div className="mb-2 mt-2">
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

        <div className="mb-2 mt-2">
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

        <div className="mb-2 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Repetir password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="repepass"
            type="password"
            name="repepass"
            value={repepass}
            onChange={(e) => cambiar(e)}
          />
        </div>

        <div className="flex mt-10 justify-between">
          <button
            className=" bg-gray-400 px-2 py-2"
            onClick={() => setopcRegister(!opcRegister)}
          >
            Cancelar
          </button>

          <button className=" bg-gray-400 px-2 py-2">Aceptar</button>
        </div>
      </form>
    </div>
  );
  
}

export default Register