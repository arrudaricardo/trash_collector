import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { NavLink } from "react-router-dom";
import BuildIcon from '@material-ui/icons/Build';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import LineStyleIcon from '@material-ui/icons/LineStyle';
import GitHubIcon from '@material-ui/icons/GitHub';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: "center",
        flexWrap: "wrap"
    },
    paper: {
        display: 'flex',
        padding: theme.spacing(1, 2)
    },
    github: {
        marginLeft: "auto",
    },
    icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const selected = {
    color: "rgb(196, 96, 29"
};

export default () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Breadcrumbs aria-label="breadcrumb">
                    <NavLink exact activeStyle={selected} to="/">
                        <ViewComfyIcon className={classes.icon} />
                        Game
                    </NavLink>

                    <NavLink activeStyle={selected} to="/state">
                        <BuildIcon className={classes.icon}/>
                        Build
                    </NavLink>

                    <NavLink activeStyle={selected} to="/results">
                        <InsertChartIcon className={classes.icon}/>
                        Results
                    </NavLink>

                    <NavLink activeStyle={selected} to="/selection">
                        <BlurCircularIcon className={classes.icon}/>
                        Selection
                    </NavLink>
                </Breadcrumbs>
                    <IconButton onClick={() => window.open('https://github.com/arrudaricardo/trash_collector', '_blank')}size="small" className={classes.github}>
                        <GitHubIcon color="action"/>
                    </IconButton>
            </Paper>
            <br />
        </div>
    );
};
