import React from "react";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from "@material-ui/core/styles/makeStyles";
import ArrowBack from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
        color: 'rgba(16,16,16,.1)',
        minWidth: '20%',
    },
    icon: {
        paddingRight: '18px',
        WebkitAppRegion: 'no-drag'
    },
    lfIcon: {
        paddingLeft: '18px',
        WebkitAppRegion: 'no-drag'
    }
}));

function Header(props) {
    const {lfIcon, goBack, title, icon, onClick, bg} = props;
    const classes = useStyles();
    return (
        <Grid container alignItems="center"
              style={{height: '15vh',background: bg ? '#3f51b5' : '#FCFCFC',WebkitAppRegion: 'drag'}}>
            {
                lfIcon ?
                    <Grid item className={classes.lfIcon}>
                        <IconButton aria-label="back" style={{backgroundColor: 'transparent'}}
                                    onClick={goBack}>
                            <ArrowBack style={{color: bg ? '#FFF' : 'rgba(16,16,16,1)'}}/>
                        </IconButton>
                    </Grid>
                    :
                    null
            }
            <Grid item className={classes.title} style={{paddingLeft: lfIcon ? '0px' : '30px'}}>
                <Typography style={{fontSize: 22, color: bg ? '#FFF' : 'rgba(16,16,16,1)'}}>
                    {title}
                </Typography>
            </Grid>
            <Grid item className={classes.icon}>
                <IconButton aria-label="settings" style={{backgroundColor: 'transparent'}}
                            onClick={onClick}>
                    {icon ? icon : null}
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default React.memo(Header)
