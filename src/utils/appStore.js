import userReducer from './userSlice'
import feedReducer from './feedSlice'
import connectionsReducer from './connectionSlice'
import { configureStore } from '@reduxjs/toolkit';
import requestReducer from './requestSlice'

export const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionsReducer,
        request: requestReducer
    },
});

export default appStore;
