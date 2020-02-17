import React from "react";
import {Wrapper} from "../../components/Layout";
import Header from "../../components/Header";
import Cell from "../../components/cell/cell";
import {useHistory} from "react-router-dom";

import {useTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    version: {
        textAlign: "center",
        color: 'rgba(0,0,0,.6)',
        fontSize: 16
    }
}));

export default function Setting() {
    const history = useHistory();
    const {t} = useTranslation();
    const classes = useStyles();
    function back() {
        history.goBack();
    }

    return (
        <Wrapper>
            <>
                <Header lfIcon bg title={t('tl_setting')} goBack={back}/>
                <Grid container justify="center">
                    <Grid item>
                        <Cell title={'Language'}/>
                    </Grid>
                </Grid>
            </>
        </Wrapper>
    )
}
