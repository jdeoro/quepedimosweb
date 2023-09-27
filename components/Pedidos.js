//
//  PRODUCTO A AGREGAR. VENTANA MODAL.
//
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "../context/authContext";
import { formatearDinero } from "../helpers";

const Pedidos = ({ producto }) => {
  const {
    handleChangeModal,
    handlePedido,
    pedido,
    registros,
    setRegistros,
    actualizarRegistros,
    productoActual,
    precio,
    setPrecio,
    
  } = useAuth();
  const [cantidad, setCantidad] = useState(0);

  // guarda si agrego ( true ) ó sacó (false) un producto.
  const [opc, setOpc] = useState(false);

  function verificaCantidad() {
    const cantidad = 0;
    if (pedido.categoriaId === producto.id) {
      cantidad = pedido.cantidad;
    }

    return cantidad;
  }

  const actualizaCantidad = () => {
    if (pedido.some((prod) => prod.id === producto.id)) {
      const buscarCantidad = pedido.find(
        (registro) => registro.id === producto.id
      );

      setCantidad(buscarCantidad.cantidad);
    }
  };

  useEffect(() => {
    actualizaCantidad();
  }, []);

  useEffect(() => {
    setRegistros(actualizarRegistros());
  }, [pedido, cantidad]);

  const grabarPedido = () => {
    try {
      
      handlePedido({ cantidad, ...producto });
      // esto se volviò a modificar para ver cambios
      if (opc) {
        // si el producto existe, entonces no le deberia
        // sumar el precio => setPrecio(producto.precio*cantidad)

        // deberia buscar el producto en el array pedido
        //  si lo encuentra, le suma ó le resta la cantidad 

        // saco el producto original que ya existia

        const total = pedido.filter(registro => (registro.id === producto.id ) 
         );
          setPrecio(precio + producto.precio * cantidad);

        console.log("id producto:",producto.id);
        console.log("producto.precio:",producto.precio);
        console.log(cantidad);
        console.log("precio:",precio);


        // 12.12.22 se cambió
        //        setPrecio(precio + producto.precio * cantidad);
      } else {
        setPrecio(precio - producto.precio);
      }

      setRegistros(
        pedido.map((ele) => {
          ele.cantidad;
        })
      );

      handleChangeModal(); 
      //console.log(precio)     
      
    } catch (error) {
      console.log(error);
      
    }


  };

  return (
    <>
      <div className="md:flex gap-10">
        <div className="flex text-2xl justify-start">
          <div>
            {/* icono close, cierra la ventana modal */}
            <button type="button" onClick={() => handleChangeModal()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Cerrar
            </button>
          </div>
        </div>

        <div className="md:w-2/5">
          <Image
            width={300}
            height={400}
            alt={`imagen producto ${producto.nombre}`}
            src={`/assets/img/${producto.imagen}.jpg`}
          />
        </div>
        <div className="md:w-3/5">
          <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>

          <div>
            <p className="mt-5 font-black text-4xl text-amber-500">
              {formatearDinero(producto.precio)}
            </p>
          </div>

          <div className="md:flex gap-4 mt-5">
            {/* suma */}
            <button
              onClick={() => {
                if (cantidad > 4) return;
                setCantidad(cantidad + 1);
                setOpc(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            <div className=" text-2xl font-bold">{cantidad} </div>
            {/* resta     */}
            <button
              onClick={() => {
                if (cantidad < 1) return;
                setCantidad(cantidad - 1);
                setOpc(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          {/* Boton Grabar       */}
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 uppercase text-white w-full mt-5 p-3 font-bold"
            onClick={() => grabarPedido()}
          >
            {productoActual.alta ? (
              <span>Agregar al pedido</span>
            ) : (
              <span>Cambiar pedido</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Pedidos;
