import React from 'react';

import RowSigns from './RowSigns';

class TableWithSigns extends React.Component {
    constructor(props) {
        super(props);

        //TODO:           // Antialias ?!? https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth

        this.state = {}
    }

    getRows = (fontFamily, fontSize, signWidth, signHeight, fontWeight, charset, fontColor) => {
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
                />
            );
        }

        return rows;
    }

    render() {
        return (
            <div ref={ this.props.divRef } style={{ display: "table", borderSpacing: 0, position: "relative" }}>
                { this.getRows(this.props.fontFamily, this.props.fontSize, this.props.signWidth, this.props.signHeight, this.props.fontWeight, this.props.charset, this.props.fontColor) }
            </div>
        );
    }
}

export default TableWithSigns;
