import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

// Hook personalizado para acceder al carrito
// En vez de useContext(CartContext) en cada componente
// solo usamos useCart() — más limpio
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  
  return context;
};