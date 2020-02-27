import React, {useState} from "react";
import {Wrapper} from "../../../components/Layout";
import Header from "../../../components/Header";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const assets = ["Polkadot", "Kusama"];
const keypairs = ["sr25519", "ed25519"];

export default function CreateAccount() {
    const history = useHistory();
    const {t} = useTranslation();
    const classes = useStyles();
    const [values, setValues] = useState({
        name: "",
        password: '',
        pwd: '',
    });
    const [asset, setAsset] = useState("Polkadot");
    const [keypair, setKeypair] = useState("ed25519");

    const handleChangeAsset = event => {
        setAsset(event.target.value);
    };

    const handleChangeKeypair = event => {
        setKeypair(event.target.value);
    };

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    function back() {
        history.goBack();
    }

    return(
        <Wrapper>
            <Header lfIcon bg title={t('Title.createWallet')} goBack={back}/>
            <Box className={classes.container}>

                <Box className={classes.item}>
                    <TextField
                        id="select-asset"
                        select
                        required
                        label="Select Wallet Type"
                        value={asset}
                        onChange={handleChangeAsset}
                        margin="normal"
                        className={classes.select}
                        variant="outlined"
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
                        value={keypair}
                        onChange={handleChangeKeypair}
                        margin="normal"
                        className={classes.select}
                        variant="outlined"
                    >
                        {keypairs.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <TextField id="filled-basic"
                           disabled
                           label="Mnemonic"
                           defaultValue=""
                           variant="outlined"
                           margin="normal"
                           className={classes.textField}

                />

                <TextField id="outlined-basic"
                           required
                           label="Wallet Name"
                           placeholder="Wallet Name"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           margin="normal"
                           className={classes.textField}
                           value={values.password}
                           onChange={handleChange('name')}
                />

                <TextField id="outlined-basic"
                           required
                           label="Password"
                           placeholder="Enter a password"
                           helperText="This password will be used as the transaction password for the wallet."
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
                           label="Confirm Password"
                           placeholder="Confirm your password"
                           InputLabelProps={{
                               shrink: true,
                           }}
                           margin="normal"
                           className={classes.textField}
                           value={values.pwd}
                           onChange={handleChange('pwd')}
                />
            </Box>
        </Wrapper>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    item: {
        width: '80%',
        display: 'flex',
        marginTop: '30px'
    },
    select: {
        flex: 1,
        margin: '0 30px'
    },
    textField: {
        width: 580,
    },

}));