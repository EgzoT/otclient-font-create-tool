import React from 'react';

import RowSigns from './RowSigns';

class TableWithSigns extends React.Component {
    constructor(props) {
        super(props);

        //TODO:           // Antialias ?!? https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth
        //TODO:           // Text color

        this.state = {}
    }

    getRows = (fontFamily, fontSize, signWidth, signHeight, fontWeight, charset) => {
        let rows = [];

        for(let i in charset) {
            rows.push(
                <RowSigns
                    row={ charset[i] }
                    width={ signWidth }
                    height={ signHeight }
                    fontFamily={ fontFamily }
                    fontSize={ fontSize }
                    fontWeight={ fontWeight }
                />
            );
        }

        return rows;
    }

    render() {
        return (
            <div ref={ this.props.divRef } style={{ display: "table", borderSpacing: 0, position: "relative" }}>
                { this.getRows(this.props.fontFamily, this.props.fontSize, this.props.signWidth, this.props.signHeight, this.props.fontWeight, this.props.charset) }
            </div>
        );
    }
}

export default TableWithSigns;
