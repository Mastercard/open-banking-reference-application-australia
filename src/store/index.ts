import { configureStore } from '@reduxjs/toolkit';
import reportProgressSlice from './slices/report-progress';
import snackBarSlice from './slices/snackbar';

const store = configureStore({
    reducer: {
        reportProgress: reportProgressSlice.reducer,
        snackbarState: snackBarSlice.reducer,
    },
});

export default store;
