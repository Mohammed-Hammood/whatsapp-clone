import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthenticationStateTypes } from 'types';

const __name__: string = "whatsapp_auth";

const auth = JSON.parse(localStorage.getItem(__name__) || JSON.stringify({ id: 0, token: null }));

const initialState: AuthenticationStateTypes = {
    isAuthenticated: auth.token && auth.id ? true : false,
    id: auth.id,
    apiToken: auth.token,
    wid: "",
}

export const authenticationSlicer = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login(state, actions: PayloadAction<{ id: number, apiToken: string, saveCredentials: boolean }>) {
            const { id, apiToken, saveCredentials } = actions.payload;
            state.isAuthenticated = true;
            state.id = id;
            state.apiToken = apiToken;

            if (saveCredentials) {
                localStorage.setItem(__name__, JSON.stringify({ id: id, token: apiToken }));
            }
        },
        setWid(state, actions: PayloadAction<{ wid: string }>) {
            state.wid = actions.payload.wid;
        },
        logout(state) {
            state.apiToken = null;
            state.id = null;
            state.isAuthenticated = false;
        }
    }
});


export const { login, logout, setWid } = authenticationSlicer.actions;
export default authenticationSlicer.reducer;