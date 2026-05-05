import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/FooterPage';
import { getOrders } from '../services/order.service';
import type { Order } from '../types/order.type';

const OrdersPage = () => {

  // Estado para guardar todas las órdenes que vienen de la API
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Estado para el filtro seleccionado — 'all' muestra todas
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  
  // Estado de carga — true mientras espera la API
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  // Se ejecuta al cargar la página — trae las órdenes de la API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error cargando órdenes:', error);
      } finally {
        setLoading(false); // apaga el loading haya error o no
      }
    };
    fetchOrders();
  }, []); // [] = solo se ejecuta una vez al cargar

  // Filtra las órdenes según el estado seleccionado
  // Si selectedStatus es 'all' muestra todas
  // Si no, filtra por el estado exacto
  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  // Mientras carga muestra este mensaje
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Cargando pedidos...</p>
      </div>
    );
  }

  // Función para dar color al badge de estado
  // Cada estado tiene su propio color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':    return 'bg-yellow-100 text-yellow-700';
      case 'delivered':  return 'bg-green-100 text-green-700';
      case 'cancelled':  return 'bg-red-100 text-red-700';
      default:           return 'bg-slate-100 text-slate-700';
    }
  };

  // Función para traducir el estado al español
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':   return 'En Proceso';
      case 'delivered': return 'Entregado';
      case 'cancelled': return 'Cancelado';
      default:          return status;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-8 py-10 w-full">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Historial de Pedidos</h1>
        <p className="text-slate-500 mb-8">Gestiona y revisa el estado de todas tus compras.</p>

        {/* Layout dos columnas — igual que el catálogo */}
        <div className="flex gap-8 items-start">

          {/* Columna izquierda — resumen y filtros */}
          <div className="w-56 shrink-0 flex flex-col gap-4">

            {/* Resumen de actividad */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                Resumen
              </p>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Total Pedidos</span>
                {/* orders.length cuenta cuántas órdenes hay */}
                <span className="font-bold text-blue-600">{orders.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">En Proceso</span>
                {/* filter cuenta solo las que están en pending */}
                <span className="font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'pending').length}
                </span>
              </div>
            </div>

            {/* Filtros por estado */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                Filtrar por estado
              </p>

              {/* Botón "Todos" */}
              <button
                onClick={() => setSelectedStatus('all')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition
                  ${selectedStatus === 'all'
                    ? 'bg-slate-800 text-white'      // seleccionado → oscuro
                    : 'text-slate-600 hover:bg-slate-100' // normal → claro
                  }`}
              >
                Todos
              </button>

              {/* Botones de cada estado */}
              {['pending', 'delivered', 'cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition
                    ${selectedStatus === status
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  {getStatusLabel(status)}
                </button>
              ))}
            </div>
          </div>

          {/* Columna derecha — lista de órdenes */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Si no hay órdenes muestra mensaje */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                <p className="text-slate-400">No tienes pedidos aún</p>
                <button
                  onClick={() => navigate('/catalog')}
                  className="mt-4 bg-slate-800 text-white px-6 py-2 rounded-lg text-sm hover:bg-slate-700 transition"
                >
                  Ver catálogo
                </button>
              </div>
            ) : (
              // map() recorre cada orden y crea una card
              filteredOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">

                  {/* Información de la orden */}
                  <div className="flex-1">
                    {/* Muestra los primeros 8 caracteres del id como número de orden */}
                    <p className="font-semibold text-slate-800">
                      Pedido #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    {/* Formatea la fecha a español */}
                    <p className="text-slate-400 text-sm">
                      {new Date(order.created_at).toLocaleDateString('es-CL', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>

                  {/* Badge de estado con color dinámico */}
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>

                  {/* Total de la orden */}
                  <p className="font-bold text-slate-800 text-lg">
                    ${Number(order.total).toLocaleString()}
                  </p>

                  {/* Botón ver detalles — por ahora solo visual */}
                  <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Ver Detalles
                  </button>

                </div>
              ))
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrdersPage;