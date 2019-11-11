import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import { Pcontext } from "./game";

const useStyles = makeStyles(theme => ({
    grid: {display: 'flex'},
    button: {
        margin: theme.spacing(1)
    }
}));

export default function PButton({ state, action ,stateSum}) {
    const {dispatch} = useContext(Pcontext);
    const classes = useStyles();

    function addPosibilities (newAction){
        let newPayloadState = {[stateSum]: newAction }
        dispatch({type:'addPosibilities', payload: newPayloadState })
    }

    return (
        <>
            <Grid item justify='center' wrap="wrap" alignContent='stretch' xs={12} md={6} >
              <Grid container spacing={1} direction="column" alignItems="left" >
                <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                >
                    <Button disabled={!(state.current === 'trash')}
                        variant="contained"
                        color={action ==='getTrash'?"primary": ""}
                        className={classes.button}
                        onClick={()=> addPosibilities('getTrash')}
                    >
                        Get Trash
                    </Button>
                </ButtonGroup>
                </Grid>
                <Grid container spacing={3}  direction="column" alignItems="left">
                <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                >
                    <Button disabled={state.up === 'wall'}
                        variant="contained"
                        color={action === 'up'? "primary": ""}
                        className={classes.button}
                        onClick={()=> addPosibilities('up')}
                    >
                        Up
                    </Button>
                    <Button disabled={state.down === 'wall'}
                        variant="contained"
                        color={action === 'down'? "primary": ""}
                        className={classes.button}
                        onClick={()=> addPosibilities('down')}
                    >
                        Down
                    </Button>
                    <Button disabled={state.left === 'wall'}
                        variant="contained"
                        className={classes.button}
                        color={action === 'left' ? "primary" : ""}
                        onClick={()=> addPosibilities('left')}
                    >
                         Left
                    </Button>
                    <Button disabled={state.right === 'wall'}
                        variant="contained"
                        color={action === 'right'? "primary": ""}
                        className={classes.button}
                        onClick={()=> addPosibilities('right')}
                    >
                        Right
                    </Button>
                    <Button
                        variant="contained"
                        color={action === 'random'? "primary": ""}
                        className={classes.button}
                        onClick={()=> addPosibilities('random')}
                    >
                        Random
                    </Button>
        </ButtonGroup>
        </Grid>               
      </Grid>
        </>
    );
}
