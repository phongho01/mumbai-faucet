import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;
