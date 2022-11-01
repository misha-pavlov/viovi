import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import { AlertTitle } from '@mui/material';
import { Container, MainWindow } from '../../Main.styles';
import { HeaderText, CssTextField, Form, FormButton, FormAlert } from './Forms.styles';
import { SIGN_IN } from './Forms.mutations';
import { constants } from '../../../../config/constants';
import { Context } from '../../../../store/Store';
import { actionCases } from '../../../../store/actionCases';
import { TChangeScreen } from '../../Main.types';

const DEFAULT_FORM = { email: '', password: '' };

const SignIn = ({ changeScreen }: TChangeScreen) => {
  const { dispatch } = useContext(Context);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [showError, setShowError] = useState<boolean | string>(false);

  const onComplete = useCallback(
    (token: string) => {
      dispatch({ type: actionCases.IS_USER_LOGGED_IN, payload: true });
      localStorage.setItem(constants.localStorageKeys.authToken, token);
      setForm(DEFAULT_FORM);
      changeScreen(constants.mainPageScreens.main);
    },
    [changeScreen, dispatch]
  );

  const [mutate] = useMutation(SIGN_IN, {
    onCompleted: e => onComplete(e.SignIn.token),
    onError: error => setShowError(error.message),
  });

  const disabledButton = useMemo(() => {
    return form.email === '' || form.password === '';
  }, [form.email, form.password]);

  const onSubmit = useCallback(async () => {
    if (!disabledButton) {
      await mutate({
        variables: {
          input: { email: form.email, password: form.password },
        },
      });
    } else if (form.email === '' || form.password === '') {
      setShowError(constants.errors.requiredFields);
    }
  }, [disabledButton, form.email, form.password, mutate]);

  useEffect(() => {
    if (showError) {
      setTimeout(() => setShowError(false), 5000);
    }
  }, [showError]);

  return (
    <Container>
      {showError && (
        <FormAlert severity="error" onClose={() => setShowError(false)}>
          <AlertTitle>Error</AlertTitle>
          {showError}
        </FormAlert>
      )}
      <MainWindow>
        <HeaderText>Sign in</HeaderText>

        <Form>
          <CssTextField
            id="email"
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <CssTextField
            id="password"
            label="Password"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={{ marginBottom: 20 }}
          />
        </Form>

        <FormButton size="small" variant="contained" onClick={onSubmit}>
          Sign in
        </FormButton>
      </MainWindow>
    </Container>
  );
};

export default SignIn;
