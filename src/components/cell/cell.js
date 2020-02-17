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
        minWidth: "20%",
        paddingLeft: '30px',
        fontSize: 16,
        color: 'rgba(16,16,16,1)'
    },
    subTitle: {
        fontSize: 16,
        color: 'rgba(16,16,16,.5)'
    },
    icon: {
        marginRight: '30px',
    },
    line: {
        height: 1,
        width: "740px",
        background: 'rgba(16,16,16,.1)',
        marginLeft: '30px',
    }
}));

function Cell(props) {
    const {title, subTitle, icon, line, onClick} = props;
    const classes = useStyles();
    return (
        <div className={classes.box}>
            <Grid container alignItems="center" style={{height: "100%"}} onClick={onClick ? onClick : null}>
                <Grid item className={classes.title} style={{paddingLeft: '30px'}}>
                    <Typography>
                        {title}
                    </Typography>
                </Grid>
                {
                    subTitle ?
                        <Grid item className={classes.subTitle} style={{paddingRight: '10px'}}>
                            <Typography>
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
                {line ? <div className={classes.line}/> : null}
            </Grid>
        </div>
    )
}

export default React.memo(Cell)
