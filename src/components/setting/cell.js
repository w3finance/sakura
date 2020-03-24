import React from "react";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from "@material-ui/core/styles/makeStyles";

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
    }
}));

function SettingCell(props) {
    const {title, subTitle, icon, onClick, margin} = props;
    const classes = useStyles();
    return (
        <Grid container alignItems="center"
              style={{
                  height: '60px',
                  width: '800px',
                  background: '#FFF',
                  marginTop: margin ? '30px' : 0,
                  cursor: 'pointer',
              }}
              onClick={onClick ? onClick : null}>
            <Typography className={classes.title} style={{paddingLeft: '30px'}}>
                {title}
            </Typography>
            {
                subTitle ?
                    <Typography className={classes.subTitle}>
                        {subTitle}
                    </Typography>
                    :
                    null
            }
            <IconButton style={{backgroundColor: 'transparent'}} className={classes.icon}>
                {icon ? icon : null}
            </IconButton>
        </Grid>
    )
}

export default React.memo(SettingCell)
