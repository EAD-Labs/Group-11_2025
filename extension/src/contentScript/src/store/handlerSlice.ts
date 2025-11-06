//reducer for question number

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface handlerState {
  handler: string;
}

const handelerenum = ["invideo", "pallete"]

const handlerSlice = createSlice({
  name: "handler",
  initialState: {
    handler: handelerenum[0],
  },
  reducers: {
    setHandler: (state, action: PayloadAction<string>) => {
        if(handelerenum.includes(action.payload)){
            state.handler = action.payload;
        }
    },
  },
});

export default handlerSlice.reducer;
export const { setHandler } = handlerSlice.actions;