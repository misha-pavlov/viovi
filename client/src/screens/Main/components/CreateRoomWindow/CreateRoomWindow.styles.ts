import styled from 'styled-components';
import { colors } from '../../../../config/colors';
import { DefaultText } from '../../../../config/fonts';

export const TextBlock = styled(DefaultText)`
  font-size: 3em !important;
  line-height: 1.5em;
  display: flex;
  margin-bottom: 35px;
  color: ${colors.white};
`;
