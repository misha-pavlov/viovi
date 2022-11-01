import styled from 'styled-components';
import { DefaultText } from '../../../../../../config/fonts';
import { colors } from '../../../../../../config/colors';

export const ChatItemBlock = styled.div<{ isMyMessage: boolean }>`
  display: flex;
  justify-content: ${({ isMyMessage }) => (isMyMessage ? `flex-end` : `flex-start`)};
  margin-bottom: 10px;
`;

export const ChatText = styled(DefaultText)`
  color: ${colors.white1};
  background-color: ${colors.black};
  padding: 5px;
  border-radius: 8px;
  max-width: 250px;
  word-break: break-word;
  margin-left: 5px;
`;
