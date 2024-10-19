import { coord } from '@shared/helpers/grid';
import { Box, Circle } from '@styled/jsx';
import { Square } from '@ui/Square';
import { CellState } from '../services/CellState';

interface Props {
  cell: CellState;
}

export function Cell({ cell }: Props) {
  const { x, y, token } = cell;
  const cellPos = coord`${[x, y]}`;

  return (
    <Square
      data-key={cellPos}
      bg="sky.100"
      borderRadius={{ base: 'sm', lg: 'md' }}
      className="cell"
    >
      <Box height="full" width="full" p="10%">
        <Circle
          height="full"
          width="full"
          bg={token ? `${token}.500` : 'white'}
        />
      </Box>
    </Square>
  );
}
