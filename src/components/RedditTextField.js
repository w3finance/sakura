import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";

const useStylesReddit = makeStyles(theme => ({
    root: {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        color: 'rgb(66,66,70)',
        transition: theme.transitions.create(['border-color']),
        '&:hover': {
            // backgroundColor: '#FFF',
        },
        '&$focused': {
            // backgroundColor: '#FFF',
        },
    }
}));

function RedditTextField(props) {
    const classes = useStylesReddit();
    return <TextField InputProps={{classes, disableUnderline: true}} {...props} />;
}

export {RedditTextField}