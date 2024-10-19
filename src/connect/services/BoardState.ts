import { generateMatrix } from '@shared/helpers/grid';
import { Token } from '../types';
import { CellState } from './CellState';

const BOARD_SIZE = 7;

export class BoardState {
  public cells: Array<Array<CellState>>;

  constructor() {
    this.cells = generateMatrix(BOARD_SIZE, (x, y) => new CellState({ x, y }));
  }

  dropToken(x: number, token: Token) {
    if (this.cells[x][0].token) {
      return;
    }
    let curr = 0;

    while (this.cells[x][curr].token) {
      curr++;
    }
    this.cells[x][curr].set(token);
    console.log(this.cells[x][curr]);
  }
}
