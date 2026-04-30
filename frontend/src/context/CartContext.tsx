import type { Product } from "../types/product.type";
import { createContext, useState,useContext } from "react";


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

const CartContext = createContext <CartContextType | null>(null) ; 

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


    return(
        <CartContext.Provider value={{
            items,
            addItem: () => {},
            removeItem: () => {},
            updateQuantity: () => {},
            clearCart: () =>{},
            totalItems : 0,
            totalPrice : 0,
        }}>
            {children}
        </CartContext.Provider>
    );

};