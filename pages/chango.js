//
// muestra lo que esta en el PEDIDO. A TRAVEZ DEL COMPONENTE ChangoElementos >>>
//
import ChangoElementos from "../components/ChangoElementos";
import Layout from "../components/Layout";
import Subtotales from "../components/Subtotales";
import { useAuth } from "../context/authContext";

const Chango = () => {
  const { user, registros, pedido } = useAuth();
  return (
    <Layout>
      <h1 className="text-4xl font-black mb-1 ml-3">Su Pedido</h1>
      <p className="text-sm font-bold ml-3 text-indigo-600 mb-5">
        Resumen del pedido realizado.
      </p>

      <div>
        <Subtotales />
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1">
        {pedido.map((registro) => (
          <ChangoElementos key={registro.id} registro={registro} />
        ))}
      </div>
    </Layout>
  );
};

export default Chango;
