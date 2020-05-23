import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    wrapper: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FCFCFC'
    }
});

const Wrapper = React.memo(function Wrapper(props) {
    const {children, style} = props;
    const styles = useStyles();
    return (
        <div className={styles.wrapper} style={style}>
            {children}
        </div>
    )
});

export {Wrapper}
