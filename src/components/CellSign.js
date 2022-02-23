import React from 'react';

class CellSign extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div
                style={{ ...{
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
                    color: this.props.fontColor,
                    fontSmooth: this.props.antialiasing ? "always" : "never",
                    WebkitFontSmoothing: this.props.antialiasing ? "antialiased" : "none",
                    MozOsxFontSmoothing: this.props.antialiasing ? "grayscale" : null,
                    WebkitTextStroke: this.props.textStroke ? this.props.textStrokeSize + 'px ' + this.props.textStrokeColor : 'unset',
                    textStroke: this.props.textStroke ? this.props.textStrokeSize + 'px ' + this.props.textStrokeColor  : 'unset',
                    textAlign: "left",
                    verticalAlign: "initial",
                    margin: 0,
                    padding: 0,
                    border: 0,
                    overflow: "hidden"
                    }, ...this.props.style }
                }
                ref={ this.props.cellRef }
            >
                { this.props.sign }
            </div>
        );
    }
}

export default CellSign;
