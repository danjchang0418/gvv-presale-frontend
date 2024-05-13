import { configureStore } from "@reduxjs/toolkit"; 

import userSliceReducer from "./slices/userSlice";
import modalSliceReducer from "./slices/modalSlice";
import alertSliceReducer from "./slices/alertSlice";

export const store = configureStore({
    reducer: {
        user: userSliceReducer,
        modal: modalSliceReducer,
        alert: alertSliceReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AsyncThunkConfig = {
  state: RootState,
  dispatch: AppDispatch;
};

export default store;