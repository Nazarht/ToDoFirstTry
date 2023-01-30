import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loading";

import tasksReducer from "./task-state";

const store = configureStore({
    reducer: {main: tasksReducer,
    loading: loadingReducer}
});

export default store