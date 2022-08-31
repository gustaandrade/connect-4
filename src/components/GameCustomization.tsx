import { Box, Button, Flex, Text, Input } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { player1Prefs, player2Prefs } from 'state';
import { isHexStringValid } from 'utils';

const GameCustomization: FC = () => {
  const [player1ColorInputValue, setPlayer1ColorInputValue] = useState('');
  const [player1NameInputValue, setPlayer1NameInputValue] = useState('');
  const [player2ColorInputValue, setPlayer2ColorInputValue] = useState('');
  const [player2NameInputValue, setPlayer2NameInputValue] = useState('');

  const player1 = useRecoilValue(player1Prefs);
  const player2 = useRecoilValue(player2Prefs);

  const savePlayer1Prefs = useSetRecoilState(player1Prefs);
  const savePlayer2Prefs = useSetRecoilState(player2Prefs);

  const handleSave = () => {
    savePlayer1Prefs({
      color: isHexStringValid(player1ColorInputValue)
        ? player1ColorInputValue
        : player1.color,
      name: player1NameInputValue !== '' ? player1NameInputValue : player1.name,
      wins: player1.wins
    });
    savePlayer2Prefs({
      color: isHexStringValid(player2ColorInputValue)
        ? player2ColorInputValue
        : player2.color,
      name: player2NameInputValue !== '' ? player2NameInputValue : player2.name,
      wins: player2.wins
    });
  };

  return (
    <Flex
      align='center'
      flexDirection='column'
      border='1px solid gray'
      padding='15px 0'
    >
      <Box w='350px'>
        <Text fontSize='2xl' fontWeight='light' textAlign='center'>
          Player customization
        </Text>
      </Box>

      <Flex padding='15px 0' gap='15px'>
        <Box w='150px'>
          <Text fontSize='md' fontWeight='light' textAlign='center'>
            Player 1
          </Text>

          <Text fontSize='md' fontWeight='light'>
            Color
          </Text>
          <Input
            placeholder={player1.color}
            onChange={e => setPlayer1ColorInputValue(e.currentTarget.value)}
          />

          <Text fontSize='md' fontWeight='light'>
            Name
          </Text>
          <Input
            placeholder={player1.name}
            onChange={e => setPlayer1NameInputValue(e.currentTarget.value)}
          />
        </Box>

        <Box w='150px'>
          <Text fontSize='md' fontWeight='light' textAlign='center'>
            Player 2
          </Text>

          <Text fontSize='md' fontWeight='light'>
            Color
          </Text>
          <Input
            placeholder={player2.color}
            onChange={e => setPlayer2ColorInputValue(e.currentTarget.value)}
          />

          <Text fontSize='md' fontWeight='light'>
            Name
          </Text>
          <Input
            placeholder={player2.name}
            onChange={e => setPlayer2NameInputValue(e.currentTarget.value)}
          />
        </Box>
      </Flex>

      <Button onClick={handleSave}>Save</Button>
    </Flex>
  );
};

export default GameCustomization;
