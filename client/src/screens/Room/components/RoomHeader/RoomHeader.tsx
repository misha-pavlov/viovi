import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { IconButton, MenuItem, Select } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { CopiedAlert, RoomHeaderContainer, RoomLink } from './RoomHeader.styles';
import { VioviInput } from '../../Room.styles';
import { messages } from '../../../../config/messages';
import { constants } from '../../../../config/constants';
import { TRoomHeader } from '../../Room.types';
import { ROOM_TYPES_ENUM } from '../../../../types/Room';

const RoomHeader: FC<TRoomHeader> = ({
  videoUrl,
  selectorValue,
  updateRoomVideoUrl,
  updateRoomType,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();
  const link = window.location.href;

  const onCopyClick = useCallback(() => {
    if (!isCopied) {
      navigator.clipboard.writeText(link).then(() => setIsCopied(true));
    }
  }, [isCopied, link]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [isCopied]);

  const renderInput = useMemo(() => {
    return (
      <VioviInput
        value={videoUrl}
        disabled={selectorValue === ROOM_TYPES_ENUM.SHARING_SCREEN}
        onChange={e => updateRoomVideoUrl(e.target.value)}
        placeholder={
          selectorValue === ROOM_TYPES_ENUM.YOU_TUBE
            ? messages.inputPlaceholders.searchYouTube
            : messages.inputPlaceholders.noNeedLink
        }
      />
    );
  }, [selectorValue, updateRoomVideoUrl, videoUrl]);

  return (
    <RoomHeaderContainer>
      <IconButton onClick={() => navigate(constants.routes.main)}>
        <ArrowBackIosNewIcon />
      </IconButton>

      <div>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectorValue}
          size="small"
          variant="standard"
          onChange={e => updateRoomType(e.target.value as ROOM_TYPES_ENUM)}
        >
          <MenuItem value={ROOM_TYPES_ENUM.YOU_TUBE}>YouTube</MenuItem>
          <MenuItem value={ROOM_TYPES_ENUM.SHARING_SCREEN}>ScreenShare</MenuItem>
        </Select>
        {renderInput}
      </div>

      <div>
        <RoomLink isLinkText>Room Link:</RoomLink>
        <RoomLink onClick={onCopyClick}>{link}</RoomLink>
      </div>

      {isCopied && (
        <CopiedAlert severity="success" onClose={() => setIsCopied(false)}>
          Copied
        </CopiedAlert>
      )}
    </RoomHeaderContainer>
  );
};

export default RoomHeader;
