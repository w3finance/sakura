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
        color: "black",
        minWidth: "20%",
        paddingLeft: '30px',
    },
    icon: {
        paddingRight: '30px',
    },
    lfIcon: {
        paddingLeft: '30px',
    }
}));

function Cell(props) {
    const { title, subTitle, icon, onClick,} = props;
    const classes = useStyles();
    return (
        <div className={classes.box}>
            <Grid container alignItems="center" style={{backgroundColor: "transparent", height: "100%"}}>
                <Grid item className={classes.title} style={{paddingLeft: '30px'}}>
                    <Typography style={{fontSize: 16 , color: 'rgb(0,0,0.5)'}}>
                        {title}
                    </Typography>
                </Grid>
                {
                    subTitle ?
                    <Grid item className={classes.title} style={{paddingLeft: '30px'}}>
                        <Typography style={{fontSize: 16 , color: 'rgb(0,0,0.5)'}}>
                            {subTitle}
                        </Typography>
                    </Grid>
                    :
                    null
                }
                <Grid item className={classes.icon}>
                    <IconButton style={{backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0}}>
                        {icon ? icon : null}
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}

export default React.memo(Cell)
