import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from "@material-ui/core/Box";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {useTranslation} from "react-i18next";
import TextField from "@material-ui/core/TextField";
import {AccountsContext} from "../../../context/accounts";
import {RedditTextField} from "../../../components/account/RedditTextField";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const supports = {
    "DOT": "Polkadot",
    "KSM": "Kusama"
};

const WalletInfo = React.memo(function WalletInfo(props) {
    const {errors, formValues} = props;
    const classes = useStyles();
    const {t} = useTranslation();
    const {accounts} = React.useContext(AccountsContext);
    const [values, setValues] = useState(formValues);

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
        if (Boolean(errors[prop])) {
            delete errors[prop];
        }
    };

    return (
        <Box className={classes.box}>
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
        </Box>
    )
});

const ToggleKey = React.memo(function ToggleKey(props) {
    const {keyRef, key, inputKey} = props;
    const classes = useStyles();
    const {t} = useTranslation();

    const [toggle, setToggle] = React.useState('Mnemonic');
    const [helper, setHelper] = React.useState('输入助记词单词，并使用空格分隔');

    const handleChange = (event, tog) => {
        setToggle(tog);
        switch (tog) {
            case 'Mnemonic':
                setHelper('输入助记词单词，并使用空格分隔');
                break;
            case 'PrivateKey':
                setHelper('输入明文私钥');
                break;
            case 'KeyStore':
                setHelper('Keystore文件内容');
                break;
            default:
                break;
        }
    };

    return (
        <Box className={classes.box}>
            <Box className={classes.item}>
                <ToggleButtonGroup
                    value={toggle}
                    size="small"
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="Mnemonic" classes={{label: classes.toggleLabel}}>
                        Mnemonic
                    </ToggleButton>
                    <ToggleButton value="PrivateKey" classes={{label: classes.toggleLabel}}>
                        Private Key
                    </ToggleButton>
                    <ToggleButton value="KeyStore" classes={{label: classes.toggleLabel}}>
                        Keystore
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <RedditTextField id="key"
                             label={toggle}
                             variant="filled"
                             inputRef={keyRef}
                             autoFocus={true}
                             multiline
                             rows="2"
                             value={key ? key : null}
                             onChange={() => inputKey()}
                             inputProps={{'aria-label': 'naked'}}
                             className={classes.textField}
                             helperText={helper}
            />
        </Box>
    )
});

const ToggleChain = React.memo(function ToggleChain(props) {
    const {select} = props;
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.container}>
                <Typography variant="subtitle1" color="textSecondary">
                    Import a wallet
                </Typography>
                <Box className={classes.list}>
                    <List dense={false}>
                        {
                            Object.keys(supports).map((key) => {
                                return (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                {key}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={supports[key]}
                                            secondary={key}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="next" onClick={() => {
                                                select(supports[key])
                                            }}>
                                                <NavigateNextIcon style={{color: "#D3D3D3"}}/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Box>
            </Box>
        </Box>
    )
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        marginTop: '16vh'
    },
    box: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        width: 550,
    },
    container: {
        width: 550,
    },
    list: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
        marginTop: 10
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
    },
    toggleLabel: {
        fontSize: 12
    }

}));

export {ToggleChain, ToggleKey, WalletInfo}