import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "../featureSlice/CounterSlice";

export const store = configureStore({
  reducer: {
    auth: Authreducer,
  },
});
