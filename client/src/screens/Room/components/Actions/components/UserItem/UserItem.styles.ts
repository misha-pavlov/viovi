import styled from 'styled-components';
import { DefaultText } from '../../../../../../config/fonts';
import { colors } from '../../../../../../config/colors';

export const UserItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
`;

export const UserItemText = styled(DefaultText)`
  color: ${colors.white1};
  padding-left: 5px;
`;
