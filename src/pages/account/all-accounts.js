import React, {useState} from 'react';
import {Wrapper} from "../../components/Layout";
import {useHistory} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import Header from "../../components/Header";
import {makeStyles} from '@material-ui/core/styles';
import {AccountsContext} from "../../context/accounts";
import Settings from "@material-ui/icons/Settings";
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Box from "@material-ui/core/Box";
import AccountCard from "../../components/account/AccountCard";
import {useKusamaApi} from "../../hook/kusama";
import {usePolkadotApi} from "../../hook/polkadot";

const NoAccount = React.memo(function NoAccount() {
    const classes = useStyles();
    const {t} = useTranslation();
    return(
        <Box className={classes.noAccount}>
            {t('AllWallets.noWallet')}
        </Box>
    )
});

function areEqual(prevProps, nextProps) {
    console.log('==='+JSON.stringify(prevProps)+JSON.stringify(nextProps));
    if (prevProps === nextProps) {
        return true
    } else {
        return false
    }
}

function AllAccounts() {
    const classes = useStyles();
    const history = useHistory();
    const {t} = useTranslation();
    const [open, setOpen] = useState(false);
    const {accounts} = React.useContext(AccountsContext);
    const ksmApi = useKusamaApi();
    const dotApi = usePolkadotApi();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function goSetting() {
        history.push("/setting");
    }
    function goCreate() {
        history.push("/createAccount");
    }
    function goImport() {
        history.push("/importAccount");
    }

    return (
        <Wrapper>
            <Header
                title={t('Title.allWallets')}
                icon={<Settings style={{color: "rgba(0,0,0.5)"}}/>}
                onClick={goSetting}
            />
            <Box className={classes.container}>
                <Box className={classes.center}>
                    {
                        Object.keys(accounts).length === 0 ? <NoAccount />:
                            <Box className={classes.accounts}>
                                    {
                                        Object.keys(accounts).map((key)=>{
                                            return(
                                                <AccountCard key={key}
                                                             api={accounts[key].type === 'Polkadot' ? dotApi : ksmApi}
                                                             address={key}
                                                             account={accounts[key]}/>
                                            )
                                        })
                                    }
                            </Box>
                    }
                </Box>
                <Box className={classes.footer}>
                    <SpeedDial
                        ariaLabel="SpeedDial tooltip example"
                        className={classes.speedDial}
                        icon={<SpeedDialIcon />}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        open={open}
                        FabProps={{size: "small"}}
                    >
                        <SpeedDialAction
                            key={'import'}
                            icon={<AutorenewIcon onClick={goImport}/>}
                            tooltipTitle={t('Btn.import')}
                            onClick={handleClose}
                        />
                        <SpeedDialAction
                            key={'create'}
                            icon={<AddCircleOutlinedIcon onClick={goCreate}/>}
                            tooltipTitle={t('Btn.create')}
                            onClick={handleClose}
                        />
                    </SpeedDial>
                </Box>
            </Box>

        </Wrapper>
    )
}

const useStyles = makeStyles(theme => ({
    button: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    center: {
        flex: 1,
        display: 'flex'
    },
    noAccount: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'rgba(16,16,16,.5)'
    },
    accounts: {
        width: 800,
        height: 430,
        overflowX: 'hidden',
        overflowY: 'scroll',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start'
    },
    footer: {
        height: '70px',
        display: 'flex',
        justifyContent: 'center',
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2.5),
        left: 0,
        right: 0,
        margin: 'auto'
    }
}));

export default React.memo(AllAccounts, areEqual)
