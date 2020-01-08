import React from 'react';
import Wrapper from "../components/Wrapper";
import {Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Save, Add} from '@material-ui/icons';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2),
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        height: 48,
        width: 200
    },
}));

export default function HomePage() {
    const classes = useStyles();
    const history = useHistory();

    function createAccount() {
        history.push("/create");
    }

    function importAccount() {
        history.push("/restore");
    }

    return (
        <Wrapper>
            <>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    onClick={createAccount}
                    startIcon={<Add />}
                >
                    Create Account
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    onClick={importAccount}
                    startIcon={<Save />}
                >
                    Restore Account
                </Button>
            </>
        </Wrapper>
    )
}
