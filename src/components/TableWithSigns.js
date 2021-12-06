import React from 'react';

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

class RowSigns extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    getCells = (fontFamily, fontSize, fontWeight) => {
        let cells = [];

        for (let i in this.props.row) {
            cells.push(
                <CellSign
                    sign={ String.fromCharCode(this.props.row[i]) }
                    width={ this.props.width }
                    height={ this.props.height }
                    fontFamily={ fontFamily }
                    fontSize={ fontSize }
                    fontWeight={ fontWeight }
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
                { this.getCells(this.props.fontFamily, this.props.fontSize, this.props.fontWeight) }
            </div>
        );
    }
}

class CellSign extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div style={{
                fontFamily: this.props.fontFamily ? this.props.fontFamily : null,
                fontSize: this.props.fontSize,
                fontWeight: this.props.fontWeight,
                display: "table-cell",
                width: this.props.width,
                maxWidth: this.props.width,
                minWidth: this.props.width,
                height: this.props.height,
                maxHeight: this.props.height,
                minHeight: this.props.height,
                textAlign: "left",
                verticalAlign: "initial",
                margin: 0,
                padding: 0,
                border: 0,
                overflow: "hidden"
            }}>
                { this.props.sign }
            </div>
        );
    }
}

export default TableWithSigns;
