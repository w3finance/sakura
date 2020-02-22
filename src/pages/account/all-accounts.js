import React, {useContext} from 'react';
import {Wrapper} from "../../components/Layout";
import {useHistory} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import Header from "../../components/Header";
import {makeStyles} from '@material-ui/core/styles';
import Settings from "@material-ui/icons/Settings";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography";

function AllAccounts() {
    const classes = useStyles();
    const history = useHistory();
    const {t} = useTranslation();

    function goSetting() {
        history.push("/setting");
    }
    function goAdd() {
        history.push("/addAccount");
    }

    return (
        <Wrapper>
            <Header
                title={t('tl_allAccounts')}
                icon={<Settings style={{color: "rgba(0,0,0.5)"}}/>}
                onClick={goSetting}
            />
            <div className={classes.container}>
                <div className={classes.center}>
                    <Typography style={{color: 'rgba(16,16,16,.5)'}}>
                        {t('a_noAccount')}
                    </Typography>
                </div>
                <div className={classes.footer}>
                    <Fab size="small" color="primary" aria-label="add" onClick={goAdd}>
                        <AddIcon />
                    </Fab>
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
        margin: '0 15px 15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        height: '70px',
        display: 'flex',
        justifyContent: 'center',
    }
}));

export default React.memo(AllAccounts)
