import userReducer from './userSlice'
import feedReducer from './feedSlice'
import { configureStore } from '@reduxjs/toolkit';

export const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
    },
});

console.log(appStore.getState())
export default appStore;
