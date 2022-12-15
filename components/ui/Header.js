//  Listado de categorias 
import React from "react";
import Image from "next/image";
import Categorias from "../Categorias";
import { useAuth } from "../../context/authContext";
import Menu from "../Menu";
import Productos from "../Productos";
//import Login from "../Login";
//import Register from "../Register";

const Header = () => {

  const { currentUser: user, categorias , opcLogin, setopcLogin,
    logout ,loading,opcRegister,setopcRegister,mensajeToast} = useAuth();

  if (!categorias)
    <div>
      <p>cargando...</p>
      return
    </div>;

  const salir = () => { 
    try {
      
      logout();
      mensajeToast("Ha salido del sistema...");
      

    } catch (error) {
      console.log(error);
    }
  }

  if (loading) return <p>Cargando...</p>


  return (
    <>
      <div className=" flex flex-nowrap justify-between">
        { user ? (
          <p className="md:text-lg text-emerald-400 lg:text-sm xl:text-sm text-bold">Bienvenido:{user?.email} </p>
        ) : (
          <p className=" text-red-300 flex lg:text-sm xl:text-sm text-bold">Usuario:No Autenticado</p>
        )}

        {user ? (
          <div className=" block ">
            <button
              className=" ml-2 mt-2 underline"
              onClick={() => salir()}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className=" block ">
            <button
              className=" ml-2 mt-2 underline"
              onClick={() => setopcLogin(!opcLogin)}
            >
              Login
            </button>
            <button
             onClick={() =>setopcRegister(!opcRegister)}
             className=" ml-2 mt-2 underline">Registrarse</button>
          </div>
        )}
      </div>

      <logo className=" ml-16">
        <Image
          src="/assets/img/logo.svg"
          height={100}
          width={100}
          alt="imagen logo"
        />
      </logo>

      <div className="flex justify-center">
        <Menu />
      </div>

      <nav className="block">
        {categorias.map((categ) => (
          <Categorias key={categ.id} categoria={categ.data} />
        ))}
      </nav>

      {/* { (opcLogin && !opcRegister) && <Login />} */}

      {/* { (opcRegister && !opcLogin) && <Register />} */}
    </>
  );
};

export default Header;
