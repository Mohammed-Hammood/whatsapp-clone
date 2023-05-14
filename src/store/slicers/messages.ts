import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatTypes, MessageTypes, MessagesInitialStateTypes } from "types";


const initialState: MessagesInitialStateTypes = {
    messages: [],
    chats: []
}

export const messagesSlicer = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages(state, actions: PayloadAction<{ messages: MessageTypes[] }>) {
            state.messages = actions.payload.messages;
        },
        setChats(state, actions: PayloadAction<{ chats: ChatTypes[] }>) {
            state.chats = actions.payload.chats;
        },
        clearMessages(state) {
            state.messages = [];
        },
        clearChats(state) {
            state.chats = [];
        }
    }
});


export const { setMessages, setChats, clearChats, clearMessages } = messagesSlicer.actions;
export default messagesSlicer.reducer;