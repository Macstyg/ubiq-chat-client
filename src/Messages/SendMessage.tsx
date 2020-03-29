import React, { memo, useState } from "react";
import { TextField, makeStyles, Button, Grid } from "@material-ui/core";
import useActionCreator from "../hooks/useActionCreator";
import { sendMessageRequest } from "../services/general/general.actions";

interface Props {}

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const SendMessage: React.FC<Props> = () => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const sendMessage = useActionCreator(sendMessageRequest);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };
  const handleMessageChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const value = e.target.value;
    setMessage(value);
  };
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Grid container spacing={3} justify="flex-start" alignItems="center">
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Message"
            variant="outlined"
            value={message}
            onChange={handleMessageChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(SendMessage);
