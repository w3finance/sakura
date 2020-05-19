import React, {useState} from "react";
import {useParams} from "react-router";
import {Wrapper} from "../../components/Layout";
import Header from "../../components/Header";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

function Account() {
    let {accountId} = useParams();
    const history = useHistory();
    const {t} = useTranslation();

    function back() {
        history.goBack();
    }

    return(
        <Wrapper>
            <Header lfIcon bg title={accountId} goBack={back}/>
        </Wrapper>
    )
}

export default React.memo(Account)
