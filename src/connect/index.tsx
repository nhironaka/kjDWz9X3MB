import { useState } from 'react';

import { PLAYERS } from '@shared/constants';
import { Player } from '@shared/types';
import { Flex } from '@styled/jsx';
import { Board } from './components/Board';
import { TOKENS } from './constants';
import { BoardState } from './services/BoardState';

export function Game() {
  const [activePlayer, setActivePlayer] = useState<Player>(PLAYERS.ONE);
  const [board] = useState(new BoardState());

  const dropToken = (x: number) => {
    board.dropToken(
      x,
      activePlayer === PLAYERS.ONE ? TOKENS.RED : TOKENS.BLACK,
    );
    setActivePlayer((prev) =>
      prev === PLAYERS.ONE ? PLAYERS.TWO : PLAYERS.ONE,
    );
  };

  return (
    <Flex justifyContent="center" width="full">
      <Flex maxWidth="1200px" width="full" px={{ base: '1', lg: '6' }}>
        <Board board={board} onSelectColumn={dropToken} />
      </Flex>
    </Flex>
  );
}
