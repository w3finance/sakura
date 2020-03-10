import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from "react-i18next";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import RefreshIcon from '@material-ui/icons/Refresh';

const types = ["Kusama"];
const keypairs = ["sr25519", "ed25519"];
const HelpIconWidth = 20;

const CreateInputForm = React.memo(function CreateInputForm(props) {
    const {errors, formValues} = props;
    const classes = useStyles();
    const {t} = useTranslation();
    const [values, setValues] = useState(formValues);

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    return (
        <Box className={classes.box}>
            <Box className={classes.item}>
                <TextField
                    id="select-type"
                    variant="filled"
                    select
                    label="Select Wallet Type"
                    value={values.type}
                    onChange={handleChange('type')}
                    inputRef={props.typeRef}
                    margin="normal"
                    className={classes.select}
                >
                    {types.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Grid container alignItems="flex-end" style={{width: 255 + HelpIconWidth}}>
                    <TextField
                        id="select-keypair"
                        variant="filled"
                        select
                        label="Select Crypto Type"
                        value={values.keypair}
                        onChange={handleChange('keypair')}
                        inputRef={props.keypairRef}
                        margin="normal"
                        style={{flexGrow: 1}}
                    >
                        {keypairs.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Grid style={{marginBottom: 20, marginLeft: 5, width: HelpIconWidth}}>
                        <Tooltip
                            title={'Note that to validate on Polkadot, the session account should use "ed25519".'}>
                            <HelpIcon fontSize={'small'} color={'action'}/>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
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

const MnemonicForm = React.memo(function MnemonicForm(props) {
    const {address, phrase, refresh} = props;
    const classes = useStyles();
    const {t} = useTranslation();

    return (
        <Box className={classes.box}>
            <Box className={classes.title}>
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
            <Alert icon={false} severity="info" style={{marginTop: 10}} action={
                <IconButton aria-label="refresh" size="small" style={{color: 'rgba(13,60,97,.9)'}} onClick={refresh}>
                    <RefreshIcon/>
                </IconButton>
            }>
                {address}
            </Alert>
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
        width: 550 + HelpIconWidth,
        marginLeft: HelpIconWidth,
        display: 'flex',
        justifyContent: 'space-between',
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