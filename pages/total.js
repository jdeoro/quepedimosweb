//
//  GRABA ( SUBE EL OBJETO (PEDIDO) A FIREBASE)
//
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ResumenCompra from "../components/ResumenCompra";
import { useAuth } from "../context/authContext";
import { formatearDinero } from "../helpers";

const Total = () => {
  const { pedido, precio, setPrecio, registros,grabaPedido} = useAuth();




 return (
    <Layout>
      <h1 className="text-4xl font-black">Total</h1>

      <button
        onClick={() => {grabaPedido()}}
        type="text"
        disabled={registros===0}
        // className="border shadow-md py-2 px-3 bg-lime-400 text-2xl my-10 hover:bg-lime-600"
        className={`${registros===0 ? "bg-lime-400/30 text-slate-300 cursor-auto" : "bg-lime-400 hover:bg-lime-600 shadow-md text-black cursor-pointer" } border  py-2 px-3 text-2xl my-10 `}        
      >
        CONFIRMAR EL PEDIDO
      </button>
      {/* <p className="font-thin text-3xl">
        TOTAL:{" "}
        <span className="text-3xl font-thin mt-2 text-amber-500">
          {formatearDinero(precio)}
        </span>
      </p> */}
      {/* pedido.lenght === 0 */}
      {registros === 0 ? (
        <p className="text-center">No hay elementos en tu pedido</p>
      ) : (
        pedido.map((registro) => (
          <ResumenCompra key={registro.id} producto={registro} />
        ))
      )}

    </Layout>
  );
};
export default Total;
