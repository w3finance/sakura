import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useTranslation} from "react-i18next";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import RefreshIcon from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const CreateInputForm = React.memo(function CreateInputForm(props) {
    const {errors, formValues} = props;
    const classes = useStyles();
    const {t} = useTranslation();
    const [values, setValues] = useState(formValues);
    const types = ["Kusama"];

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    return (
        <Box className={classes.box}>
            <TextField
                id="select-type"
                variant="filled"
                select
                label="Select Wallet Type"
                value={values.type}
                onChange={handleChange('type')}
                inputRef={props.typeRef}
                margin="normal"
                className={classes.textField}
            >
                {types.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <TextField id="name-basic"
                       error={Boolean(errors.name)}
                       required
                       label={t('CreateWallet.walletName')}
                       placeholder={t('CreateWallet.enterName')}
                       InputLabelProps={{
                           shrink: true,
                       }}
                       InputProps={{
                           startAdornment: <InputAdornment position="start">{values.type}</InputAdornment>,
                       }}
                       inputRef={props.nameRef}
                       margin="normal"
                       className={classes.textField}
                       value={values.name}
                       onChange={handleChange('name')}
            />
            <TextField id="password-basic"
                       error={Boolean(errors.password)}
                       required
                       label={t('CreateWallet.password')}
                       placeholder={t('CreateWallet.enterPassword')}
                       InputLabelProps={{
                           shrink: true,
                       }}
                       inputRef={props.passwordRef}
                       margin="normal"
                       className={classes.textField}
                       value={values.password}
                       onChange={handleChange('password')}
            />
            <TextField id="pwd-basic"
                       error={Boolean(errors.pwd)}
                       required
                       label={t('CreateWallet.pwd')}
                       placeholder={t('CreateWallet.confirmPwd')}
                       InputLabelProps={{
                           shrink: true,
                       }}
                       inputRef={props.pwdRef}
                       margin="normal"
                       className={classes.textField}
                       value={values.pwd}
                       onChange={handleChange('pwd')}
            />
        </Box>
    )
});

function ActionButton(props) {
    const {icon, label, onClick} = props;

    return (
        <Box style={{display: 'flex', alignItems: 'center', marginRight: 10}} onClick={onClick}>
            <IconButton aria-label="delete" size="small">
                {icon ? icon : null}
            </IconButton>
            <Typography color="textSecondary" style={{fontSize: 14, cursor: 'pointer'}}>
                {label}
            </Typography>
        </Box>
    )
}

const MnemonicForm = React.memo(function MnemonicForm(props) {
    const {address, phrase, refresh, copy} = props;
    const classes = useStyles();
    const {t} = useTranslation();

    return (
        <Box className={classes.box}>
            <Box className={classes.title}>
                {t('CreateWallet.address')}
            </Box>
            <Box className={classes.tip}>
                {address}
            </Box>
            <Box className={classes.title} style={{marginTop: 30}}>
                {t('CreateWallet.backupMnemonic')}
            </Box>
            <Box className={classes.tip}>
                {t('CreateWallet.backupTip')}
            </Box>
            <RedditTextField id="outlined-basic"
                             label={t('CreateWallet.mnemonic')}
                             variant="filled"
                             multiline
                             rows="2"
                             value={phrase ? phrase : ""}
                             inputProps={{'aria-label': 'naked'}}
                             className={classes.textField}
            />
            <Box className={classes.actionButton}>
                <ActionButton icon={<FileCopyIcon fontSize="inherit" viewBox="0 0 26 26"/>}
                              onClick={copy}
                              label={t('CreateWallet.copy')}
                />
                <ActionButton icon={<RefreshIcon fontSize="small"/>}
                              onClick={refresh}
                              label={t('CreateWallet.regenerate')}
                />
            </Box>
        </Box>
    )
});

const ConfirmMnemonicForm = React.memo(function ConfirmMnemonicForm(props) {
    const {errors} = props;
    const classes = useStyles();
    const {t} = useTranslation();

    return (
        <Box className={classes.box}>
            <Box className={classes.title}>
                {t('CreateWallet.confirmMnemonic')}
            </Box>
            <Box className={classes.tip}>
                {t('CreateWallet.backupTip')}
            </Box>
            <RedditTextField id="outlined-basic"
                             label={t('CreateWallet.mnemonic')}
                             error={Boolean(errors.phrase)}
                             autoFocus={true}
                             variant="filled"
                             multiline
                             rows="2"
                             inputProps={{'aria-label': 'naked'}}
                             inputRef={props.phraseRef}
                             className={classes.textField}
            />
        </Box>
    )
});

const useStylesReddit = makeStyles(theme => ({
    root: {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        color: 'rgb(66,66,70)',
        transition: theme.transitions.create(['border-color']),
        '&:hover': {
            backgroundColor: '#FFF',
        },
        '&$focused': {
            backgroundColor: '#FFF',
        },
    },
    focused: {},
}));

function RedditTextField(props) {
    const classes = useStylesReddit();
    return <TextField InputProps={{classes, disableUnderline: true}} {...props} />;
}

const useStyles = makeStyles(theme => ({
    box: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        width: 550,
        display: 'flex',
        justifyContent: 'space-between',
    },
    actionButton: {
        width: 550,
        display: 'flex',
    },
    select: {
        width: 255,
    },
    textField: {
        width: 550,
        margin: theme.spacing(1),
    },
    title: {
        width: 550,
        fontSize: 16,
    },
    tip: {
        width: 550,
        fontSize: 12,
        color: 'rgba(16,16,16,.5)'
    }
}));

export {CreateInputForm, MnemonicForm, ConfirmMnemonicForm}