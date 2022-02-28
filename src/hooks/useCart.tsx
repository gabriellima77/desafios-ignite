import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const hasStock = async (id: number, amount: number) => {
    const { data } = await api.get(`http://localhost:3333/stock/${id}`);
    return amount <= data.amount;
  };

  const addProduct = async (productId: number) => {
    try {
      // TODO
      let newProducts: Product[] = [];

      const selectedProduct = cart.find((product) => product.id === productId);
      if (selectedProduct) {
        const newProduct = { ...selectedProduct };
        newProducts = cart.map((prod) => {
          if (prod.id === productId) {
            newProduct.amount += 1;
            return newProduct;
          }
          return prod;
        });

        const hasProducInStock = await hasStock(productId, newProduct.amount);
        if (!hasProducInStock) {
          toast.error('Quantidade solicitada fora de estoque');
          return;
        }
      } else {
        const { data } = await api.get(
          `http://localhost:3333/products/${productId}`
        );
        const newProduct = data;
        newProduct.amount = 1;
        newProducts = [...cart, newProduct];
      }

      const localStorageData = JSON.stringify(newProducts);
      localStorage.setItem('@RocketShoes:cart', localStorageData);
      setCart(newProducts);
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
      const hasProduct = cart.find(product=> product.id === productId);
      if(!hasProduct) {
        toast.error('Erro na remoção do produto');
        return;
      }
      const newProducts = cart.filter((product) => product.id !== productId);

      const localStorageData = JSON.stringify(newProducts);
      localStorage.setItem('@RocketShoes:cart', localStorageData);
      setCart(newProducts);
    } catch {
      // TODO
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
      if (amount <= 0) return;

      const hasProductsInStock = await hasStock(productId, amount);
      if (!hasProductsInStock) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      const newProducts = cart.map((product) => {
        if (product.id === productId) {
          return { ...product, amount };
        }
        return product;
      });

      const localStorageData = JSON.stringify(newProducts);
      localStorage.setItem('@RocketShoes:cart', localStorageData);
      setCart(newProducts);
    } catch {
      // TODO
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
