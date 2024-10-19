import { coord } from '@shared/helpers/grid';
import { Flex, Grid } from '@styled/jsx';
import { BoardState } from '../services/BoardState';
import { Cell } from './Cell';

interface Props {
  board: BoardState;
  onSelectColumn(column: number): void;
}

export function Board({ board, onSelectColumn }: Props) {
  return (
    <Flex
      width="full"
      flexDirection="column"
      gap="1px"
      bg="indigo.900"
      border="1px solid"
      borderColor="indigo.900"
      borderRadius={{ base: 'sm', lg: 'md' }}
    >
      {board.cells.map((row, idx) => {
        return (
          <Grid
            key={idx}
            gap="1px"
            borderRadius={{ base: 'sm', lg: 'md' }}
            gridTemplateColumns="repeat(7, 1fr)"
            onClick={() => onSelectColumn(idx)}
          >
            {row.map((cell) => (
              <Cell key={coord`${[cell.x, cell.y]}`} cell={cell} />
            ))}
          </Grid>
        );
      })}
    </Flex>
  );
}
