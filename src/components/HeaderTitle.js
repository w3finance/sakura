import React from "react";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    box: {
        width: "100%",
        height: 60,
    },
    title: {
        flexGrow: 1,
        color: "white",
        minWidth: "40%",
        paddingLeft: theme.spacing(2),
    },
    setting: {
        paddingRight: theme.spacing(2),
    }
}));

function HeaderTitle(props) {
    const {title, icon, onClick} = props;
    const classes = useStyles();
    return (
        <div className={classes.box}>
            <Grid container alignItems="center" style={{backgroundColor: "transparent", height: "100%"}}>
                <Grid item className={classes.title}>
                    <Typography style={{fontSize: 22}}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item className={classes.setting}>
                    <IconButton style={{backgroundColor: "transparent"}} onClick={onClick}>
                        {icon ? icon : null}
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}

export default React.memo(HeaderTitle)
