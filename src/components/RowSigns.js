import React from 'react';

import CellSign from './CellSign';

class RowSigns extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    getCells = (fontFamily, fontSize, fontWeight, fontColor, antialiasing, textStroke, textStrokeSize, textStrokeColor) => {
        let cells = [];

        for (let i in this.props.row) {
            cells.push(
                <CellSign
                    key={ i }
                    sign={ String.fromCharCode(this.props.row[i]) }
                    width={ this.props.width }
                    height={ this.props.height }
                    fontFamily={ fontFamily }
                    fontSize={ fontSize }
                    fontWeight={ fontWeight }
                    fontColor={ fontColor }
                    antialiasing={ antialiasing }
                    textStroke={ textStroke }
                    textStrokeSize={ textStrokeSize }
                    textStrokeColor={ textStrokeColor }
                />
            );
        }

        return cells;
    }

    render() {
        return (
            <div style={{
                display: "table-row",
                height: this.props.height,
                maxHeight: this.props.height,
                minHeight: this.props.height,
                margin: 0,
                padding: 0,
                border: 0,
                overflow: "hidden"
            }}>
                { this.getCells(this.props.fontFamily, this.props.fontSize, this.props.fontWeight, this.props.fontColor, this.props.antialiasing, this.props.textStroke, this.props.textStrokeSize, this.props.textStrokeColor) }
            </div>
        );
    }
}

export default RowSigns;
