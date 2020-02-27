import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from "react-i18next";

const assets = ["Polkadot", "Kusama"];
const keypairs = ["ed25519", "sr25519"];

export default function CreateInputForm(props) {
    const classes = useStyles();
    const {t} = useTranslation();
    const [values, setValues] = useState({
        asset: "Polkadot",
        keypair: "ed25519",
        name: "",
        password: "",
        pwd: "",
        error: false
    });

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    const checkPwd = () => {
        if (values.password !== values.pwd) {
            setValues({...values, ["error"]: true});
        }
    };

    return (
        <Box className={classes.box}>
            <Box className={classes.item}>
                <TextField
                    id="select-asset"
                    select
                    required
                    label="Select Wallet Type"
                    value={values.asset}
                    onChange={handleChange('asset')}
                    margin="normal"
                    className={classes.select}
                >
                    {assets.map(option => (
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
            <TextField id="outlined-basic"
                       required
                       multiline
                       label={t('CreateWallet.walletName')}
                       placeholder={t('CreateWallet.enterName')}
                       InputLabelProps={{
                           shrink: true,
                       }}
                       margin="normal"
                       className={classes.textField}
                       value={values.name}
                       onChange={handleChange('name')}
            />

            <TextField id="outlined-basic"
                       required
                       label={t('CreateWallet.password')}
                       placeholder={t('CreateWallet.enterPassword')}
                       InputLabelProps={{
                           shrink: true,
                       }}
                       margin="normal"
                       className={classes.textField}
                       value={values.password}
                       onChange={handleChange('password')}
            />
            <TextField id="outlined-basic"
                       required
                       error={values.error}
                       label={t('CreateWallet.pwd')}
                       placeholder={t('CreateWallet.confirmPwd')}
                       InputLabelProps={{
                           shrink: true,
                       }}
                       margin="normal"
                       className={classes.textField}
                       value={values.pwd}
                       onChange={handleChange('pwd')}
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
        width: 580,
        display: 'flex',
        justifyContent: 'space-between',
    },
    select: {
        width: 270
    },
    textField: {
        width: 580,
    }
}));