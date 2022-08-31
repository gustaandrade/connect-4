import { boardCols, boardRows } from 'const';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  boardState,
  gameOverState,
  player1Prefs,
  player2Prefs,
  playerState
} from 'state';

const testWin = (arr: number[]): boolean => /1{4}|2{4}/.test(arr.join(''));

const usePlayPiece = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [player, setPlayerTurn] = useRecoilState(playerState);
  const [gameOver, setGameOver] = useRecoilState(gameOverState);

  const player1 = useRecoilValue(player1Prefs);
  const player2 = useRecoilValue(player2Prefs);

  const savePlayer1Prefs = useSetRecoilState(player1Prefs);
  const savePlayer2Prefs = useSetRecoilState(player2Prefs);

  const checkUpDiagonal = (col: number, row: number, board: number[][]) => {
    let diagX = col - 3;
    let diagY = row - 3;
    let diagArray: number[] = [];

    for (let i = 0; i < boardCols; i++) {
      if (diagX >= 0 && diagX < boardCols && diagY >= 0 && diagY < boardRows) {
        diagArray.push(board[diagX][diagY]);
      }
      diagX++;
      diagY++;
    }
    return diagArray;
  };

  const checkDownDiagonal = (col: number, row: number, board: number[][]) => {
    let diagX = col - 3;
    let diagY = row + 3;
    let diagArray: number[] = [];

    for (let i = 0; i < boardRows; i++) {
      if (diagX >= 0 && diagX < boardCols && diagY >= 0 && diagY < boardRows) {
        diagArray.push(board[diagX][diagY]);
      }
      diagX++;
      diagY--;
    }
    return diagArray;
  };

  return (col: number) => {
    // Prevent adding a piece when the game is over
    if (gameOver) {
      return;
    }

    // Prevent adding a piece when the column is full
    if (board[col].length === boardRows) {
      return;
    }

    // Play piece (non mutating)
    const newBoard = board.map((column, i) =>
      i === col ? [...column, player] : column
    );

    const row = newBoard[col].length - 1;

    if (
      testWin(newBoard[col]) || // Did win vertically
      testWin(newBoard.map(col => col[row] || 0)) || // Did win horizontally
      testWin(checkUpDiagonal(col, row, newBoard)) || // Did win diagonally up
      testWin(checkDownDiagonal(col, row, newBoard)) // Did win diagonally down
    ) {
      savePlayer1Prefs({
        color: player1.color,
        name: player1.name,
        wins: player === 1 ? player1.wins + 1 : player1.wins
      });
      savePlayer2Prefs({
        color: player2.color,
        name: player2.name,
        wins: player === 2 ? player2.wins + 1 : player2.wins
      });

      setGameOver(true);
    } else {
      setPlayerTurn(player === 1 ? 2 : 1);
    }

    setBoard(newBoard);
  };
};

export default usePlayPiece;
