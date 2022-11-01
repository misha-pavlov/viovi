import styled from 'styled-components';
import { colors } from '../../config/colors';

export const RoomContainer = styled.div`
  padding: 0 20px 20px 20px;
  background-color: ${colors.grey};
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

export const LoadingBlock = styled.div<{ isChat?: boolean }>`
  display: flex;
  justify-content: center;
  padding-top: ${({ isChat }) => (isChat ? 0 : 50)}px;
  background-color: ${colors.grey};
  height: ${({ isChat }) => (isChat ? '50px' : '100vh')};
`;

export const VioviInput = styled.input<{ width?: number }>`
  color: ${colors.white1};
  background-color: transparent;
  padding: 8px 0;
  font-size: 14px;
  border-width: 0 0 1px 0;
  border-bottom-color: ${colors.white1};
  width: ${({ width }) => (width ? width : 450)}px;

  &:focus {
    outline: none;
  }
`;

export const PlayerBlock = styled.div`
  min-height: 750px;
  max-height: 850px;
  width: 70%;
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

export const ChatBlock = styled.div``;

export const ActionsBlock = styled.div``;

export const FlexBlock = styled.div<{ withAlignItems?: boolean }>`
  display: flex;
  box-sizing: border-box;
  ${({ withAlignItems }) => withAlignItems && `align-items: center`}
`;
