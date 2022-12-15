import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Categorias from "../components/Categorias";
import Productos from "../components/Productos";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/router";
import chango from "./chango";

export default function Home() {
  const router = useRouter();
  const {
    categoriaActual,
    productos,
    pedido,
    currentUser,
    registros,
    setRegistros,
    actualizarRegistros,
    esAdministrador,
  } = useAuth();
  
  const href = "/chango";

  useEffect(() => {
    setRegistros(actualizarRegistros());
  }, [pedido]);

  useEffect( () =>{
   //console.log("currentUser: ",currentUser)
   if (currentUser === null) return;  
   if (currentUser === undefined) return;
  
   esAdministrador(currentUser?.uid)

  } ,[currentUser])

  return (
    <>
      <Layout>
        <h1 className="text-4xl font-black">
          Menu {categoriaActual?.data?.nombre}{" "}
        </h1>
        <p className="text-2xl my-10">
          Elige y personaliza tu pedido a continuación
        </p>

        {/* changito */}
        <div className="flex mt-1 mb-1 flex-row-reverse mr-6">
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
        
        {
          productos ?
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {productos.map(registro => (
            <Productos key={registro.id} productos={registro} />
          ))}
        </div>
          :
            <div>cargando....</div>
        }

      </Layout>
    </>
  );
}
