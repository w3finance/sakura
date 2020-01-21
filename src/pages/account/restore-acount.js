import React from "react";
import {Wrapper} from "../../components/Layout";
import HeaderTitle from "../../components/HeaderTitle";
import {useHistory} from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBack";

export default function RestoreAccount() {
    const history = useHistory();

    function back() {
        history.goBack();
    }

    return (
        <Wrapper>
            <>
                <HeaderTitle title={'Restore Account'} icon={<ArrowBack style={{color: "white"}}/>} onClick={back}/>
            </>
        </Wrapper>
    )
}
