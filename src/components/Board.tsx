import { Circle, Flex } from '@chakra-ui/react';
import { boardRows } from 'const';
import { usePlayPiece } from 'hooks';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import {
  boardState,
  gameOverState,
  player1Prefs,
  player2Prefs,
  playerState
} from 'state';
import { Player } from 'types';

const padCol = (col: number[]): number[] =>
  col.join('').padEnd(boardRows, '0').split('').map(Number);

const Board: FC = () => {
  const play = usePlayPiece();
  const board = useRecoilValue(boardState);
  const player1 = useRecoilValue(player1Prefs);
  const player2 = useRecoilValue(player2Prefs);
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);

  const getPlayerColor = (p: Player) => {
    return p === 1 ? player1.color : player2.color;
  };

  return (
    <Flex justify='center'>
      {board.map((col, i) => (
        <Flex
          key={i}
          role='group'
          onClick={() => play(i)}
          flexDirection='column-reverse'
          cursor={gameOver ? 'auto' : 'pointer'}
        >
          {padCol(col).map((p, j) => (
            <Circle
              m={1}
              size='40px'
              key={`${i}-${j}`}
              boxShadow='inner'
              bg={p !== 1 && p !== 2 ? 'gray.300' : getPlayerColor(p)}
            />
          ))}
          <Circle
            m={1}
            size='40px'
            boxShadow='base'
            visibility='hidden'
            bg={getPlayerColor(player)}
            _groupHover={{
              visibility: gameOver ? 'hidden' : 'visible'
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default Board;
