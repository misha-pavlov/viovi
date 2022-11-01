import React, { FC, useMemo } from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import { IconButton } from '@mui/material';
import { useQuery } from '@apollo/client';
import { IconsBlock, ActionsBlock } from './Actions.styles';
import UserItem from './components/UserItem/UserItem';
import { TActions } from '../../Room.types';
import { GET_USERS_BY_IDS } from '../../Room.queries';
import { GUser } from '../../../../types/User';

const Actions: FC<TActions> = ({ members }) => {
  const { data } = useQuery(GET_USERS_BY_IDS, { variables: { ids: members } });

  const renderMembersList = useMemo(() => {
    return data?.usersByIds.map((u: GUser) => <UserItem key={u._id} userName={u.username} />);
  }, [data?.usersByIds]);

  return (
    <ActionsBlock>
      <IconsBlock>
        <IconButton>
          <VideocamIcon />
        </IconButton>

        <IconButton>
          <MicIcon />
        </IconButton>
      </IconsBlock>

      <div>{renderMembersList}</div>
    </ActionsBlock>
  );
};

export default Actions;
