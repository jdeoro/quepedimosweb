//
//   MUESTRA CADA UNO DE LOS PRODUCTOS SELECCIONADOS. SE PUEDE CAMBIAR LAS CANTIDADES .
// CHANGO del pedido, muestra los productos que forman parte del pedido
//
import React, { useEffect } from "react";
import Image from "next/image";
import { useAuth } from "../context/authContext";
import Pedidos from "./Pedidos";
import { useRouter } from "next/router";

const ChangoElementos = ({ registro }) => {
  const router = useRouter();

  const { id, nombre, cantidad, imagen, precio } = registro;

  const {
    pedido,
    updatePedidos,
    handleChangeModal,
    setProductoActual,
    productoActual,
  } = useAuth();

  // COMO PUEDE SER QUE HAYA PRODUCTOS CON CANTIDAD = 0   // PORQUE QUIZAS PASO POR EDICION Y SACO EL PRODUCTO
  // SE HACE EL FILTRADO FINAL y SE VUELVE AL ELEMENTO 'chango.js' QUE ES EL QUE LISTA LOS PEDIDOS
  useEffect(() => {
    updatePedidos();
    router.push("/chango");
  }, []);

  const SeleccionaProd = () => {
    setProductoActual({
      id,
      imagen,
      nombre,
      precio,
      alta: false,
    });
    handleChangeModal();
  };

  return (
    <>
      <div className=" ml-3 shadow mr-2 mb-3">
        <div className="py-3 px-2 ">
          <Image
            width={200}
            height={300}
            src={`/assets/img/${imagen}.jpg`}
          ></Image>
          <p className="text-2xl font-bold">{nombre}</p>
        </div>

        <div className=" ml-3">
          <div className="mt-2 flex w-1/3 justify-between">
            {/* boton que permite cambiar producto */}
            <button
              onClick={() => SeleccionaProd()}
              className="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700 mr-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            {" cambiá tu pedido "}
          </div>
        </div>

        <div className="mt-3 ml-3 mb-5 text-base font-medium">
          Cantidad:{cantidad}
        </div>
      </div>
    </>
  );
};

export default ChangoElementos;
