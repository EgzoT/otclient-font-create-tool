import React from 'react';

const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 15
};

class FlexContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ ...style, ...this.props.style }}>
                { this.props.children }
            </div>
        );
    }
}

export default FlexContainer;
