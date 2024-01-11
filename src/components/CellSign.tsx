interface Props {
    id?: string;
    sign: string;
    height: number;
    width: number;
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    fontColor: string;
    antialiasing: boolean;
    textStroke: boolean;
    textStrokeSize: number;
    textStrokeColor: string;
    strokeFill: boolean;
    style?: React.CSSProperties;
}

const CellSign = (props: Props) => {
    return (
        <div
            id={ props.id }
            style={{
                ...{
                    fontFamily: props.fontFamily ? props.fontFamily : undefined,
                    fontSize: props.fontSize,
                    fontWeight: props.fontWeight,
                    display: "table-cell",
                    width: props.width,
                    maxWidth: props.width,
                    minWidth: props.width,
                    height: props.height,
                    maxHeight: props.height,
                    minHeight: props.height,
                    color: props.fontColor,
                    fontSmooth: props.antialiasing ? "always" : "never",
                    WebkitFontSmoothing: props.antialiasing ? "antialiased" : "none",
                    MozOsxFontSmoothing: props.antialiasing ? "grayscale" : undefined,
                    WebkitTextStroke: props.textStroke ? props.textStrokeSize + 'px ' + props.textStrokeColor : 'unset',
                    textStroke: props.textStroke ? props.textStrokeSize + 'px ' + props.textStrokeColor  : 'unset',
                    paintOrder: props.strokeFill ? "stroke fill" : undefined,
                    textAlign: "left",
                    verticalAlign: "initial",
                    margin: 0,
                    padding: 0,
                    border: 0,
                    overflow: "hidden"
                },
                ...props.style
            }}
        >
            { props.sign }
        </div>
    );
}

export default CellSign;
