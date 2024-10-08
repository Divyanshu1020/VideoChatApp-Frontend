import { Chat } from "@/components/aside/FriendList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatSlice {
    chats: Chat[] | [];
    isChatISOpen: boolean
  }
const initialState: ChatSlice = {
    chats : [],
    isChatISOpen : true
  };

export const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        setChats : (state, action : PayloadAction<{chats : Chat[]}>) => {
            state.chats = action.payload.chats;
        },
        plusNoOfNewMessage : (state, action : PayloadAction<string>) => {
            state.chats.forEach((chat) => {
                if (chat._id === action.payload) {
                    if(!chat.noOfMessages) {
                        chat.noOfMessages = 1
                    }else {
                        chat.noOfMessages = chat.noOfMessages + 1;
                    }
                    
                }
            });
        },

        newMessageZero : (state, action : PayloadAction<string>) => {
            state.chats.forEach((chat) => {
                if (chat._id === action.payload) {
                    chat.noOfMessages = 0;
                }
            });
        },

        isChatISOpen: (state , action : PayloadAction<boolean>) => {
            state.isChatISOpen = action.payload
        }
    }
})


export const { setChats, plusNoOfNewMessage, isChatISOpen, newMessageZero } = chatSlice.actions;
export default chatSlice.reducer;


