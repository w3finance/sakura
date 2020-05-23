import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from '@material-ui/core/IconButton';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';

function AccountAction(props) {
    const classes = useStyles();

    return (
        <Box className={classes.account} onClick={() => {}}>
            <IconButton style={{width: '50px', height: '50px', backgroundColor: '#C785ED', marginRight: '2vw'}}>
                <CallMadeIcon style={{color: "#FFF"}} fontSize='small'/>
            </IconButton>
            <IconButton style={{width: '50px', height: '50px', backgroundColor: '#C785ED', marginLeft: '2vw'}}>
                <CallReceivedIcon style={{color: "#FFF"}} fontSize='small'/>
            </IconButton>
        </Box>
    )
}

const useStyles = makeStyles(theme => ({
    account: {
        width: '100vw',
        height: '80px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

export default React.memo(AccountAction)
