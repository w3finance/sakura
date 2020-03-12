import React, {useState} from "react";
import {Wrapper} from "../../../components/Layout";
import Header from "../../../components/Header";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

function ImportAccount() {
    const history = useHistory();
    const {t} = useTranslation();

    function back() {
        history.goBack();
    }

    return(
        <Wrapper>
            <Header lfIcon bg title={t('Title.importWallet')} goBack={back}/>
        </Wrapper>
    )
}

export default React.memo(ImportAccount)