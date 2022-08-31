import { Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { gameOverState, player1Prefs, player2Prefs, playerState } from 'state';

const GameProgress: FC = () => {
  const player1 = useRecoilValue(player1Prefs);
  const player2 = useRecoilValue(player2Prefs);
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);

  const name = player === 1 ? player1.name : player2.name;

  return (
    <Heading as='h3' size='lg'>
      {gameOver ? `${name} wins!` : `${name}'s turn`}
    </Heading>
  );
};

export default GameProgress;
