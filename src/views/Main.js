import React from 'react';

import InputFile from '../components/InputFile';
import CircleAnimationButtonSuccess from '../components/CircleAnimationButton-react/CircleAnimationButton';
import IconFA from '../components/CircleAnimationButton-react/IconFA';
import { faFileImage, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import TableWithSigns from '../components/TableWithSigns';
import { toPng } from 'html-to-image';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();

        this.state = {
            fontFamily: false,
            fontName: "Default",
            fontSize: 15,
            signWidth: 25,
            signHeight: 25
        }
    }

    onFontChange = async (files) => {
        if (files[0]) {
            const data = await files[0].arrayBuffer();
            const fontName = files[0].name;

            let font = new FontFace('added-font', data);
            await font.load();
            document.fonts.add(font);

            this.setState({ fontFamily: 'added-font', fontName: fontName });
        }
    }

    download = () => {
        if (this.ref.current === null) {
            return;
        }

        toPng(this.ref.current, { cacheBust: false, skipAutoScale: true, pixelRatio: 1, quality: 1.0 }).then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'otc_font.png';
            link.href = dataUrl;
            link.click();
        }).catch((err) => {
            console.log(err);
        });
    }

    onChangeFontSize = (e) => {
        this.setState({ fontSize: Number(e.target.value) });
    }

    onChangeSignWidth = (e) => {
        this.setState({ signWidth: Number(e.target.value) });
    }

    onChangeSignHeight = (e) => {
        this.setState({ signHeight: Number(e.target.value) });
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <InputFile
                        text={ "Load font" }
                        accept={ ".ttf" }
                        icon={ faFileImage }
                        onChange={ e => this.onFontChange(e.target.files) }
                        width={ 120 }
                        style={{ marginRight: 10 }}
                    />
                    <CircleAnimationButtonSuccess
                        icon={ <IconFA icon={ faFileDownload }/> }
                        text={ "Download" }
                        width={ 120 }
                        style={{ marginRight: 10 }}
                        onClick={ this.download }
                    />
                </div>

                <br/>

                Font name: { this.state.fontName }

                <br/>

                Font size:
                <input type="number" style={{ width: 100, marginTop: 10, marginLeft: 5 }} value={ this.state.fontSize } onChange={ this.onChangeFontSize } />

                <br/>

                Sign width:
                <input type="number" style={{ width: 100, marginTop: 10, marginLeft: 5 }} value={ this.state.signWidth } onChange={ this.onChangeSignWidth } />

                <br/>

                Sign height:
                <input type="number" style={{ width: 100, marginTop: 10, marginLeft: 5 }} value={ this.state.signHeight } onChange={ this.onChangeSignHeight } />

                <p id="test" style={{ fontSize: '1.8rem', fontFamily: this.state.fontFamily ? this.state.fontFamily : null }}>Upload a font to change me!</p>

                <TableWithSigns
                    fontFamily={ this.state.fontFamily }
                    fontSize={ this.state.fontSize }
                    signWidth={ this.state.signWidth }
                    signHeight={ this.state.signHeight }
                    divRef={ this.ref }
                />
            </div>
        );
    }
}

export default Main;
