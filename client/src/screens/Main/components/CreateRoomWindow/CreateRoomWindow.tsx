import React, { useCallback } from 'react';
import Typewriter from 'typewriter-effect';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { TextBlock } from './CreateRoomWindow.styles';
import { Container, MainWindow } from '../../Main.styles';
import { constants } from '../../../../config/constants';
import { CREATE_ROOM } from './CreateRoomWindow.mutations';

const keyStartWords = ['spend time', 'watch', 'enjoy', 'listen', 'love'];

const CreateRoomWindow = () => {
  const navigate = useNavigate();
  const [mutate] = useMutation(CREATE_ROOM, {
    onCompleted: e => navigate(`${constants.routes.room}/${e.createRoom._id}`),
    onError: e => console.log(e),
  });

  const onClick = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return (
    <Container>
      <MainWindow isMainPage>
        <TextBlock>
          <Typewriter
            options={{
              strings: keyStartWords,
              autoStart: true,
              loop: true,
            }}
          />
          <span>together</span>
        </TextBlock>

        <Button size="large" variant="contained" onClick={onClick}>
          Create your room
        </Button>
      </MainWindow>
    </Container>
  );
};

export default CreateRoomWindow;
