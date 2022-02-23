import React from 'react';

import CellSign from './CellSign';

class TestHeight extends React.Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();
    }

    getHeight = () => {
        return this.ref.current.clientHeight;
    }

    render() {
        return (
            <div style={ this.props.style}>
                <CellSign
                    sign={ "A" }
                    width={ this.props.width }
                    height={ 1 }
                    fontFamily={ this.props.fontFamily }
                    fontSize={ this.props.fontSize }
                    fontWeight={ this.props.fontWeight }
                    fontColor={ this.props.fontColor }
                    antialiasing={ this.props.antialiasing }
                    textStroke={ this.props.textStroke }
                    textStrokeSize={ this.props.textStrokeSize }
                    textStrokeColor={ this.props.textStrokeColor }
                    style={{ maxHeight: 1, minHeight: 1 }}
                    cellRef={ this.ref }
                />
            </div>
        );
    }
}

export default TestHeight;
