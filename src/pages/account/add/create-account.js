import React, {useState, useRef} from "react";
import {Wrapper} from "../../../components/Layout";
import Header from "../../../components/Header";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {CreateInputForm, MnemonicForm, ConfirmMnemonicForm} from "./create-input-form";
import {Keyring} from '@polkadot/api';
import {randomAsU8a, mnemonicGenerate} from '@polkadot/util-crypto/';
// import { isHex, u8aToHex } from '@polkadot/util';
import {AccountsContext} from "../../../context/accounts"

const keyringed = new Keyring({type: "ed25519"});
const keyringsr = new Keyring({type: "sr25519"});

function addressFromPhrase(phrase, type, pairType) {
    let keyring;
    if (pairType === "ed25519") {
        keyring = keyringed;
    } else {
        keyring = keyringsr;
    }

    switch (type) {
        case 'Polkadot':
            keyring.setSS58Format(0x00);
            break;
        case 'Kusama':
            keyring.setSS58Format(0x02);
            break;
        default:
            break;
    }
    return keyring.addFromMnemonic(phrase).address;
}

function generateAddress(type, pairType) {
    const phrase = mnemonicGenerate();// FROM助记词
    // const phrase = u8aToHex(await randomAsU8a());// FROM私钥
    const address = addressFromPhrase(phrase, type, pairType);
    return {
        address,
        phrase,
        pairType
    };
}

export default function CreateAccount() {
    const {t} = useTranslation();
    const history = useHistory();
    const classes = useStyles();
    const steps = [t('CreateWallet.step1'), t('CreateWallet.step2'), t('CreateWallet.step3')];
    const typeRef = useRef();
    const keypairRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const pwdRef = useRef();
    const phraseRef = useRef();
    const [activeStep, setActiveStep] = useState(0);
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        type: "Polkadot",
        keypair: "ed25519",
        name: "",
        password: "",
        pwd: "",
    });
    const [{address, phrase, pairType}, setAddress] = useState({});
    const {accounts, createAccount} = React.useContext(AccountsContext);

    function back() {
        history.goBack();
    }

    const handleNext = () => {
        if (activeStep === 0) {// Account Settings
            validate();
        } else if (activeStep === 1) {// Backup
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        } else {// Create
            if (phraseRef.current['value'] === "" || phraseRef.current['value'] !== phrase) {
                setErrors({phrase: "phrase-no-match"});
            } else {
                // Store Account
                onCreateAccount().then(() => {
                    back();
                });
            }
        }
    };

    const onCreateAccount = async () => {
        try {
            createAccount({
                [address]: {
                    name: values.name,
                    type: values.type,
                    keypair: values.keypair,
                    password: values.password,
                    phrase: phrase
                }
            });
        } catch (e) {
            console.log(e)
        }
    };

    const handleBack = () => {
        if (activeStep === 2 && Boolean(errors.phrase)) {
            delete errors.phrase;
        }
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const validateFormValues = formValidation();
    const validate = () => {
        const formValues = {
            type: typeRef.current['value'],
            keypair: keypairRef.current['value'],
            name: nameRef.current['value'],
            password: passwordRef.current['value'],
            pwd: pwdRef.current['value']
        };
        setValues(formValues);
        const validation = validateFormValues(formValues);
        setErrors(validation.errors);
        if (validation.success) {
            setAddress(generateAddress(typeRef.current['value'], values.keypair));
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };

    const refresh = () => {
        setAddress(generateAddress(values.type, values.keypair))
    };

    return (
        <Wrapper>
            <Header lfIcon bg title={t('Title.createWallet')} goBack={back}/>
            <Box className={classes.container}>
                {
                    activeStep === 0 ? <CreateInputForm typeRef={typeRef}
                                                        keypairRef={keypairRef}
                                                        nameRef={nameRef}
                                                        passwordRef={passwordRef}
                                                        pwdRef={pwdRef}
                                                        errors={errors}
                                                        formValues={values}/>
                        :
                        (activeStep === 1 ? <MnemonicForm phrase={phrase}
                                                          address={address}
                                                          refresh={refresh}/>
                            :
                            <ConfirmMnemonicForm phraseRef={phraseRef} errors={errors}/>)
                }
            </Box>
            <Box className={classes.footer}>
                <Stepper nonLinear activeStep={activeStep} className={classes.stepper}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel style={{margin: '0 10px'}}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box className={classes.buttons}>
                    <Button disabled={activeStep === 0}
                            disableElevation
                            variant="contained"
                            color="default"
                            onClick={handleBack}
                            className={classes.button}>
                        {t('CreateWallet.back')}
                    </Button>
                    <Button disabled={activeStep === steps.length}
                            disableElevation
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}>
                        {activeStep >= steps.length - 1 ? t('CreateWallet.create') : t('CreateWallet.next')}
                    </Button>
                </Box>
            </Box>
        </Wrapper>
    )
}

function formValidation() {
    return function validateFormValues(values) {
        const errors = {};
        if (values.name === "") {
            errors.name = "no-account-name"
        }
        if (values.password === "") {
            errors.password = "no-password"
        }
        if (values.pwd === "" || values.password !== values.pwd) {
            errors.pwd = "password-no-match"
        }
        const success = Object.keys(errors).length === 0;
        return {errors, success}
    }
}

const useStyles = makeStyles(theme => ({
    container: {
        flexGrow: 1,
        display: 'flex'
    },
    footer: {
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    stepper: {
        background: 'transparent',
        padding: '10px 24px 20px',
    },
    buttons: {
        width: 240,
        paddingTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        width: 120,
        margin: '0 20px',
    }
}));