import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {ActionButton} from "../components/ActionButton";
import Wrapper from "../components/Wrapper"
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({})


export default class HomePage extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        let history = useHistory();
    }

    render() {
        const styles = useStyles();
        return (
            <Wrapper>
                <ActionButton variant="contained" color="primary" to={'/'}>Back</ActionButton>
                <h3>Home Page</h3>
            </Wrapper>
        )
    }
}