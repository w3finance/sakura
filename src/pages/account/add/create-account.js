import React, {useState} from "react";
import {Wrapper} from "../../../components/Layout";
import Header from "../../../components/Header";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {
    useParams
} from "react-router-dom";

export default function CreateAccount() {
    const history = useHistory();
    const {t} = useTranslation();
    let { type, chain } = useParams();

    function back() {
        history.goBack();
    }

    return(
        <Wrapper>
            <Header lfIcon bg title={t('tl_createAccount')} goBack={back}/>
            <h3 style={{textAlign: 'center'}}>{type+chain}</h3>
        </Wrapper>
    )
}