// menu de opciones : Menú Pedido Total
import { useRouter } from "next/router";
import { useAuth } from "../context/authContext";

const Menu = () => {
  const router = useRouter();
  const { itemMenu, setItemMenu } = useAuth();

  const itemsMenu = [
    { item: 1, nombre: "Menú", url: "/" },
    { item: 2, nombre: "Pedido", url: "/chango" },
    { item: 3, nombre: "Total", url: "/total" },
  ];

  const calcularProgreso = () => {
    //return (itemMenu / 3) * 100;
    let porcentaje = (itemMenu / 3) * 100;
    if (itemMenu < 2) porcentaje -= 20;

    return porcentaje;
  };
  return (
    <div className="w-full mb-10">
      <div className="flex justify-between w-full mb-1">
        {itemsMenu.map((elemento) => (
          <button
            className="text-2xl font-bold cursor-pointer"
            key={itemsMenu.item}
            onClick={() => {
              router.push(elemento.url);
              setItemMenu(elemento.item);
            }}
          >
            {elemento.nombre}
          </button>
        ))}
      </div>

      <div className=" bg-gray-300 mb-1 w-full">
        <div
          className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white"
          style={{ width: `${calcularProgreso()}%` }}
        ></div>
      </div>
      <p className=" font-thin text-xs">Progreso de la compra</p>
    </div>
  );
};

export default Menu;
