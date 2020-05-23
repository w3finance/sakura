import React, {useState, useEffect} from "react";
import {useParams} from "react-router";
import {Wrapper} from "../../components/Layout";
import AccountInfo from "../../components/account/AccountInfo";
import Header from "../../components/Header";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import {AccountsContext} from "../../context/accounts";
import AccountHistory from "../../components/account/AccountHistory";
import AccountAction from "../../components/account/AccountAction";

function Account() {
    let {address} = useParams();
    const history = useHistory();
    const {t} = useTranslation();
    const {accounts} = React.useContext(AccountsContext);
    const [values, setValues] = useState({
        accountName: 'Wallet Name'
    });

    useEffect(() => {
        let addr = address.replace(':','');
        if (Object.keys(accounts).length !== 0) {
            setValues({accountName: accounts[addr].name})
        }
    }, []);

    function back() {
        history.goBack();
    }

    return(
        <Wrapper>
            <Header lfIcon title={values.accountName} goBack={back} icon={<MoreHorizRoundedIcon style={{color: "rgba(0,0,0.5)"}}/>}/>
            <AccountInfo />
            <AccountHistory />
            <AccountAction />
        </Wrapper>
    )
}

export default React.memo(Account)
