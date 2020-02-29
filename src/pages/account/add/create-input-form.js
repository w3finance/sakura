import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from "react-i18next";

const chains = ["Polkadot", "Kusama"];
const keypairs = ["ed25519", "sr25519"];

function CreateInputForm(props) {
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
                    id="select-chain"
                    select
                    required
                    label="Select Wallet Type"
                    value={values.chain}
                    onChange={handleChange('chain')}
                    inputRef={props.chainRef}
                    margin="normal"
                    className={classes.select}
                >
                    {chains.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="select-keypair"
                    select
                    required
                    label="Select Crypto Type"
                    value={values.keypair}
                    onChange={handleChange('keypair')}
                    inputRef={props.keypairRef}
                    margin="normal"
                    className={classes.select}
                >
                    {keypairs.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <TextField id="name-basic"
                       error={Boolean(errors.name)}
                       required
                       multiline
                       label={t('CreateWallet.walletName')}
                       placeholder={t('CreateWallet.enterName')}
                       InputLabelProps={{
                           shrink: true,
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
}

function MnemonicForm(props) {
    const {seed} = props;
    const classes = useStyles();
    const {t} = useTranslation();

    return (
        <Box className={classes.box}>
            <Box className={classes.tip}>
                {t('CreateWallet.backupMnemonic')}
            </Box>
            <TextField id="outlined-basic"
                       variant="outlined"
                       helperText={t('CreateWallet.backupTip')}
                       multiline
                       rows="2"
                       value={seed ? seed : ""}
                       InputProps={{
                           readOnly: true,
                       }}
                       className={classes.textField}
            />
        </Box>
    )
}

function ConfirmMnemonicForm(props) {
    const {errors} = props;
    const classes = useStyles();
    const {t} = useTranslation();

    return (
        <Box className={classes.box}>
            <Box className={classes.tip}>
                {t('CreateWallet.confirmMnemonic')}
            </Box>
            <TextField id="outlined-basic"
                       error={Boolean(errors.seed)}
                       autoFocus={true}
                       variant="outlined"
                       helperText={t('CreateWallet.backupTip')}
                       multiline
                       rows="2"
                       inputRef={props.seedRef}
                       InputProps={{
                           readOnly: false,
                       }}
                       className={classes.textField}
            />
        </Box>
    )
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
    select: {
        width: 255
    },
    textField: {
        width: 550,
        margin: theme.spacing(1)
    },
    tip: {
        width: 550,
        fontSize: '0.875rem',
    }
}));

export {CreateInputForm, MnemonicForm, ConfirmMnemonicForm}