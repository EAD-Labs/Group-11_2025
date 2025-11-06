//reducer for question number

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionIdState {
  questionId: string;
}

  const questionIdSlice = createSlice({
  name: "questionId",
  initialState: {
    questionId: "",
  },
  reducers: {
    setQuestionId: (state, action: PayloadAction<string>) => {
      state.questionId = action.payload;
    },
  },
});

export default questionIdSlice.reducer;
export const { setQuestionId } = questionIdSlice.actions;