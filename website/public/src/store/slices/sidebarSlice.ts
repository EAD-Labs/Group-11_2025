import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
  isExpanded: boolean;
}

const initialState: SidebarState = {
  isExpanded: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
