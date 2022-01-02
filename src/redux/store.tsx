import { configureStore } from '@reduxjs/toolkit';
import boardSlice from './board';

const store = configureStore({
  reducer: {
    gameBoard: boardSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
