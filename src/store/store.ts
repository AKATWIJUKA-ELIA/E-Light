import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart"
import userReducer from "./customer"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

//         const persistConfig = {
//         key: "root",
//         storage,
//       };
      const cartPersistConfig = {
        key: "cart",
        storage,
        };

        const userPersistConfig = {
        key: "user",
        storage,
        };

      const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
      const persistedUserReducer = persistReducer(userPersistConfig,userReducer)

export const store = configureStore({
        reducer: {
                cart: persistedCartReducer,
                user:persistedUserReducer
        },
        middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                  serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore non-serializable warnings
                    ignoredPaths: ["register"], // Ignore specific path in state
                  },
                }),
})


export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch