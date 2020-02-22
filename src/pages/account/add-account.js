import React from "react";
import {Wrapper} from "../../components/Layout";
import Header from "../../components/Header";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function AddAccount() {
    const history = useHistory();
    const {t} = useTranslation();

    function back() {
        history.goBack();
    }

    return (
        <Wrapper>
            <>
                <Header lfIcon bg title={t('tl_addAccount')} goBack={back}/>
            </>
        </Wrapper>
    )
}
