import React, { useCallback, useMemo, useState } from 'react';
import { ContentWrapper, MainBlock } from './Main.styles';
import Header from './components/Header/Header';
import CreateRoomWindow from './components/CreateRoomWindow/CreateRoomWindow';
import { constants } from '../../config/constants';
import SignUp from './components/Forms/SignUp';
import SignIn from './components/Forms/SignIn';

const Main = () => {
  const [screen, setScreen] = useState(constants.mainPageScreens.main);

  const changeScreen = useCallback((screenName: string) => {
    setScreen(screenName);
  }, []);

  const showScreen = useMemo(() => {
    if (screen === constants.mainPageScreens.main) {
      return <CreateRoomWindow />;
    } else if (screen === constants.mainPageScreens.signUp) {
      return <SignUp changeScreen={changeScreen} />;
    }

    return <SignIn changeScreen={changeScreen} />;
  }, [changeScreen, screen]);

  return (
    <MainBlock>
      <ContentWrapper>
        <Header changeScreen={changeScreen} />
        {showScreen}
      </ContentWrapper>
    </MainBlock>
  );
};

export default Main;
