import React, {useRef, useState} from "react";
import {Wrapper} from "../../../components/Layout";
import Header from "../../../components/Header";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {ToggleChain, ToggleKey, WalletInfo} from "./import-form";
import {Keyring} from "@polkadot/api";

const keyring = new Keyring({type: "sr25519"});
const judgeKey = (key, chain) =>{
    switch (chain) {
        case 'Polkadot':
            keyring.setSS58Format(0x00);
            break;
        case 'Kusama':
            keyring.setSS58Format(0x02);
            break;
        default:
            keyring.setSS58Format(42);
            break;
    }
    return new Promise(((resolve, reject) => {
        const address = keyring.addFromMnemonic(key).address;
        try {
            resolve(keyring.addFromMnemonic(key).address)
        } catch (e) {
            reject(e)
        }
    }))
};

function ImportAccount() {
    const history = useHistory();
    const {t} = useTranslation();
    const classes = useStyles();
    const keyRef = useRef();
    const [activeStep, setActiveStep] = useState(0);
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        type: "",
        keypair: "sr25519",
        key: "",
        name: "",
        password: "",
        pwd: "",
    });

    function back() {
        history.goBack();
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        if (activeStep === 1){

            judgeKey(values.key,values.type)

        } else if (activeStep === 2){
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        } else {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };

    const select = chain => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setValues({...values, ['type']: chain});
    };

    const inputKey = () =>{
        setValues({...values, ['key']: keyRef.current['value']});
    };

    return (
        <Wrapper style={{background: '#F2F3F5'}}>
            <Header lfIcon bg title={t('Title.importWallet')} goBack={back}/>
            <Box className={classes.container}>
                {
                    activeStep === 0 ?
                        <ToggleChain select={select}/>
                        :
                        (
                            activeStep === 1 ?
                                <ToggleKey keyRef={keyRef} inputKey={inputKey}/>
                                :
                                <WalletInfo errors={errors} formValues={values}/>
                        )
                }
            </Box>
            {
                activeStep === 0 ?
                    null
                    :
                    <Box className={classes.footer}>
                        <Box className={classes.buttons}>
                            <Button disabled={activeStep === 0}
                                    disableElevation
                                    variant="contained"
                                    color="default"
                                    onClick={handleBack}
                                    className={classes.button}>
                                {t('CreateWallet.back')}
                            </Button>
                            <Button disabled={activeStep === 3}
                                    disableElevation
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}>
                                {activeStep >= 2 ? 'Import' : t('CreateWallet.next')}
                            </Button>
                        </Box>
                    </Box>
            }
        </Wrapper>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        flexGrow: 1,
        display: 'flex',
    },
    footer: {
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    stepper: {
        background: 'transparent',
        padding: '10px 24px',
    },
    buttons: {
        width: 280,
        paddingTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        width: 120,
        margin: '0 20px',
    }
}));

export default React.memo(ImportAccount)