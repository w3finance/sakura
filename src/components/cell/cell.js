import React from "react";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
        marginRight: '18px',
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
        <Grid container alignItems="center" style={{height: '60px', width: '800px'}} onClick={onClick ? onClick : null}>
            <Grid item className={classes.title} style={{paddingLeft: '30px'}}>
                <Typography>
                    {title}
                </Typography>
            </Grid>
            {
                subTitle ?
                    <Grid item className={classes.subTitle}>
                        <Typography>
                            {subTitle}
                        </Typography>
                    </Grid>
                    :
                    null
            }
            <Grid item className={classes.icon}>
                <IconButton style={{backgroundColor: 'transparent'}}>
                    {icon ? icon : null}
                </IconButton>
            </Grid>
            {line ? <div className={classes.line}/> : null}
        </Grid>
    )
}

export default React.memo(Cell)
