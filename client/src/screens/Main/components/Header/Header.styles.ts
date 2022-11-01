import styled from 'styled-components';
import { colors } from '../../../../config/colors';
import { DefaultText } from '../../../../config/fonts';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
`;

export const Logo = styled(DefaultText)`
  font-size: 32px !important;
  font-weight: 700;
  color: ${colors.white};
  cursor: pointer;
`;

export const UserNameText = styled(DefaultText)`
  color: ${colors.white};
  margin-left: 5px;
`;
