import { Token } from '../types';

interface CellStateOptions {
  x: number;
  y: number;
}

export class CellState {
  public x: number;
  public y: number;
  public token: Token | '';

  constructor(opt: CellStateOptions) {
    const { x, y } = opt;
    this.x = x;
    this.y = y;
    this.token = '';
  }

  set(token: Token) {
    this.token = token;
  }
}
