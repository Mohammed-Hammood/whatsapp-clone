import { AuthenticationStateTypes, MessagesInitialStateTypes } from 'types';
import { RootState } from './index'


export const selectMessages = (state: RootState):MessagesInitialStateTypes => state.messages;


export const selectAuthentication = (state:RootState):AuthenticationStateTypes => state.authentication;