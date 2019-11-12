import React,{useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import {Pcontext} from './game'
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

export default function DialogSelect() {
    const classes = useStyles();
    const {  dispatch } = useContext(Pcontext);
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");

    const handleChange = event => {
      setName(event.target.value)
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setName('')
        setOpen(false);
    };
    const handleSave = () => {
      if (name.length > 0){
        dispatch({type:'addGameName', payload: name})
      }
        setOpen(false);
    };

    return (
        <div>
                <Tooltip title="Add Name">               
            <Fab
                size="small"
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={handleClickOpen}
            >
                <AddIcon />
            </Fab>
            
                </Tooltip>               
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <form className={classes.container}>
                        <div>
                            <TextField
                                autoComplete='off'
                                id="standard-basic"
                                className={classes.textField}
                                label="New Name"
                                margin="normal"
                                value={name}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
