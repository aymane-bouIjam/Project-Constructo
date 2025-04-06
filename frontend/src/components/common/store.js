import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./modeSlice.js";

const store = configureStore({
    reducer :
    {
        mode : modeReducer,
    }
})

export default store;