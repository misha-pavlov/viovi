import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { HeaderContainer, Logo, UserNameText } from './Header.styles';
import { constants } from '../../../../config/constants';
import useGetUser from '../../../../hooks/useGetUser';
import { Context } from '../../../../store/Store';
import { actionCases } from '../../../../store/actionCases';
import { TChangeScreen } from '../../Main.types';
import UserAvatar from '../../../../components/UserAvatar/UserAvatar';
import { useAppApolloClient } from '../../../../config/connect';

const Header = ({ changeScreen }: TChangeScreen) => {
  const { data, loading } = useGetUser();
  const { state, dispatch } = useContext(Context);
  const client = useAppApolloClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onLogout = useCallback(async () => {
    handleClose();
    await client.clearStore();
    dispatch({ type: actionCases.IS_USER_LOGGED_IN, payload: false });
    localStorage.removeItem(constants.localStorageKeys.authToken);
  }, [client, dispatch, handleClose]);

  const renderButtons = useMemo(() => {
    if (state.isUserLoggedIn) {
      return (
        <>
          <Button onClick={e => handleClick(e)}>
            <UserAvatar url={data?.image} username={data?.username} size={50} />
            <UserNameText>{data?.username}</UserNameText>
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={onLogout}>
              <LogoutIcon fontSize="small" /> Logout
            </MenuItem>
          </Menu>
        </>
      );
    }

    return (
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button
          size="small"
          startIcon={<PersonAddAltIcon fontSize="small" />}
          onClick={() => changeScreen(constants.mainPageScreens.signUp)}
        >
          Sign up
        </Button>
        <Button
          size="small"
          startIcon={<ExitToAppIcon fontSize="small" />}
          onClick={() => changeScreen(constants.mainPageScreens.signIn)}
        >
          Sign in
        </Button>
      </ButtonGroup>
    );
  }, [
    anchorEl,
    changeScreen,
    data?.image,
    data?.username,
    handleClick,
    handleClose,
    onLogout,
    open,
    state.isUserLoggedIn,
  ]);

  return (
    <HeaderContainer>
      <Logo onClick={() => changeScreen(constants.mainPageScreens.main)}>{constants.appName}</Logo>

      <div>{(!loading || data?.username) && renderButtons}</div>
    </HeaderContainer>
  );
};

export default Header;
