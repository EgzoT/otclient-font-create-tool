import React from 'react';

const style: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 15
}

interface Props {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const FlexContainer = (props: Props) => {
    return (
        <div style={{ ...style, ...props.style }}>
            { props.children }
        </div>
    );
}

export default FlexContainer;
