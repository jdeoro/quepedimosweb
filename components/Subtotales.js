//
// icono chango en la parte superior en pedidos,donde muestra el total de pedidos
//

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/router";

const Subtotales = () => {
  const router = useRouter();
  const { pedido, setRegistros, registros, actualizarRegistros } = useAuth();

  const [totalPagar, setTotalPagar] = useState(0);

  useEffect(() => {
    setRegistros(actualizarRegistros());
    console.log(totalPagar);
    setTotalPagar(totalapagar);
  }, [pedido]);

  const totalapagar = +pedido.map((reg) => parseInt(reg.cantidad));

  return (
    <>
      {/* changito */}
      <div className="flex mt-1 mb-1 flex-row-reverse mr-3">
        <button
          onClick={() => {
            router.push(href);
          }}
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {registros}
        </button>
      </div>
    </>
  );
};

export default Subtotales;
