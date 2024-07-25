import { configureStore } from '@reduxjs/toolkit';
import reportProgressSlice from './slices/report-progress';

const store = configureStore({
    reducer: {
        reportProgress: reportProgressSlice.reducer,
    },
});

export default store;
