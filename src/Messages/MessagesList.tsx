import React, { memo, useState } from "react";
import {
  makeStyles,
  ListItem,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  List,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { getMessages } from "../services/general/general.selectores";

interface Props {}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  secondaryAction: {
    right: "-24px"
  }
}));

const MessagesList: React.FC<Props> = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState([0]);
  const messages = useSelector(getMessages);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <List dense className={classes.root}>
      {messages.map(({ id, text, createdBy, date }) => {
        const labelId = `checkbox-list-secondary-label-${id}`;
        return (
          <ListItem key={id} button>
            <ListItemAvatar>
              <Avatar alt={`NS`} />
            </ListItemAvatar>
            <ListItemText
              id={labelId}
              primary={<Typography variant="caption">{createdBy}</Typography>}
              secondary={<Typography variant="body2">{text}</Typography>}
            />
            <ListItemSecondaryAction
              classes={{ root: classes.secondaryAction }}
            >
              <Typography variant="caption">
                {new Date(date).toLocaleTimeString()}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default memo(MessagesList);
