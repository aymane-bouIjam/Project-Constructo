import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
    name : "mode",
    initialState : {darkMode : JSON.parse(localStorage.getItem('theme')) || false},
    reducers : {
        toggleDarkMode : (state)=>{
            state.darkMode = !state.darkMode
        },
    }
})

export const { toggleDarkMode } = modeSlice.actions;
export default modeSlice.reducer;