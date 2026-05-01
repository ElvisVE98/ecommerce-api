import type { Product } from "../types/product.type";
import { createContext, useState } from "react";


interface CartItem {
    product : Product;
    quantity : number;
}

interface CartContextType{

    items : CartItem[];
    addItem : (product : Product) => void;
    removeItem : (productId : string) => void;
    updateQuantity : (productId : string,quantity : number ) => void ;
    clearCart : () => void;
    totalItems : number ;
    totalPrice : number ;
        
}

export const CartContext = createContext <CartContextType | null>(null) ; 

export const CartProvider = ({children} : {children : React.ReactNode}) => {
    const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { product, quantity: 1 }];
    });
  };


  // ELIMINAR un producto del carrito completamente
const removeItem = (productId: string) => {
  setItems(currentItems => 
    // filter devuelve todos EXCEPTO el que tiene ese id
    currentItems.filter(item => item.product.id !== productId)
  );
};

// CAMBIAR la cantidad de un producto
const updateQuantity = (productId: string, quantity: number) => {
  // Si la cantidad es 0 o menos, eliminar el producto
  if (quantity <= 0) {
    removeItem(productId);
    return;
  }
  setItems(currentItems =>
    currentItems.map(item =>
      // Si es el producto buscado → actualiza cantidad
      // Si no → déjalo igual
      item.product.id === productId
        ? { ...item, quantity }
        : item
    )
  );
};

// VACIAR el carrito completamente
const clearCart = () => {
  setItems([]); // simplemente vuelve al array vacío inicial
};

// TOTAL de items — suma todas las cantidades
const totalItems = items.reduce((total, item) => 
  total + item.quantity, 0
);

// PRECIO TOTAL — suma precio x cantidad de cada item
const totalPrice = items.reduce((total, item) => 
  total + (Number(item.product.price) * item.quantity), 0
);


return (
  <CartContext.Provider value={{
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,  // ya no es 0, es el calculado
    totalPrice,  // ya no es 0, es el calculado
  }}>
    {children}
  </CartContext.Provider>  
);

};

