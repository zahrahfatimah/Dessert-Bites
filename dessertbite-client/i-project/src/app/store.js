import { configureStore } from '@reduxjs/toolkit';
import cafeSlice from '../features/cafeSlice';

export const store = configureStore({
    reducer: {
        cafe: cafeSlice,
    },
});

export default store