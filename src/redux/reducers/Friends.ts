import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Friend {
  _id: string;
  name: string;
  userName: string;
  avatar: string;
  status: boolean;
}

interface FriendsState {
  allFriends: Friend[];
  addedFriendIds: string[];
}

const initialState: FriendsState = {
  allFriends: [],
  addedFriendIds: [],
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setAllFriends: (state, action: PayloadAction<Friend[]>) => {
      state.allFriends = action.payload;
    },
    addFriend: (state, action: PayloadAction<string>) => {
      if (!state.addedFriendIds.includes(action.payload)) {
        state.addedFriendIds.push(action.payload);
      }
    },
    removeFriend: (state, action: PayloadAction<string>) => {
      state.addedFriendIds = state.addedFriendIds.filter(id => id !== action.payload);
    },
  },
});

export const { setAllFriends, addFriend, removeFriend } = friendsSlice.actions;
export default friendsSlice.reducer;