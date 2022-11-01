import styled from 'styled-components';
import { Alert } from '@mui/material';
import { colors } from '../../../../config/colors';
import { DefaultText } from '../../../../config/fonts';

export const RoomHeaderContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.black1};
  position: relative;
`;

export const RoomLink = styled(DefaultText)<{ isLinkText?: boolean }>`
  color: ${({ isLinkText }) => (isLinkText ? colors.white : colors.pink)};
  cursor: ${({ isLinkText }) => (isLinkText ? 'arrow' : 'pointer')};
  ${({ isLinkText }) => isLinkText && `padding-right: 5px`}
`;

export const CopiedAlert = styled(Alert)`
  position: absolute;
  top: 55px;
  right: 20px;
  z-index: 10000;
`;
