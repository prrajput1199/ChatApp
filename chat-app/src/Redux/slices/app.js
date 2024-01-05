import { createSlice } from "@reduxjs/toolkit";

import { dispatch } from "../store";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT",
  },
};

const Slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    //toggle sidebar
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state,action){
        state.sidebar.type = action.payload.type;
    }
  },
});

//reducer

export default Slice.reducer;

export function ToggleSidebar(){
  return async()=>{
    dispatch(Slice.actions.toggleSidebar())
  }
}

export function UpdateSidebar(type){
  return async()=>{
    dispatch(Slice.actions.updateSidebarType({
      type,
    }))
  }
}
