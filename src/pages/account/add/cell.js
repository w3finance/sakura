import React from "react";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles(theme => ({
    box: {
        height: '60px',
        width: '740px',
        marginLeft: '30px',
        borderRadius: '5px',
        boxShadow: '0px 0px 5px rgb(16,16,16,.4)',
        cursor: 'pointer'
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
        marginRight: '18px',
    },
    line: {
        height: 1,
        width: "740px",
        background: 'rgba(16,16,16,.1)',
        marginLeft: '30px',
    }
}));

function AddCell(props) {
    const {title, onClick, style} = props;
    const classes = useStyles();
    return (
        <Grid container alignItems="center" className={classes.box} onClick={onClick ? onClick : null} style={style}>
            <Grid item className={classes.title} style={{paddingLeft: '30px'}}>
                <Typography>
                    {title}
                </Typography>
            </Grid>

            <Grid item className={classes.icon}>
                <IconButton style={{backgroundColor: 'transparent'}}>
                    <NavigateNextIcon style={{color: "rgba(16,16,16,.5)"}}/>
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default React.memo(AddCell)
