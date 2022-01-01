import { configureStore } from '@reduxjs/toolkit';
import boardSlice from './board';

const store = configureStore({
  reducer: {
    gameBoard: boardSlice.reducer,
  },
});

export default store;
