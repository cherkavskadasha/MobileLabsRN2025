import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    total: 0,
};

const updateTotal = (items) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.items.find((i) => i.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            state.total = updateTotal(state.items);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            state.total = updateTotal(state.items);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (item) item.quantity = quantity;
            state.total = updateTotal(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
