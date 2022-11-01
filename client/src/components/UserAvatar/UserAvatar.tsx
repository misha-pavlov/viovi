import React, { FC } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type TUserAvatar = {
  url?: string;
  username?: string;
  size: number;
};

const UserAvatar: FC<TUserAvatar> = ({ url, username, size }) => {
  if (url) {
    return <img src={url} alt={username} width={size} />;
  }

  return <AccountCircleIcon fontSize="large" />;
};

export default UserAvatar;
