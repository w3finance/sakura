import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {useTranslation} from "react-i18next";
import {AccountsContext} from "../../context/accounts";
import {RedditTextField} from "../RedditTextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";

const types = ["Kusama", "Polkadot", "Edgeware"];
const keypairs = ["sr25519", "ed25519"];
const WIDTH = 550;

const ImportForm = React.memo(function ImportForm(props) {
    const {type, errors, keyRef, passwordRef, nameRef} = props;
    const classes = useStyles();
    const {t} = useTranslation();
    const {accounts} = React.useContext(AccountsContext);

    const handleChange = prop => {
        if (Boolean(errors[prop])) {
            delete errors[prop];
        }
    };

    return (
        <Box className={classes.root}>
            <RedditTextField id="outlined-basic"
                             label={type === '0' ? t('CreateWallet.mnemonic') : t('CreateWallet.private')}
                             error={type === '0' ? Boolean(errors.phrase) : Boolean(errors.private)}
                             autoFocus={true}
                             variant="filled"
                             multiline
                             rows="2"
                             inputProps={{'aria-label': 'naked'}}
                             inputRef={keyRef}
                             className={classes.textField}
                             onChange={type === '0' ? handleChange('phrase') : handleChange('private')}
                             helperText={t('CreateWallet.inputMnemonic')}
            />

            <RedditTextField id="outlined-basic"
                             label={t('CreateWallet.password')}
                             error={Boolean(errors.password)}
                             variant="filled"
                             multiline
                             rows="1"
                             inputProps={{'aria-label': 'naked'}}
                             inputRef={passwordRef}
                             className={classes.textField}
                             onChange={handleChange('password')}
                             helperText={t('CreateWallet.setPassword')}
            />

            <RedditTextField id="outlined-basic"
                             label={t('CreateWallet.walletName')}
                             error={Boolean(errors.name)}
                             variant="filled"
                             multiline
                             rows="1"
                             defaultValue={`Wallet${Object.keys(accounts).length + 1}`}
                             inputProps={{'aria-label': 'naked'}}
                             inputRef={nameRef}
                             className={classes.textFieldNoMargin}
                             onChange={handleChange('name')}
            />
        </Box>
    )
});

const ToggleType = React.memo(function ToggleType(props) {
    const {typeRef, keypairRef, select} = props;
    const [values, setValues] = useState({
        type: "Kusama",
        keypair: "sr25519",
    });
    const classes = useStyles();
    const {t} = useTranslation();
    const [checked, setChecked] = useState(false);
    const actions = [t('CreateWallet.importViaMnemonic'), t('CreateWallet.importViaPrivateKey')];

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    const toggleChecked = () => {
        setChecked(prev => !prev);
    };

    return (
        <Box className={classes.root}>
            <TextField
                id="select-wallet"
                variant="filled"
                select
                label="Which Wallet do you want import?"
                value={values.type}
                onChange={handleChange('type')}
                inputRef={typeRef}
                className={classes.textFieldNoMargin}
            >
                {types.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
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
                    inputRef={keypairRef}
                    className={classes.textFieldNoMargin}
                >
                    {keypairs.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Collapse>
            <List className={classes.list}>
                {
                    Object.keys(actions).map(key => {
                        return (
                            <ListItem button={true} divider={key === '0'} key={key} onClick={() => {
                                select(key)
                            }}>
                                <ListItemText
                                    primary={actions[key]}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="go">
                                        <NavigateNextIcon style={{color: "#D3D3D3"}}/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Box>
    )
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textField: {
        width: WIDTH,
        marginBottom: theme.spacing(2),
    },
    textFieldNoMargin: {
        width: WIDTH,
        marginBottom: theme.spacing(0.7),
    },
    list: {
        width: WIDTH,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(5),
        background: '#FFF',
        borderRadius: 6
    },
    advanced: {
        width: WIDTH,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: theme.spacing(0.7)
    },
    label: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 14
    }
}));

export {ToggleType, ImportForm}