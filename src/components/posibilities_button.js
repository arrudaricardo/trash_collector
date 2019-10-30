import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    },
    input: {
        display: "none"
    }
}));

export default function PButton({ state }) {
    const classes = useStyles();

    return (
        <>
            <Grid item  xs={12} md={6} >
              <Grid container spacing={1} direction="column" alignItems="left" >
                <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                >
                    <Button disabled={!(state.current === 'trash')}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Get Trash
                    </Button>
                </ButtonGroup>
                </Grid>
                <Grid container spacing={3} direction="column" alignItems="left">
                <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                >
                    <Button disabled={state.up === 'wall'}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Up
                    </Button>
                    <Button disabled={state.down === 'wall'}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Down
                    </Button>
                    <Button disabled={state.left === 'wall'}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                         Left
                    </Button>
                    <Button disabled={state.right === 'wall'}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Right
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Random
                    </Button>
        </ButtonGroup>
        </Grid>               
      </Grid>
        </>
    );
}
