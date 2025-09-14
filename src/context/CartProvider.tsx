import {useReducer, type ReactNode, useEffect} from 'react';
import { CartContext, type CartState, type CartAction } from './CartContext.ts';

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { name, option } = action.payload;
            const itemId = `${name}-${option.amount}`;

            const existingItem = state.items.find(item => item.id === itemId);

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === itemId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }

            return {
                ...state,
                items: [...state.items, { id: itemId, name, ...option, quantity: 1 }],
            };
        }
        case 'DECREASE_ITEM': {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem?.quantity === 1) {
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== action.payload.id),
                };
            }

            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
            };
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
            };
        case 'CLEAR_CART':
            return { items: [] };
        default:
            return state;
    }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const getInitialState = (): CartState => {
        try {
            const storedCart = localStorage.getItem('shoppingCart');
            if (storedCart) {
                return JSON.parse(storedCart);
            }
        } catch (error) {
            console.error("Failed to parse cart from localStorage", error);
        }
        return { items: [] };
    };

    const [state, dispatch] = useReducer(cartReducer, getInitialState());

    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(state));
    }, [state]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};