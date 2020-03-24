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
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {useTranslation} from "react-i18next";
import {AccountsContext} from "../../context/accounts";
import {RedditTextField} from "../RedditTextField";

const WIDTH = 550;

const ImportForm = React.memo(function ImportForm(props) {
    const {formValues} = props;
    const classes = useStyles();
    const {t} = useTranslation();
    const {accounts} = React.useContext(AccountsContext);
    const [values, setValues] = useState(formValues);
    const [errors, setErrors] = useState({});

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
        if (Boolean(errors[prop])) {
            delete errors[prop];
        }
    };

    return (
        <Box className={classes.root}>
            <RedditTextField id="outlined-basic"
                             label={t('CreateWallet.mnemonic')}
                             error={Boolean(errors.phrase)}
                             autoFocus={true}
                             variant="filled"
                             multiline
                             rows="2"
                             inputProps={{'aria-label': 'naked'}}
                             className={classes.textField}
                             onChange={handleChange('phrase')}
                             helperText={'请输入助记词'}
            />

            <RedditTextField id="outlined-basic"
                             label={t('CreateWallet.walletName')}
                             error={Boolean(errors.name)}
                             variant="filled"
                             multiline
                             rows="1"
                             defaultValue={`Wallet${Object.keys(accounts).length + 1}`}
                             inputProps={{'aria-label': 'naked'}}
                             className={classes.textField}
                             onChange={handleChange('name')}
                             helperText={'钱包名称'}
            />
            <RedditTextField id="outlined-basic"
                             label={t('CreateWallet.password')}
                             error={Boolean(errors.password)}
                             variant="filled"
                             multiline
                             rows="1"
                             inputProps={{'aria-label': 'naked'}}
                             className={classes.textFieldNoMargin}
                             onChange={handleChange('password')}
                             helperText={'钱包密码'}
            />
        </Box>
    )
});

const ToggleType = React.memo(function ToggleType(props) {
    const {formValues, typeRef, select} = props;
    const [values, setValues] = useState(formValues);
    const classes = useStyles();
    const types = ["Kusama", "Polkadot", "Edgeware"];
    const actions = ['Import by Mnemonic', 'Import by Private Key'];

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
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
                className={classes.textField}
            >
                {types.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>

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
                                        <ArrowForwardIcon/>
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
        marginTop: theme.spacing(3),
        background: '#FFF',
        borderRadius: 6
    },
}));

export {ToggleType, ImportForm}