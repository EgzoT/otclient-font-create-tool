import React from 'react';

import { CircleAnimationButtonDark } from '../components/CircleAnimationButton-react/CircleAnimationButtons';
import IconFA from '../components/CircleAnimationButton-react/IconFA';

/**
 * @param {Array} style Set style for main container
 * @param {string} accept Define the types of files that the control can select [.txt]
 * @param {function} onChange Set onChange action
 * @param {string} text Set button text ['Hello']
 * @param {ObjectFortawesome} icon Set Fortawesome icon object [faFileImage]
 * @param {boolean} autoWidth Set auto width, this action prevent animation (css don't work with auto size), recommended when use alwaysVisibleText={ true }
 * @param {number} animationTime Animation speed (seconds) [5]
 * @param {colorString} iconColor Button icon color ['#000']
 * @param {colorString} textColor Button text color ['#fff']
 * @param {string} direction Button text expanded direction ['right' / 'left']
 * @param {number} height Set button height [100]
 * @param {number} width Set button width [50]
 * @param {Array} buttonStyle Set style for button main container
 * @param {Array} buttonFullStyle Set full button styling
 */
class InputFile extends React.Component {
    constructor(props) {
        super(props);

        this.inputFileRef = React.createRef();

        this.state = {};
    }

    openFileInput = () => {
        this.inputFileRef.current.click();
    }

    render() {
        return (
            <div style={ this.props.style }>
                <CircleAnimationButtonDark
                    text={ this.props.text }
                    icon={ <IconFA icon={ this.props.icon } /> }
                    width={ this.props.width }
                    height={ this.props.height }
                    autoWidth={ this.props.autoWidth }
                    animationTime={ this.props.animationTime }
                    iconColor={ this.props.iconColor }
                    textColor={ this.props.textColor }
                    direction={ this.props.direction }
                    alwaysVisibleText={ this.props.alwaysVisibleText }
                    style={ this.props.buttonStyle }
                    fullStyle={ this.props.buttonFullStyle }
                    onClick={ this.openFileInput }
                />
                <input
                    type={ "file" }
                    accept={ this.props.accept }
                    multiple={ this.props.multiple }
                    webkitdirectory={ this.props.directory ? "" : false }
                    mozdirectory={ this.props.directory ? "" : false }
                    directory={ this.props.directory ? "" : false }
                    ref={ this.inputFileRef }
                    onChange={ this.props.onChange }
                    style={{ display: 'none' }}
                ></input>
            </div>
        );
    }
}

export default InputFile;
