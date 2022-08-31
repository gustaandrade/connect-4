import { ChakraProvider, Container, VStack } from '@chakra-ui/react';
import GameScore from './GameScore';
import Board from 'components/Board';
import GameControls from 'components/GameControls';
import GameProgress from 'components/GameProgress';
import GameCustomization from './GameCustomization';
import { FC } from 'react';
import { RecoilRoot } from 'recoil';

const App: FC = () => (
  <ChakraProvider>
    <RecoilRoot>
      <Container py={4} as={VStack}>
        <GameScore />
        <Board />
        <GameProgress />
        <GameControls />
        <GameCustomization />
      </Container>
    </RecoilRoot>
  </ChakraProvider>
);

export default App;
