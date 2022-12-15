//
// listado de TODAS las categorias QUE HAYA EN LA BASE DATOS, a la izquierda de la pantalla.
//
import React from "react";
import { useAuth } from "../context/authContext";
import Image from "next/image";

const Categorias = ({ key, categoria }) => {
  const { handleClickCategoria, categoriaActual,productos } = useAuth();
  const { categoriaId, icono, nombre, activo } = categoria;

  const listadProductos = (categoriaId) =>{
    handleClickCategoria(categoriaId)
    //console.log(productos.length)
  }

  return (
    
    <div
      className={`${
        categoriaActual?.data.categoriaId === categoriaId ? "bg-amber-400" : ""
      } flex items-center gap-4 w-full  hover:bg-amber-400 `}
    >

      <button
        type="button"
        className="border p-5 w-full text-2xl font-bold hover:cursor-pointer flex items-center gap-4"
        onClick={() => listadProductos(categoriaId)}
      >
        <Image
          width={60}
          height={60}
          src={`/assets/img/icono_${icono}.svg`}
          alt="imagen iconos"
        />

        {nombre}
      </button>

    </div>
  );
};

export default Categorias;
