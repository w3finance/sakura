import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        width: "800px",
        height: "600px",
        backgroundColor: "#282c34",
        display: 'flex',
        flexDirection: 'column',
        overflow: "visible"
    }
})

const Header = function Header() {
    return (
        <div style={{
            width: '800px',
            height: '22px',
            background: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            WebkitAppRegion: 'drag',
        }}/>
    )
}

export default function Wrapper(props) {
    const styles = useStyles();
    return (
        <div className={styles.root} style={props.style}>
            {props.drag ? <Header/> : null}
            {props.children}
        </div>
    )
}