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
import Grid from '@material-ui/core/Grid';

const WIDTH = 550;

const ToggleType = React.memo(function ToggleType(props) {
    const {formValues, typeRef} = props;
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
                    Object.keys(actions).map(key=>{
                        return (
                            <ListItem button={true} divider={key==='0'} key={key}>
                                <ListItemText
                                    primary={actions[key]}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="go">
                                        <ArrowForwardIcon />
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
        marginBottom: theme.spacing(0.7),
    },
    list: {
        width: WIDTH,
        marginTop: theme.spacing(3),
        background: '#FFF',
        borderRadius: 6
    }
}));

export {ToggleType}