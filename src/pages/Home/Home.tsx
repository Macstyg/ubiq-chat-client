import React, { memo, useEffect } from "react";
import logo from "../../logo.svg";
import ConnectionForm from "../../components/ConnectionForm";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";
import { getError } from "../../services/general/general.selectores";
import { resetErrorMessage } from "../../services/general/general.actions";
import useActionCreator from "../../hooks/useActionCreator";

interface Props {}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Home: React.FC<Props> = () => {
  const [open, setOpen] = React.useState(false);
  const error = useSelector(getError);
  const resetError = useActionCreator(resetErrorMessage);

  useEffect(() => {
    error && setOpen(true);
  }, [error]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    resetError();
    setOpen(false);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <p>Enter you user name and click login button</p>
        <ConnectionForm />
      </main>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default memo(Home);
