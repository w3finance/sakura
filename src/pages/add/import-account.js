import React, {useRef, useState} from "react";
import {Wrapper} from "../../components/Layout";
import Header from "../../components/Header";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {ImportForm, ToggleType} from "../../components/add/import-form";
import {mnemonicValidate} from '@polkadot/util-crypto/mnemonic';
import {Keyring} from "@polkadot/api";
import {AccountsContext} from "../../context/accounts";

const keyringsr = new Keyring({type: "sr25519"});
const keyringed = new Keyring({type: "ed25519"});

function addressFromPhrase(str, type, keypair) {
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
    return keyring.addFromMnemonic(str).address;
}

function generateAddress(str, type, keypair) {
    return addressFromPhrase(str, type, keypair);
}

function ImportAccount() {
    const history = useHistory();
    const {t} = useTranslation();
    const classes = useStyles();
    const typeRef = useRef();
    const keypairRef = useRef();
    const keyRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const {accounts, createAccount} = React.useContext(AccountsContext);
    const [activeStep, setActiveStep] = useState(0);
    const [type, setType] = useState('0');
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        type: "Kusama",
        keypair: "sr25519",
        phrase: "",
        private: "",
        name: "",
        password: "",
    });

    function back() {
        history.goBack();
    }

    const handleBack = () => {
        setErrors({});
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleNext = () => {
        if (activeStep === 1) {
            validate();
        }
    };

    const handleSelect = (event) => {
        setType(event);
        setValues({
            ...values,
            type: typeRef.current['value'],
            keypair: keypairRef.current['value']
        });
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const validateFormValues = formValidation();
    const validate = () => {
        const formValues = {
            type: values.type,
            keypair: values.keypair,
            phrase: type === '0' ? keyRef.current['value'] : "",
            private: type === '1' ? keyRef.current['value'] : "",
            name: nameRef.current['value'],
            password: passwordRef.current['value'],
        };
        setValues(formValues);
        const validation = validateFormValues(type, formValues);
        setErrors(validation.errors);
        if (validation.success) {
            let address = generateAddress(formValues.phrase + formValues.private, formValues.type, formValues.keypair)
            storeAccount(address, formValues).then(() => back());
        }
    };

    const storeAccount = async (address, formValues) => {
        try {
            createAccount({
                [address]: {
                    name: formValues.name,
                    type: formValues.type,
                    keypair: formValues.keypair,
                    phrase: formValues.phrase,
                    private: formValues.private,
                    password: formValues.password,
                }
            });
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <Wrapper style={{background: '#F2F3F5'}}>
            <Header lfIcon bg title={t('Title.importWallet')} goBack={back}/>
            <Box className={classes.container}>
                {
                    activeStep === 0 ?
                        <ToggleType typeRef={typeRef}
                                    keypairRef={keypairRef}
                                    select={handleSelect}
                        />
                        :
                        <ImportForm type={type}
                                    errors={errors}
                                    keyRef={keyRef}
                                    passwordRef={passwordRef}
                                    nameRef={nameRef}
                        />
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
                                {t('CreateWallet.import')}
                            </Button>
                        </Box>
                    </Box>
            }
        </Wrapper>
    )
}

function formValidation() {
    return function validateFormValues(type, values) {
        const errors = {};
        if (type === '0') {// Mnemonic
            if (!mnemonicValidate(values.phrase)) {
                errors.phrase = "no-match-mnemonic"
            }
        } else {// Private Key
            if (values.private === "") {
                errors.private = "no-match-private-key"
            } else if (values.private.substr(0, 2) !== "0x") {
                errors.private = "no-match-private-key"
            } else if (values.private.length !== 66) {
                errors.private = "no-match-private-key"
            }
        }
        if (values.name === "") {
            errors.name = "no-account-name"
        }
        if (values.password === "") {
            errors.password = "no-account-password"
        }
        const success = Object.keys(errors).length === 0;
        return {errors, success}
    }
}

const useStyles = makeStyles(theme => ({
    container: {
        flexGrow: 1,
        display: 'flex',
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

export default React.memo(ImportAccount)