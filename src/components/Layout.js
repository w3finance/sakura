import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    layout: {
        width: "800px",
        height: "600px",
        backgroundColor: "#282c34",
        overflow: "hidden",
        color: "#FFF",
    },
    wrapper: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '800px',
        height: '22px',
        background: 'transparent',
        WebkitAppRegion: 'drag',
        zIndex: 2,
    }
});

function Header() {
    const styles = useStyles();
    return (
        <div className={styles.header}/>
    )
}

const Layout = React.forwardRef(function Layout(props, ref) {
    const {children, style} = props;
    const styles = useStyles();
    return (
        <div className={styles.layout} style={style} ref={ref}>
            {children}
        </div>
    )
});

const Wrapper = React.forwardRef(function Wrapper(props, ref) {
    const {children, style} = props;
    const styles = useStyles();
    return (
        <div className={styles.wrapper} style={style} ref={ref}>
            <>
                <Header/>
                {children}
            </>
        </div>
    )
});

export {Wrapper, Layout}
