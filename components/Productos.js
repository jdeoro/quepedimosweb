//
//  LISTA DE TODOS LOS PRODUCTOS DE LA CATEGORIA SELECCIONADA.
//
import React from "react";
import Image from "next/image";
import { formatearDinero } from "../helpers";
import { useAuth } from "../context/authContext";
import { Input } from "postcss";

const Productos = ({ productos }) => {
  const { categoriaId, imagen, nombre, precio } = productos.data;
  const { id } = productos;

  const { handleChangeModal, setProductoActual, productoActual, currentUser: user } = useAuth();

  const SeleccionaProd = () => {
    setProductoActual({
      id,
      imagen,
      nombre,
      precio,
      alta: true,
    });
    handleChangeModal();
  };

  if (!productos)
    <div>
      <p>cargando...</p>
      return
    </div>;
  return (
    <>
      <div className="border p-3 ml-3">
        <Image
          width={400}
          height={500}
          src={`/assets/img/${imagen}.jpg`}
          alt={`${imagen}.jpg`}
        ></Image>

              
        <div className="p-5">
          <h3 className="text-2xl font-bold">{nombre}</h3>
          <p className="mt-5 font-black text-4xl text-amber-500">
            {formatearDinero(precio)}
          </p>
        </div>

        {
          user?.email
          ?
          <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 uppercase text-white w-full mt-5 p-3 font-bold"
          onClick={() => SeleccionaProd()}
        >
          Agregar
        </button>

          :
          <div className=" bg-indigo-300 w-1/2 mt-5 p-3 text-slate-300">Agregar</div>
        }


      </div>
      
    </>
  );
};

export default Productos;
