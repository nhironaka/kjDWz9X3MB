import {
  type Dispatch,
  type SetStateAction,
  useLayoutEffect,
  useState,
} from 'react';

import { useMediaQuery } from '@shared/hooks/useMediaQueries';
import { MotionBox } from '@ui/index';
import { Popover } from '@ui/Popover';
import { coord } from '../../helpers';
import type { BoardState } from '../../services/BoardState';
import type { CellState } from '../../services/CellState';
import type { Coord, TokenState, Token as TokenType } from '../../types/board';
import { CellAction } from '../CellActions';
import { Token } from '../Token';
import './token.scss';

interface Props {
  board: BoardState;
  token: TokenType;
  boardRef: HTMLDivElement | null;
  cell: CellState;
  tokenState: TokenState;
  setTokenState: Dispatch<SetStateAction<Record<TokenType, Coord>>>;
}

export function ActiveToken({
  board,
  token,
  boardRef,
  cell,
  tokenState,
  setTokenState,
}: Props) {
  const { x, y } = cell;
  const coordinates = coord`${[x, y]}`;
  const [clientRect, setClientRect] =
    useState<Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>>();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useLayoutEffect(() => {
    const adjustLocation = () => {
      const boardCell = boardRef?.querySelector(`[data-key="${coordinates}"]`);
      const boardInner = boardCell?.querySelector('.inner');
      if (boardCell && boardInner) {
        const { left, top, width, height } = boardCell.getBoundingClientRect();
        const parentElem =
          boardCell instanceof HTMLElement && boardCell.offsetParent;
        const { top: parentTop, left: parentLeft } = parentElem
          ? parentElem.getBoundingClientRect()
          : {
              top: 0,
              left: 0,
            };

        setClientRect({
          width: width - (isDesktop ? 2 : 1),
          height: height - (isDesktop ? 2 : 1),
          top: top + (isDesktop ? 1 : 0) + parentTop * -1,
          left: left + (isDesktop ? 1 : 0) + parentLeft * -1,
        });
      }
    };
    adjustLocation();
    window.addEventListener('resize', adjustLocation);

    return () => {
      window.removeEventListener('resize', adjustLocation);
    };
  }, [coordinates, isDesktop, boardRef]);

  return (
    <Popover
      className="cell-action"
      popoverContent={
        <CellAction
          token={token}
          setTokenState={setTokenState}
          coord={[x, y]}
          board={board}
          tokenState={tokenState}
        />
      }
    >
      <MotionBox
        position="absolute"
        p={isDesktop ? '1' : 'qtr'}
        style={{
          left: clientRect?.left ?? 0,
          top: clientRect?.top ?? 0,
          width: clientRect?.width ?? 0,
          height: clientRect?.height ?? 0,
        }}
      >
        <Token token={token} />
      </MotionBox>
    </Popover>
  );
}
