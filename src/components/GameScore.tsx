import { Box, Flex, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { player1Prefs, player2Prefs } from 'state';

const GameScore: FC = () => {
  const player1 = useRecoilValue(player1Prefs);
  const player2 = useRecoilValue(player2Prefs);

  return (
    <Flex justify='center' flexDirection='column'>
      <Box w='350px' padding='10px 0'>
        <Heading as='h1' size='2xl' textAlign='center'>
          Connect 4
        </Heading>
      </Box>

      <Flex justify='center' padding='10px 0'>
        <Box w='175px' bg={player1.color} padding='10px'>
          <Heading as='h2' size='lg' textAlign='center'>
            {player1.name}
          </Heading>
          <Heading as='h3' size='4xl' textAlign='center'>
            {player1.wins}
          </Heading>
        </Box>

        <Box w='175px' bg={player2.color} padding='10px'>
          <Heading as='h2' size='lg' textAlign='center'>
            {player2.name}
          </Heading>
          <Heading as='h3' size='4xl' textAlign='center'>
            {player2.wins}
          </Heading>
        </Box>
      </Flex>
    </Flex>
  );
};

export default GameScore;
