import {
  type Dispatch,
  type SetStateAction,
  useLayoutEffect,
  useState,
} from 'react';

import { CellAction } from '@components/CellActions';
import { Token } from '@components/Token';
import { Popover } from '@components/ui/Popover';
import type { BoardState } from '@services/BoardState';
import { coord } from '@shared/helpers';
import type { Coord, Token as TokenType } from '@shared/types';
import { MotionBox } from '../ui';
import './token.scss';

interface Props {
  board: BoardState;
  token: TokenType;
  boardRef: HTMLDivElement | null;
  tokenState: Record<TokenType, Coord>;
  setTokenState: Dispatch<SetStateAction<Record<TokenType, Coord>>>;
}

export function ActiveToken({
  board,
  token,
  boardRef,
  tokenState,
  setTokenState,
}: Props) {
  const coordinates = tokenState[token];
  const [clientRect, setClientRect] =
    useState<Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>>();

  useLayoutEffect(() => {
    const adjustLocation = () => {
      const boardCell = coordinates
        ? boardRef?.querySelector(`[data-key="${coord`${coordinates}`}"]`)
        : false;
      if (boardCell) {
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
          width: width - 2,
          height: height - 2,
          top: top + 1 + parentTop * -1,
          left: left + 1 + parentLeft * -1,
        });
      }
    };
    adjustLocation();
    window.addEventListener('resize', adjustLocation);

    return () => {
      window.removeEventListener('resize', adjustLocation);
    };
  }, [coordinates, boardRef]);

  return (
    <Popover
      className="cell-action"
      popoverContent={
        <CellAction
          token={token}
          setTokenState={setTokenState}
          coord={coordinates}
          board={board}
          tokenState={tokenState}
        />
      }
    >
      <MotionBox
        position="absolute"
        p="1"
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
