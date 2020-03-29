import React, { memo } from "react";
import { IconButton } from "@material-ui/core";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import MessagesList from "./MessagesList";
import SendMessage from "./SendMessage";
import {
  getConnected,
  getLoading
} from "../../services/general/general.selectores";
import useActionCreator from "../../hooks/useActionCreator";
import { closeStreamRequest } from "../../services/general/general.actions";

interface Props {}

const Messages: React.FC<Props> = () => {
  const connected = useSelector(getConnected);
  const loading = useSelector(getLoading);
  const closeStream = useActionCreator(closeStreamRequest);

  if (!connected && !loading) {
    return <Redirect to={{ pathname: "/" }} />;
  }
  const handleIconCloseClick = () => {
    closeStream();
  };
  return (
    <>
      <IconButton
        edge="end"
        aria-label="disconnect"
        size="medium"
        onClick={handleIconCloseClick}
      >
        <CloudOffIcon />
      </IconButton>
      <MessagesList />
      <SendMessage />
    </>
  );
};

export default memo(Messages);
