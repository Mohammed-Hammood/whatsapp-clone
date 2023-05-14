import { configureStore  } from "@reduxjs/toolkit";
import  messagesSlicer from "./slicers/messages";
import authenticationSlicer from "./slicers/authentication";


export  const store = configureStore({
    reducer: {
        messages: messagesSlicer,
        authentication: authenticationSlicer,
    },
    devTools: window.location.origin.includes("localhost"),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch