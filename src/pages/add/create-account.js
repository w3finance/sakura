import React, {useState, useRef} from "react";
import {Wrapper} from "../../components/Layout";
import Header from "../../components/Header";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Box from '@material-ui/core/Box';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import {copyToClipboard} from "../../util/call";
import {useSnackbar} from 'notistack';
import {CreateInputForm, MnemonicForm, ConfirmMnemonicForm} from "../../components/add/create-form";
import {Keyring} from '@polkadot/api';
import {mnemonicGenerate} from '@polkadot/util-crypto/mnemonic';
import {AccountsContext} from "../../context/accounts"

const keyringsr = new Keyring({type: "sr25519"});
const keyringed = new Keyring({type: "ed25519"});

function addressFromPhrase(phrase, type, keypair) {
    let keyring;

    if (keypair === 'ed25519') {
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
        case 'Edgeware':
            keyring.setSS58Format(0x07);
            break;
        default:
            keyring.setSS58Format(42);
            break;
    }
    return keyring.addFromMnemonic(phrase).address;
}

function generateAddress(type, keypair) {
    const phrase = mnemonicGenerate();// Mnemonic
    // const key = u8aToHex(await randomAsU8a());// Private Key
    const address = addressFromPhrase(phrase, type, keypair);
    return {
        address,
        phrase,
    };
}

function CreateAccount() {
    const {t} = useTranslation();
    const history = useHistory();
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const typeRef = useRef();
    const keypairRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const pwdRef = useRef();
    const phraseRef = useRef();
    const [activeStep, setActiveStep] = useState(0);
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        type: "Kusama",
        keypair: "sr25519",
        phrase: "",
        private: "",
        name: "",
        password: "",
        pwd: "",
    });
    const [{address, phrase}, setAddress] = useState({});
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
                storeAccount().then(() => {
                    back();
                });
            }
        }
    };

    const storeAccount = async () => {
        try {
            createAccount({
                [address]: {
                    name: values.name,
                    type: values.type,
                    keypair: values.keypair,
                    phrase: phrase,
                    private: "",
                    password: values.password,
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

    const regenerate = () => {
        setAddress(generateAddress(values.type, values.keypair))
    };

    const copy = () => {
        copyToClipboard(phrase);
        enqueueSnackbar(t('Common.copy'), {
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            }
        })
    };

    return (
        <Wrapper style={{background: '#F2F3F5'}}>
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
                                                          regenerate={regenerate}
                                                          copy={copy}/>
                            :
                            <ConfirmMnemonicForm phraseRef={phraseRef} errors={errors}/>)
                }
            </Box>
            <Box className={classes.footer}>
                <MobileStepper
                    variant="dots"
                    steps={3}
                    position="static"
                    activeStep={activeStep}
                    className={classes.stepper}
                />
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
                        {activeStep >= 2 ? t('CreateWallet.create') : t('CreateWallet.next')}
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
        height: '130px',
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

export default React.memo(CreateAccount)