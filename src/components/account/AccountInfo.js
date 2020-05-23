import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';
import makeStyles from "@material-ui/core/styles/makeStyles";
import LaunchIcon from '@material-ui/icons/Launch';
import CameraIcon from '@material-ui/icons/Camera';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

function AccountInfo(props) {
    const classes = useStyles();

    return (
        <Box className={classes.account} style={{background: '#C785ED'}} onClick={() => {}}>
            <Box className={classes.topBox}>
                <Box className={classes.tokenDecimals}>
                    0.00
                </Box>
                <Box className={classes.tokenSymbol}>
                    {'KSM'}
                </Box>
                <Box style={{flex: 1, display: 'flex', justifyContent: 'flex-end', marginRight: '2vw'}}>
                    <LaunchIcon style={{color: "#FFF"}} fontSize='small'/>
                </Box>
            </Box>
            <Box className={classes.bottomBox}>
                <Box className={classes.address}>
                    {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'}
                </Box>
                <CameraIcon style={{color: "#FFF", marginLeft: '6px'}} fontSize='small'/>
                <Box style={{flex: 1, display: 'flex', justifyContent: 'flex-end', marginRight: '2vw'}}>
                    <CloudDownloadIcon style={{color: "#FFF"}} fontSize='small'/>
                    <Typography className={classes.restore}>Restore</Typography>
                </Box>
            </Box>
        </Box>
    )
}

const useStyles = makeStyles(theme => ({
    account: {
        width: '92vw',
        height: '100px',
        borderRadius: '5px',
        marginTop: 0,
        marginLeft: '4vw',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column'
    },
    topBox: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomBox: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    tokenDecimals: {
        color: '#FFF',
        fontSize: '15px',
        marginLeft: '2vw',
    },
    tokenSymbol: {
        color: 'rgba(255,255,255,.6)',
        fontSize: '15px',
        marginLeft: '6px',
    },
    address: {
        color: '#FFF',
        fontSize: '15px',
        marginLeft: '2vw',
    },
    restore: {
        color: 'rgba(255,255,255)',
        fontSize: '15px',
        marginLeft: '5px',
        fontWeight: 'normal'
    },
}));

export default React.memo(AccountInfo)
