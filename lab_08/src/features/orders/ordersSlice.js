import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    history: [], // {date, items, total}
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.history.push({
                date: new Date().toISOString(),
                items: action.payload.items,
                total: action.payload.total,
            });
        },
    },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
