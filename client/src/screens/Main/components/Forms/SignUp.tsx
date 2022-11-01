import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import { AlertTitle } from '@mui/material';
import validator from 'validator';
import { Container, MainWindow } from '../../Main.styles';
import { HeaderText, CssTextField, Form, FormButton, FormAlert } from './Forms.styles';
import { SIGN_UP } from './Forms.mutations';
import { constants } from '../../../../config/constants';
import { Context } from '../../../../store/Store';
import { actionCases } from '../../../../store/actionCases';
import { TChangeScreen } from '../../Main.types';

const DEFAULT_FORM = { email: '', username: '', password: '', confirmPassword: '' };

const SignUp = ({ changeScreen }: TChangeScreen) => {
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

  const [mutate] = useMutation(SIGN_UP, {
    onCompleted: e => onComplete(e.SignUp.token),
    onError: error => setShowError(error.message),
  });

  const disabledButton = useMemo(() => {
    return (
      form.email === '' ||
      form.password === '' ||
      form.username === '' ||
      form.password !== form.confirmPassword ||
      !validator.isEmail(form.email)
    );
  }, [form.confirmPassword, form.email, form.password, form.username]);

  const onSubmit = useCallback(async () => {
    if (!disabledButton) {
      await mutate({
        variables: {
          input: { email: form.email, username: form.username, password: form.password },
        },
      });
    } else if (form.password !== form.confirmPassword) {
      setShowError(constants.errors.confirmPassword);
    } else if (form.email === '' || form.password === '' || form.username === '') {
      setShowError(constants.errors.requiredFields);
    } else if (!validator.isEmail(form.email)) {
      setShowError(constants.errors.noValidEmail);
    }
  }, [disabledButton, form.confirmPassword, form.email, form.password, form.username, mutate]);

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
        <HeaderText>Sign up</HeaderText>

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
            id="username"
            label="Username"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
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
          />
          <CssTextField
            id="confirm_your_password"
            label="Confirm your password"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            type="password"
            value={form.confirmPassword}
            onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
            style={{ marginBottom: 20 }}
          />
        </Form>

        <FormButton size="small" variant="contained" onClick={onSubmit}>
          Sign up
        </FormButton>
      </MainWindow>
    </Container>
  );
};

export default SignUp;
