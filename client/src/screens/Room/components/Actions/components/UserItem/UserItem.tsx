import React, { FC } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { UserItemBlock, UserItemText } from './UserItem.styles';
import { TUserItem } from '../../../../Room.types';

const UserItem: FC<TUserItem> = ({ userName }) => {
  return (
    <UserItemBlock>
      <PersonIcon />
      <UserItemText size={12}>{userName}</UserItemText>
    </UserItemBlock>
  );
};

export default UserItem;
