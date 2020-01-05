import React from "react";
import PropTypes from 'prop-types';
import {Button} from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';

function ActionButton(props) {
    const {to, variant, color, icon, onClick} = props;
    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
    );
    return (
        <Button component={renderLink} variant={variant} color={color} startIcon={icon} onClick={onClick} {...props}/>
    )
}

ActionButton.propTypes = {
    to: PropTypes.string,
    variant: PropTypes.string.isRequired,
    color: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func
};

export { ActionButton }