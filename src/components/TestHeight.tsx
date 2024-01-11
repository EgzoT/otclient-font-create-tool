import CellSign from './CellSign';

interface Props {
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

export const TEST_SIGN_ID = 'TestSign';

const TestHeight = (props: Props) => {
    return (
        <div style={ props.style}>
            <CellSign
                id={ TEST_SIGN_ID }
                sign={ "A" }
                width={ props.width }
                height={ 1 }
                fontFamily={ props.fontFamily }
                fontSize={ props.fontSize }
                fontWeight={ props.fontWeight }
                fontColor={ props.fontColor }
                antialiasing={ props.antialiasing }
                textStroke={ props.textStroke }
                textStrokeSize={ props.textStrokeSize }
                textStrokeColor={ props.textStrokeColor }
                strokeFill={ props.strokeFill }
                style={{ maxHeight: 1, minHeight: 1 }}
            />
        </div>
    );
}

export default TestHeight;
