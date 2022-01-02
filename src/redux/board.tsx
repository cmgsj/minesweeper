import { createSlice } from '@reduxjs/toolkit';

type Tile = {
  id: string;
  value: number;
  show: boolean;
  flagged: boolean;
  mined: boolean;
};

type BoardState = {
  rows: number;
  columns: number;
  mines: number;
  board: Tile[][];
  score: number;
  userWon: boolean;
  userLost: boolean;
  initialized: boolean;
};
export type BoardConfig = {
  rows: number;
  columns: number;
  mines: number;
};

export const defaultBoardConfig: BoardConfig = {
  rows: 9,
  columns: 9,
  mines: 10,
};

const initialBoardState: BoardState = {
  rows: 9,
  columns: 9,
  mines: 10,
  board: [],
  score: 0,
  userWon: false,
  userLost: false,
  initialized: false,
};

const boardSlice = createSlice({
  name: 'board',
  initialState: initialBoardState,
  reducers: {
    createEmptyBoard: (state, action) => {
      state.rows = action.payload.rows;
      state.columns = action.payload.columns;
      state.mines = action.payload.mines;
      localStorage.setItem('rows', state.rows.toString());
      localStorage.setItem('columns', state.columns.toString());
      localStorage.setItem('mines', state.mines.toString());
      state.board = [];
      state.score = 0;
      state.userLost = false;
      state.userWon = false;
      state.initialized = false;
      for (let row = 0; row < state.rows; row++) {
        let thisRow: Tile[] = [];
        for (let col = 0; col < state.columns; col++) {
          let id = row.toString() + col.toString();
          thisRow.push({
            id: id,
            value: 0,
            show: false,
            flagged: false,
            mined: false,
          });
        }
        state.board.push(thisRow);
      }
    },

    createPreviousBoard: (state) => {
      const rowsText = localStorage.getItem('rows');
      const columnsText = localStorage.getItem('columns');
      const minesText = localStorage.getItem('mines');
      if (rowsText && columnsText && minesText) {
        const rows = parseInt(rowsText);
        const columns = parseInt(columnsText);
        const mines = parseInt(minesText);
        boardSlice.caseReducers.createEmptyBoard(state, {
          payload: { rows: rows, columns: columns, mines: mines },
          type: '',
        });
      } else {
        boardSlice.caseReducers.createEmptyBoard(state, {
          payload: defaultBoardConfig,
          type: '',
        });
      }
    },

    flagTile: (state, action) => {
      const row = action.payload.row;
      const col = action.payload.col;
      if (!state.board[row][col].show) {
        state.board[row][col].flagged = !state.board[row][col].flagged;
      }
    },

    revealTile: (state, action) => {
      const row = action.payload.row;
      const col = action.payload.col;
      if (!state.initialized) {
        boardSlice.caseReducers.fillBoard(state, {
          payload: { row: row, column: col },
          type: '',
        });
        state.initialized = true;
      }
      if (!state.board[row][col].mined && !state.board[row][col].show) {
        state.score += 5;
      }
      if (!state.board[row][col].flagged) {
        state.board[row][col].show = true;
        boardSlice.caseReducers.revealAdjacentTiles(state, action);
        boardSlice.caseReducers.checkGameStatus(state);
      }
    },

    fillBoard: (state, action) => {
      for (let i = 1; i <= state.mines; i++) {
        let randomRow = Math.floor(Math.random() * state.rows);
        let randomCol = Math.floor(Math.random() * state.columns);
        if (
          (randomRow !== action.payload.row ||
            randomCol !== action.payload.column) &&
          !state.board[randomRow][randomCol].mined
        ) {
          state.board[randomRow][randomCol].mined = true;
        } else {
          i--;
        }
      }
      const star = [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
      ];
      for (let row = 0; row < state.rows; row++) {
        for (let col = 0; col < state.columns; col++) {
          let sum = 0;
          for (let i = 0; i < star.length; i++) {
            if (
              row + star[i][0] >= 0 &&
              row + star[i][0] < state.rows &&
              col + star[i][1] >= 0 &&
              col + star[i][1] < state.columns
            ) {
              if (state.board[row + star[i][0]][col + star[i][1]].mined) {
                sum++;
              }
            }
          }
          state.board[row][col].value = sum;
        }
      }
    },

    checkGameStatus: (state) => {
      let unshownTilesCount = 0;
      for (let row = 0; row < state.rows; row++) {
        for (let col = 0; col < state.columns; col++) {
          if (state.board[row][col].show) {
            if (state.board[row][col].mined) {
              state.userLost = true;
              break;
            }
          } else {
            unshownTilesCount++;
          }
        }
      }
      state.userWon = unshownTilesCount === state.mines;
      if (state.userWon) {
        boardSlice.caseReducers.revealAllTiles(state);
      }
    },

    revealAllTiles: (state) => {
      for (let row = 0; row < state.rows; row++) {
        for (let col = 0; col < state.columns; col++) {
          state.board[row][col].show = true;
        }
      }
    },

    revealAdjacentTiles: (state, action) => {
      if (state.board[action.payload.row][action.payload.col].value === 0) {
        const cross = [
          [0, 1],
          [1, 0],
          [0, -1],
          [-1, 0],
        ];
        const star = [
          [0, 1],
          [1, 1],
          [1, 0],
          [1, -1],
          [0, -1],
          [-1, -1],
          [-1, 0],
          [-1, 1],
        ];
        let tilesToCheck = [
          {
            value: state.board[action.payload.row][action.payload.col].value,
            row: action.payload.row,
            col: action.payload.col,
          },
        ];
        let ids = [
          action.payload.row.toString() + '-' + action.payload.col.toString(),
        ];
        while (tilesToCheck.length > 0) {
          let row = tilesToCheck[0].row;
          let col = tilesToCheck[0].col;
          let id;
          for (let i = 0; i < cross.length; i++) {
            if (
              row + cross[i][0] >= 0 &&
              row + cross[i][0] < state.rows &&
              col + cross[i][1] >= 0 &&
              col + cross[i][1] < state.columns
            ) {
              if (
                state.board[row + cross[i][0]][col + cross[i][1]].value === 0 &&
                !state.board[row + cross[i][0]][col + cross[i][1]].flagged &&
                !state.board[row + cross[i][0]][col + cross[i][1]].mined
              ) {
                state.board[row + cross[i][0]][col + cross[i][1]].show = true;
                for (let i = 0; i < star.length; i++) {
                  if (
                    row + star[i][0] >= 0 &&
                    row + star[i][0] < state.rows &&
                    col + star[i][1] >= 0 &&
                    col + star[i][1] < state.columns
                  ) {
                    if (
                      !state.board[row + star[i][0]][col + star[i][1]].mined
                    ) {
                      state.board[row + star[i][0]][col + star[i][1]].show =
                        true;
                    }
                  }
                }
                id =
                  (row + cross[i][0]).toString() +
                  (col + cross[i][1]).toString();
                if (!ids.includes(id)) {
                  ids.push(id);
                  tilesToCheck.push({
                    value:
                      state.board[row + cross[i][0]][col + cross[i][1]].value,
                    row: row + cross[i][0],
                    col: col + cross[i][1],
                  });
                }
              }
            }
          }
          tilesToCheck.shift();
        }
      }
    },
  },
});

export const boardActions = boardSlice.actions;
export default boardSlice;
