import { configureStore } from "@reduxjs/toolkit";
import questionIdReducer from "./questionIdSlice";
import handlerReducer from "./handlerSlice";

const store = configureStore({  
  reducer: {
    questionId: questionIdReducer,
    handler: handlerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;