import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    wrapper: {
        flexGrow: 1,
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

const Wrapper = React.forwardRef(function Wrapper(props, ref) {
    const {children, style} = props;
    const styles = useStyles();
    return (
        <div className={styles.wrapper} style={style} ref={ref}>
            <>
                <Drag/>
                {children}
            </>
        </div>
    )
});

export {Wrapper}
