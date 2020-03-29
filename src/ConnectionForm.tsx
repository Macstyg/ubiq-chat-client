import React, { memo, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  createStyles,
  CircularProgress
} from "@material-ui/core";
import useActionCreator from "./hooks/useActionCreator";
import { openStreamRequest } from "./services/general/general.actions";
import { useSelector } from "react-redux";
import { getLoading } from "./services/general/general.selectores";
import { useHistory } from "react-router-dom";

interface Props {}

const useStyles = makeStyles(
  createStyles({
    root: {
      background: "white"
    },
    form: {
      display: "block",
      width: "100%"
    }
  })
);

const ConnectionForm: React.FC<Props> = ({}) => {
  const [userName, setUserName] = useState("");
  const { root, form } = useStyles();
  const history = useHistory();
  const createConnection = useActionCreator(openStreamRequest);
  const loading = useSelector(getLoading);

  const handleUserNameChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const value = e.target.value;
    setUserName(value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    createConnection({ userName, history });
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      className={form}
    >
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={4}>
          <TextField
            classes={{ root }}
            fullWidth
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={userName}
            onChange={handleUserNameChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress /> : "Login"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(ConnectionForm);
