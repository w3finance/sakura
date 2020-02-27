import React, {useState} from 'react';
import {Wrapper} from "../../components/Layout";
import {useHistory} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import Header from "../../components/Header";
import {makeStyles} from '@material-ui/core/styles';
import Settings from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

function AllAccounts() {
    const classes = useStyles();
    const history = useHistory();
    const {t} = useTranslation();
    const [open, setOpen] = useState(false);

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
            <div className={classes.container}>
                <div className={classes.center}>
                    <Typography style={{color: 'rgba(16,16,16,.5)'}}>
                        {t('AllWallets.noWallet')}
                    </Typography>
                </div>
                <div className={classes.footer}>
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
                            tooltipOpen
                            onClick={handleClose}
                        />
                        <SpeedDialAction
                            key={'create'}
                            icon={<AddCircleOutlinedIcon onClick={goCreate}/>}
                            tooltipTitle={t('Btn.create')}
                            tooltipOpen
                            onClick={handleClose}
                        />
                    </SpeedDial>
                </div>
            </div>

        </Wrapper>
    )
}

const useStyles = makeStyles(theme => ({
    button: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
    container: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    center: {
        flex: '1',
        border: '1px dashed #F4F4F4',
        margin: '0 30px 15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        height: '70px',
        display: 'flex',
        justifyContent: 'center',
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(3),
        left: 0,
        right: 0,
        margin: 'auto'
    }
}));

export default React.memo(AllAccounts)
