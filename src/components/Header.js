import React from "react";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import ArrowBack from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
    box: {
        width: "100%",
        height: 100,
    },
    title: {
        flexGrow: 1,
        color: "black",
        minWidth: "20%",
    },
    icon: {
        paddingRight: '30px',
    },
    lfIcon: {
        paddingLeft: '30px',
    }
}));

function Header(props) {
    const {lfIcon, goBack, title, icon, onClick, bg} = props;
    const classes = useStyles();
    return (
        <div className={classes.box}
             style={{background: bg ? '#4664DC' : 'transparent'}}>
            <Grid container alignItems="center" style={{height: "100%"}}>
                {
                    lfIcon ?
                        <Grid item className={classes.lfIcon}>
                            <IconButton style={{backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0}}
                                        onClick={goBack}>
                                <ArrowBack style={{color: bg ? '#FFF' : 'rgb(0,0,0.5)'}}/>
                            </IconButton>
                        </Grid>
                        :
                        null
                }
                <Grid item className={classes.title} style={{paddingLeft: lfIcon ? '10px' : '30px'}}>
                    <Typography style={{fontSize: 22, color: bg ? '#FFF' : 'rgb(0,0,0.5)'}}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item className={classes.icon}>
                    <IconButton style={{backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0}}
                                onClick={onClick}>
                        {icon ? icon : null}
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}

export default React.memo(Header)
