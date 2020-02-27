import React, {useState} from "react";
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
import CreateInputForm from "./create-input-form";

export default function CreateAccount() {
    const history = useHistory();
    const {t} = useTranslation();
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);

    const steps = [t('CreateWallet.step1'), t('CreateWallet.step2'), t('CreateWallet.step3')];

    function back() {
        history.goBack();
    }

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <Wrapper>
            <Header lfIcon bg title={t('Title.createWallet')} goBack={back}/>
            <Box className={classes.container}>
                {
                    activeStep === 0 ? <CreateInputForm/> : null
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