import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";

function AccountHistory(props) {
    const classes = useStyles();

    return (
        <Box className={classes.account} onClick={() => {}}>
            <Box className={classes.titleView}>
                <Box className={classes.title}>
                    {'历史记录'}
                </Box>
            </Box>
        </Box>
    )
}

const useStyles = makeStyles(theme => ({
    account: {
        flex: 1,
        width: '92vw',
        borderRadius: '5px',
        marginTop: 15,
        marginLeft: '4vw',
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: '#F4F4F4'
    },
    titleView: {
        display: 'flex',
        width: '100px',
        lineHeight: 2,
        marginLeft: '1vw'
    },
    title: {
        color: 'rgba(0,0,0,.8)',
        fontSize: '15px',
        borderBottom: '2px solid #C785ED'
    },
}));

export default React.memo(AccountHistory)
