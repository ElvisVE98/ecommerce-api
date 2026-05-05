import Navbar from "../components/Navbar";
import Footer from "../components/FooterPage";
import { useCart } from "../hooks/UseCart";
import { useNavigate} from "react-router-dom";
import { createOrder } from "../services/order.service";
import { useState } from "react";
import type { CreateOrderDto } from "../types/order.type";

const CartPage = () =>{

    const {items,totalPrice,removeItem,updateQuantity,clearCart} = useCart();
    const navigate = useNavigate();
    const [procesando,setProcesando] = useState(false);
    const [showModal,setShowModal] = useState(false);


    //Carrito de compras vacio
    if(items.length === 0 && !showModal){
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl mb-2">🛒</p>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Tu carrito está vacío
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Agrega productos desde el catálogo
            </p>
            <button
              onClick={() => navigate('/catalog')}
              className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition"
            >
              Ver catálogo
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }


  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handlePago = async () => {
  setProcesando(true);
  
  try {
    // Preparamos los datos de la orden
    const orderData: CreateOrderDto = {
      user_id: user.id,
      total: Number(totalPrice),
      items: items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        unit_price: Number(item.product.price),
      })),
    };
    // Enviamos a la API
    await createOrder(orderData);
    // Si funcionó → vaciamos el carrito
    setShowModal(true);
    clearCart();   
  } catch (error) {
    console.error('Error al crear la orden:', error);
  } finally {
    setProcesando(false);
  }
};



  // carrito con productos 

  return(
    <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto px-8 py-10 w-full">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Tu carrito</h1>



            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/*Columna izquierda - se visualizan los productos*/}

                <div className="flex-1 flex flex-col gap-4">
                {items.map((item) => (
                    <div key={item.product.id} className="bg-white rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-sm">




                    {/* Imagen del producto */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                        {item.product.image_url ?(
                            <img 
                            src={item.product.image_url} 
                            alt={item.product.name}
                            className="w-full h-full object-cover" 
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
                                Imagen no disponible
                            </div>
                        )}
                    </div>



                    {/* Detalles del producto */}
                    <div className="flex-1">
                        <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Producto</p>
                        <h3 className="font-semibold text-slate-800 mb-3">{item.product.name}</h3>
                    


                    {/* Cantidad y eliminar */}
                    <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.product.id,item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center text-slate-600"
                            >
                            -                            
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                        onClick={() => updateQuantity(item.product.id,item.quantity + 1 )}
                        className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center text-slate-600"
                        >
                            +
                        </button>
                        <button 
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-400 hover:text-red-600 text-xs transition ml-2"
                        >
                        Eliminar
                        </button>
                    </div>
                </div>


                    {/*precio*/}
                    <div className="shrink-0 text-right">
                        <span className="font-bold text-slate-800">
                            ${Number(item.product.price * item.quantity).toLocaleString()}
                        </span>
                    </div>
                </div>                                       
                ))}                
            </div>

{/*--------------------------------------------------------------------------------------------------*/}

            {/* Columna derecha — resumen */}
            <div className="w-full md:w-80 md:shrink-0 bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Resumen del Pedido</h2>


            {/*subtotal*/}
            <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span className="uppercase tracking-wide text-xs">Subtotal</span>
                <span>${Number(totalPrice).toLocaleString()}</span>
            </div>

            {/*envio*/ }
            <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span className="uppercase tracking-wide text-xs">Envío</span>
                <span>$2.500</span>
            </div>


            {/*separador*/}
            <div className="border-t border-slate-100 my-4"></div> 

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-slate-800">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                    ${Number(totalPrice + 2500).toLocaleString()}
                </span>
            </div>

            {/* Botón de finalizar compra */}
            <button 
            onClick={handlePago}
            disabled={procesando}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-3">
                {procesando ? 'Procesando...' : 'Proceder al Pago'}
            </button>

            <button onClick={() => navigate ('/catalog')}
                className="w-full text-slate-600 text-sm py-2 hover:text-slate-800 transition"
                >
                 Continuar comprando   
            </button>

            {/* seguridad */}
            <div className="mt-4 bg-slate-50 rounded-lg p-3 flex gap-2 items-start">
                <span className="text-blue-500 mt-0.5">🔒</span>
                <p className="text-xs text-slate-500">
                    Compra protegida por Mercado Local. Transacciones seguras y encriptadas.
                </p>
            </div>
                      
    </div>
</div>         
    </main>
    <Footer />

    {/*MODAL DE CONFIRMACION DE COMPRA */}

    {showModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
          <p className="text-4xl mb-4">🎉</p>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            ¡Compra realizada!
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Tu orden fue procesada exitosamente.
          </p>
          <button
            onClick={() => {
              setShowModal(false);
              navigate('/orders');
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Ver mis pedidos
          </button>
        </div>
      </div>
    )}



    </div>  
  );
};

export default CartPage;