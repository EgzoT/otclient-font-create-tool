import React from 'react';

import InputFile from '../components/InputFile';
import CircleAnimationButton from '../components/CircleAnimationButton-react/CircleAnimationButton';
import IconFA from '../components/CircleAnimationButton-react/IconFA';
import { faFileUpload, faFileImage, faFileCode } from "@fortawesome/free-solid-svg-icons";
import TableWithSigns from '../components/TableWithSigns';
import { toPng } from 'html-to-image';
import Select from 'react-select';
import { charsetOptions } from '../data/consts';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();

        this.state = {
            fontFamily: false,
            fontName: "Default",
            fontSize: 11,
            signWidth: 16,
            signHeight: 16,
            fontWeight: 400,
            charset: charsetOptions[0]
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

    generateOtfontFile = () => {
        let text = "Font"
            + "\n  name: " + "otc_font"
            + "\n  texture: " + "otc_font"
            + "\n  height: " + this.state.fontSize
            + "\n  glyph-size: " + this.state.signWidth + " " + this.state.signHeight
            + "\n  space-width: " + 3
            + "\n";

        let a = document.createElement('a');
        a.href = "data:application/octet-stream;charset=utf-8;base64," + window.btoa(unescape(encodeURIComponent(text)));
        a.textContent = 'download';
        a.download = "otc_font" + ".otfont";
        a.click();
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

    onChangeFontWeight = (e) => {
        this.setState({ fontWeight: Number(e.target.value) });
    }

    onChangeCharset = (e) => {
        this.setState({ charset: e });
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <InputFile
                        text={ "Load font" }
                        accept={ ".ttf" }
                        icon={ faFileUpload }
                        onChange={ e => this.onFontChange(e.target.files) }
                        width={ 120 }
                        style={{ marginRight: 10 }}
                    />
                </div>

                <br/>

                Font name: { this.state.fontName }

                <br/>

                Font size:
                <input
                    type="number"
                    style={{ width: 100, marginTop: 10, marginLeft: 5 }}
                    value={ this.state.fontSize }
                    min={ 1 }
                    onChange={ this.onChangeFontSize }
                />

                <br/>

                Sign width:
                <input
                    type="number"
                    style={{ width: 100, marginTop: 10, marginLeft: 5 }}
                    value={ this.state.signWidth }
                    min={ 1 }
                    onChange={ this.onChangeSignWidth }
                />

                <br/>

                Sign height:
                <input
                    type="number"
                    style={{ width: 100, marginTop: 10, marginLeft: 5 }}
                    value={ this.state.signHeight }
                    min={ 1 }
                    onChange={ this.onChangeSignHeight }
                />

                <br/>

                Font weight:
                <input
                    type="number"
                    style={{ width: 100, marginTop: 10, marginLeft: 5 }}
                    value={ this.state.fontWeight }
                    step={ 100 }
                    min={ 100 }
                    max={ 900 }
                    onChange={ this.onChangeFontWeight }
                />

                <br/>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <div style={{ marginRight: 10 }}>Charset:</div>
                    <Select
                        value={ this.state.charset }
                        onChange={ this.onChangeCharset }
                        options={ charsetOptions }
                        styles={{
                            container: (provided, state) => ({ ...provided, width: 130, height: 30 }),
                            option: (provided, state) => ({ ...provided, color: '#000000' }),
                            control: (provided, state) => ({ ...provided, minHeight: 20 }),
                            indicatorsContainer: (provided, state) => ({ ...provided, height: 30 })
                        }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}>
                    <CircleAnimationButton
                        icon={ <IconFA icon={ faFileImage }/> }
                        text={ "Download font image" }
                        width={ 200 }
                        style={{ marginRight: 10 }}
                        onClick={ this.download }
                    />
                    <CircleAnimationButton
                        icon={ <IconFA icon={ faFileCode }/> }
                        text={ "Download otfont file" }
                        width={ 200 }
                        style={{ marginRight: 10 }}
                        color="springForest"
                        onClick={ this.generateOtfontFile }
                    />
                </div>

                <p id="test" style={{ fontSize: '1.8rem', fontFamily: this.state.fontFamily ? this.state.fontFamily : null }}>Upload a font to change me!</p>

                <div style={{ width: 'fit-content', margin: 'auto' }}>
                    <TableWithSigns
                        fontFamily={ this.state.fontFamily }
                        fontSize={ this.state.fontSize }
                        signWidth={ this.state.signWidth }
                        signHeight={ this.state.signHeight }
                        fontWeight={ this.state.fontWeight }
                        charset={ this.state.charset.value }
                        divRef={ this.ref }
                    />
                </div>
            </div>
        );
    }
}

export default Main;
