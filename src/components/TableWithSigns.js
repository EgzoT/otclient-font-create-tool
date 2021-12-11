import React from 'react';

import RowSigns from './RowSigns';

class TableWithSigns extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    getRows = (fontFamily, fontSize, signWidth, signHeight, fontWeight, charset, fontColor, antialiasing) => {
        let rows = [];

        for(let i in charset) {
            rows.push(
                <RowSigns
                    key={ i }
                    row={ charset[i] }
                    width={ signWidth }
                    height={ signHeight }
                    fontFamily={ fontFamily }
                    fontSize={ fontSize }
                    fontWeight={ fontWeight }
                    fontColor={ fontColor }
                    antialiasing={ antialiasing }
                />
            );
        }

        return rows;
    }

    render() {
        return (
            <div ref={ this.props.divRef } style={{ display: "table", borderSpacing: 0, position: "relative" }}>
                { this.getRows(this.props.fontFamily, this.props.fontSize, this.props.signWidth, this.props.signHeight, this.props.fontWeight, this.props.charset, this.props.fontColor, this.props.antialiasing) }
            </div>
        );
    }
}

export default TableWithSigns;
