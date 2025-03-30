import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AppStateReducer from "./features/appSlice";
import WishListReducer from "./features/wishlistSlice";
import storageSession from "redux-persist/lib/storage/session"; // Use sessionStorage instead of localStorage

const persistConfig = {
	key: "qataloog-root", // Key for storage
	storage: storageSession, // Storage type (localStorage by default)
};

const rootReducer = combineReducers({
	appState: AppStateReducer,
	wishlist: persistReducer(persistConfig, WishListReducer),
	// [api.reducerPath]: api.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		// getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
		getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persistor
export const persistor = persistStore(store);
export default store;
