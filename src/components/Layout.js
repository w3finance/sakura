import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    wrapper: {
        width: '800px',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
    },
    drag: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '30px',
        WebkitAppRegion: 'drag',
    }
});

function Drag() {
    const styles = useStyles();
    return (
        <div className={styles.drag}/>
    )
}

const Wrapper = React.memo(function Wrapper(props) {
    const {children, style} = props;
    const styles = useStyles();
    return (
        <div className={styles.wrapper} style={style}>
            <>
                <Drag/>
                {children}
            </>
        </div>
    )
});

export {Wrapper}
