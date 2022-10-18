import React from 'react';

const styles = {
    divider: {
        fontStyle: "Poppins",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "24px",
        color: "#B5B5B5",
        textAlign: "center",
        margin: "24px 0"
    }
};

const ButtonDivider = (props) => {
    return (
        <div>
            <div style={styles.divider}>{props.content}</div>
        </div>
    );
};

export default ButtonDivider;