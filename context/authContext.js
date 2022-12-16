import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  onSnapshot,
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
  query,
  where,
  orderBy,
  Firestore,
} from "firebase/firestore";

import { useRouter } from "next/router";

import { auth } from "../firebase/config";
import { db } from "../firebase/config";

// el authcontext.provider permite usar los objetos puestos en su value
// pero el que contiene esos valores es el authcontext
const authContext = createContext();

export const useAuth = () => {
  // este contexto es el que tiene la informacion del provider
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }) {

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [productoActual, setProductoActual] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [registros, setRegistros] = useState(0);
  const [itemMenu, setItemMenu] = useState(1);
  const [precio, setPrecio] = useState(0);
  const [opcLogin,setopcLogin] = useState(false)
  const [opcRegister,setopcRegister] = useState(false)
  const [currentUser,setcurrentUser] = useState(null)
  const [loading,setLoading]= useState(true)
  const [role, setRole]=useState({})
  const [dataUser,setDatauser] = useState({})

  const [comanda, setComanda] = useState([]);
  
  //const [mensajeToast, setMensajeToast]= useState(null) 

  const router = useRouter();
  
  function actualizarRegistros() {
    var total = 0;
    pedido.map((elemento) => {
      total += elemento.cantidad;
    });

    return total;
  }

  function updatePedidos() {
    const pedidoFiltrado = pedido.filter((registro) => registro.cantidad > 0);
    console.log("pedidoFiltrado:", pedidoFiltrado);
    setPedido(pedidoFiltrado);
  }

  const handleClickCategoria = (id) => {
    const cat = categorias.filter((categ) => categ.data.categoriaId === id);
    setCategoriaActual(cat[0]);
    // se asegura q' no importa en q' pagina estemos
    // al dar clic en una categoria,se posicion en la pagina de productos.
    router.push("/");
  };

  const grabaPedido= async () => {

    try {
      //const nuevoRegPedido = collection(db, 'pedidos')
      var d = new Date();
      const aa = d.getFullYear();
      const mm = d.getMonth()+1<10 ? "0"+(d.getMonth()+1) : d.getMonth()+1;
      const dd =  d.getDate();
      const hh = d.getHours();
      const mi =  d.getMinutes();
      const sc =  d.getSeconds();            

      const fecha = aa+""+ mm+"" + dd +"" + hh+"" + mi+"" + sc ;
      const id=currentUser.uid+"_"+fecha;

      const docRef = doc(db, 'pedidos',id);

      const pedidoObj ={
        tiempoentrega: 0,
        completado: false,
        orden:pedido,  // array de objetos
        total:precio,
        creado:Date.now()
      }

      //const nropedido = await db.collection('pedidos').add(pedidoObj)
        // se saca momentaneamente
      // const supedido = pedido.map(registro => (
      //      {
      //        'idpedido':id,
      //        ...registro,
      //        'pendiente':true
      //      }
      //   )
      // )
      setDoc(docRef, pedidoObj);

      //setDoc(docRef, {supedido});
      //console.log(supedido)
      //console.log(currentUser.uid)

    mensajeToast("Se ha grabado el pedido!");
    } catch (error) {
      console.log(error);
    }
  }

  const grabaUsuario = async ( id, obusuario ) => {

    try {
      var d = new Date();
      const aa = d.getFullYear();
      const mm = d.getMonth()+1<10 ? "0"+(d.getMonth()+1) : d.getMonth()+1;
      const dd =  d.getDate();
      const hh = d.getHours();
      const mi =  d.getMinutes();
      const sc =  d.getSeconds();            

      const fecha = aa+""+ mm+"" + dd +"" + hh+"" + mi+"" + sc ;
      //const id=currentUser.uid+""+fecha;

      const docRef = doc(db, 'usuarios',id);

      // const usuario ={
      //   tiempoentrega: 0,
      //   completado: false,
      //   orden:pedido,  // array de objetos
      //   total:precio,
      //   creado:Date.now()
      // }

      setDoc(docRef, obusuario);

    mensajeToast("Se ha grabado el usuario!");
    } catch (error) {
      console.log(error);
    }


  }

  const mensajeToast = ( mensaje ) => {
    toast.success(mensaje, {
      position: "top-right",
      autoClose: 200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


  const handlePedido = ({ ...producto }) => {
    if (pedido.some((elpedido) => elpedido.id === producto.id)) {
      //actualiza la cantidad
      const pedidoActualizado = pedido.map((elpedido) =>
        elpedido.id === producto.id ? producto : elpedido
      );
      setPedido(pedidoActualizado);

      console.log("Sì existe ->", pedidoActualizado);
    } else {
      console.log("no existe");
      setPedido([...pedido, producto]);
    }

    toast.success("Tu pedido se ha grabado!", {
      position: "top-right",
      autoClose: 200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const login = async (email, password) => {
    const userCrentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
   
    return userCrentials
  };
  
  const registerWithEmailAndPassword = async (email, password) => {
    const newUserCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return newUserCredentials;
  };

  const logout = async () => {
   // borra si hay pedidos 
   setcurrentUser(null)
   setPrecio(0);
   setProductoActual({});
   setPedido([]);
   setRegistros(0)
   
    await signOut(auth);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider);
  };

 // Se trae todos los productos de una categoria.
  const buscaProductos = async (id) => {
    if (id === undefined) return;
    
    const q = query(
      collection(db, "productos"),
      where("categoriaId", "==", id)
    );

    onSnapshot(q, (querySnapshot) => {
      setProductos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  };

  // es administrador ??
  const esAdministrador = async (id) => {
    console.log("uid: ",id)
    if (id === undefined) return;
    if (id === null) return;    

    var role=""

    const usuarioRef = doc(db,`/usuarios/${id}`);
    //console.log('usuario busqueda:', `/usuarios/${id}`)
    //const usuarioRef = doc(db, '/usuarios/AQQg473rx9hAEgvudrErQu8IJHn2');
    const dato = await getDoc(usuarioRef);
    console.log("dato:",dato.data().role)
    setRole(dato.data().role)
    setDatauser(dato.data())

  };

  // SE EJECUTA LA PRIMERA VEZ, SE TRAE TODAS LAS CATEGORIAS.
  useEffect(() => {
    const q = query(collection(db, "categorias"));
      onSnapshot(q, (querySnapshot) => {
      setCategorias(
        querySnapshot.docs.map((docu) => ({
          data: docu.data(),
        }))
      );
    });
  }, []);

  // SE EJECUTA CUANDO CAMBIE LA CATEGORIA
  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  // tambien cuando inicia la APP
  //busca los productos de una categoria seleccionada.
  useEffect(() => {
    buscaProductos(categoriaActual?.data?.categoriaId);
  }, [categoriaActual]);


  useEffect(() => {
    onAuthStateChanged(auth,currentUser => {
      setcurrentUser(currentUser)
      setLoading(false)
      esAdministrador(currentUser?.uid)

  })
  }, [])

  return (
    <authContext.Provider
      value={{
        login,
        logout,
        loginWithGoogle,
        productos,
        categorias,
        categoriaActual,
        handleClickCategoria,
        modal,
        handleChangeModal,
        setProductoActual,
        productoActual,
        handlePedido,
        pedido,
        setRegistros,
        registros,
        actualizarRegistros,
        updatePedidos,
        itemMenu,
        setItemMenu,
        precio,
        setPrecio,
        opcLogin,
        setopcLogin,
        currentUser,
        setcurrentUser,
        loading,
        setLoading,
        opcRegister,setopcRegister,
        registerWithEmailAndPassword,
        mensajeToast,grabaPedido,grabaUsuario,
        role,setRole,esAdministrador,dataUser
        }}
    >
      {children}
    </authContext.Provider>
  )

  }  

