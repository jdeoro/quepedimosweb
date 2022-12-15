import React from "react";
import Image from "next/image";
import { formatearDinero } from "../helpers";

const ResumenCompra = ({ producto }) => {
  const { nombre, imagen, cantidad, precio } = producto;

  return (
    <>
      <div className="shadow p-5 mb-3 flex gap-10 items-center">
        <div className="md:w-1/6"></div>
        <Image
          width={300}
          height={400}
          src={`/assets/img/${imagen}.jpg`}
        ></Image>

        <div className="md:w-5/6">
          <p className="text-3xl font-bold">{nombre}</p>
          <p className="text-xl font-bold mt-2">Cantidad: {cantidad}</p>
          <p className="text-xl font-bold mt-2 text-amber-500">
            Precio: {formatearDinero(precio)}
          </p>

          <p className="text-xl font-bold mt-2 text-amber-500">
            Subtotal : {formatearDinero(parseFloat(precio) * cantidad)}
          </p>
        </div>
      </div>
    </>
  );
};

export default ResumenCompra;
