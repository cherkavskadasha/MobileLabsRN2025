import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
        {
            id: '1',
            title: 'Товар 1',
            description: 'Короткий опис товару 1',
            price: 100,
            image:
                'https://i.pinimg.com/736x/1e/f4/93/1ef493f6cf6a876a198ef5dd78632cb8.jpg',
        },
        {
            id: '2',
            title: 'Товар 2',
            description: 'Короткий опис товару 2',
            price: 200,
            image:
                'https://i.pinimg.com/736x/1e/f4/93/1ef493f6cf6a876a198ef5dd78632cb8.jpg',
        },
    ],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
});

export default productsSlice.reducer;
