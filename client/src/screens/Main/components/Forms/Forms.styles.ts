import styled from 'styled-components';
import { Alert, Button, TextField } from '@mui/material';
import { DefaultText } from '../../../../config/fonts';
import { colors } from '../../../../config/colors';

export const HeaderText = styled(DefaultText)`
  font-size: 18px !important;
  text-align: center;
  color: ${colors.white};
  display: block;
  margin-top: 20px;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 25px;
  padding-right: 25px;
`;

export const FormButton = styled(Button)`
  margin-left: 25px !important;
  margin-bottom: 20px !important;
`;

export const FormAlert = styled(Alert)`
  position: absolute;
  top: 50px;
`;

export const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: colors.white,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: colors.white,
  },
  '& .MuiOutlinedInput-root': {
    color: colors.white,
    '& fieldset': {
      borderColor: colors.white,
    },
    '&:hover fieldset': {
      borderColor: colors.white,
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.white,
    },
  },
  '& .MuiInputLabel-outlined': {
    color: colors.white,
  },
});
