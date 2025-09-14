import { createContext } from 'react';

// --- Типы ---
export interface ItemOption {
    amount: string;
    cost: number;
}

export interface CartItem extends ItemOption {
    id: string;
    name: string;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

// --- Действия (Actions) ---
export interface AddItemPayload {
    name: string;
    option: ItemOption;
}

export type CartAction =
    | { type: 'ADD_ITEM'; payload: AddItemPayload }
    | { type: 'REMOVE_ITEM'; payload: { id: string } }
    | { type: 'DECREASE_ITEM'; payload: { id: string } }
    | { type: 'CLEAR_CART' };

// --- Создание и экспорт контекста ---
export const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);