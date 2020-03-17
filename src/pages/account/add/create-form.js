import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useTranslation} from "react-i18next";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import RefreshIcon from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {AccountsContext} from "../../../context/accounts";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Collapse from "@material-ui/core/Collapse";
import {RedditTextField} from "../../../components/account/RedditTextField";

const types = ["Kusama", "Polkadot", "Edgeware"];
const keypairs = ["sr25519", "ed25519"];
const WIDTH = 550;

const CreateInputForm = React.memo(function CreateInputForm(props) {
    const {errors, formValues} = props;
    const classes = useStyles();
    const {t} = useTranslation();
    const [values, setValues] = useState(formValues);
    const [checked, setChecked] = useState(false);
    const {accounts} = React.useContext(AccountsContext);

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
        if (Boolean(errors[prop])) {
            delete errors[prop];
        }
    };

    const toggleChecked = () => {
        setChecked(prev => !prev);
    };

    return (
        <Box className={classes.box}>
            <TextField
                id="select-wallet"
                variant="filled"
                select
                label="Select Wallet Type"
                value={values.type}
                onChange={handleChange('type')}
                inputRef={props.typeRef}
                className={classes.textField}
            >
                {types.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <TextField id="name"
                       error={Boolean(errors.name)}
                       label={t('CreateWallet.walletName')}
                       defaultValue={`Wallet${Object.keys(accounts).length + 1}`}
                       InputLabelProps={{
                           shrink: true,
                       }}
                       inputRef={props.nameRef}
                       className={classes.textField}
                       value={values.name ? values.name : undefined}
                       onChange={handleChange('name')}
            />
            <TextField id="password"
                       error={Boolean(errors.password)}
                       required
                       label={t('CreateWallet.password')}
                       InputLabelProps={{
                           shrink: true,
                       }}
                       inputRef={props.passwordRef}
                       className={classes.textField}
                       value={values.password}
                       onChange={handleChange('password')}
            />
            <TextField id="pwd"
                       error={Boolean(errors.pwd)}
                       required
                       label={t('CreateWallet.pwd')}
                       InputLabelProps={{
                           shrink: true,
                       }}
                       inputRef={props.pwdRef}
                       className={classes.textField}
                       value={values.pwd}
                       onChange={handleChange('pwd')}
            />
            <Box className={classes.advanced}>
                <FormControlLabel
                    value="Advanced"
                    control={<Switch color="primary" size="small" checked={checked} onChange={toggleChecked}/>}
                    label={t('CreateWallet.advanced')}
                    labelPlacement="start"
                    classes={{label: classes.label}}
                />
            </Box>
            <Collapse in={checked}>
                <TextField
                    id="select-keypair"
                    variant="filled"
                    select
                    label="Keypair Crypto Type"
                    value={values.keypair}
                    onChange={handleChange('keypair')}
                    inputRef={props.keypairRef}
                    className={classes.textField}
                >
                    {keypairs.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Collapse>
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
            <Typography style={{fontSize: '12px', cursor: 'pointer', color: 'rgba(0, 0, 0, 0.54)'}}>
                {label}
            </Typography>
        </Box>
    )
}

const MnemonicForm = React.memo(function MnemonicForm(props) {
    const {address, phrase, regenerate, copy} = props;
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
            <RedditTextField id="key"
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
                              onClick={regenerate}
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

const useStyles = makeStyles(theme => ({
    box: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionButton: {
        width: WIDTH,
        display: 'flex',
    },
    textField: {
        width: WIDTH,
        marginTop: theme.spacing(0.7),
        marginBottom: theme.spacing(0.7),
    },
    title: {
        width: WIDTH,
        fontSize: 16,
    },
    tip: {
        width: WIDTH,
        fontSize: '12px',
        color: 'rgba(0, 0, 0, 0.54)'
    },
    advanced: {
        width: WIDTH,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    label: {
        color: 'rgba(0, 0, 0, 0.54)'
    }

}));

export {CreateInputForm, MnemonicForm, ConfirmMnemonicForm}